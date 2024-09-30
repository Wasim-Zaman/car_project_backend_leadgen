const Joi = require('joi');
const Vendor = require('../models/vendor');
const CustomError = require('../utils/error');
const response = require('../utils/response');
const fileHelper = require('../utils/file');
const Bcrypt = require('../utils/bcrypt');
const JWT = require('../utils/jwt');

// Validation Schemas

// Schema for registering a vendor
const registerVendorSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  businessName: Joi.string().optional(),
  storeLogo: Joi.any().optional(),
  storeCover: Joi.any().optional(),
  address: Joi.string().optional(),
  moduleType: Joi.string().optional(),
  vatTax: Joi.string().optional(),
  zoneId: Joi.string().required(),
  businessPlan: Joi.string().optional(),
  deliveryUnit: Joi.string().optional(),
  maxDeliveryTime: Joi.string().optional(),
  minDeliveryTime: Joi.string().optional(),
});

// Schema for vendor login
const loginVendorSchema = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

// Schema for updating a vendor
const updateVendorSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  businessName: Joi.string().optional(),
  storeLogo: Joi.any().optional(),
  storeCover: Joi.any().optional(),
  address: Joi.string().optional(),
  moduleType: Joi.string().optional(),
  vatTax: Joi.string().optional(),
  zoneId: Joi.string().optional(),
  businessPlan: Joi.string().optional(),
  deliveryUnit: Joi.string().optional(),
  maxDeliveryTime: Joi.string().optional(),
  minDeliveryTime: Joi.string().optional(),
});

// Register a new vendor with optional logo and cover image upload
exports.registerVendor = async (req, res, next) => {
  try {
    // Validate input using Joi
    const { error, value } = registerVendorSchema.validate(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      businessName,
      address,
      vatTax,
      minDeliveryTime,
      maxDeliveryTime,
      deliveryUnit,
      businessPlan,
      moduleType,
      zoneId,
    } = value;

    // Check if the vendor already exists
    const existingVendor = await Vendor.findByPhone(phone);
    if (existingVendor) {
      throw new CustomError('Vendor with this phone number already exists', 400);
    }

    // Hash the password before saving
    const hashedPassword = await Bcrypt.createPassword(password);

    // Store logo and cover files if provided
    const storeLogo = req.files && req.files.storeLogo ? req.files.storeLogo[0].path : null;
    const storeCover = req.files && req.files.storeCover ? req.files.storeCover[0].path : null;

    // Create a new vendor
    const newVendor = await Vendor.create({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      businessName,
      storeLogo,
      storeCover,
      address,
      vatTax,
      minDeliveryTime,
      maxDeliveryTime,
      deliveryUnit,
      businessPlan,
      moduleType,
      zoneId,
    });

    res.status(201).json(response(201, true, 'Vendor registered successfully', newVendor));
  } catch (error) {
    console.error('Error in registerVendor:', error.message);
    // Delete uploaded files if there's an error
    if (req.files) {
      deleteUploadedFiles(req.files);
    }
    next(error);
  }
};

// Vendor login
exports.loginVendor = async (req, res, next) => {
  try {
    // Validate input using Joi
    const { error, value } = loginVendorSchema.validate(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { phone, password } = value;

    // Find the vendor by phone number
    const vendor = await Vendor.findByPhone(phone);
    if (!vendor) {
      throw new CustomError('Vendor not found', 404);
    }

    // Check if the password is correct
    const isPasswordValid = await Bcrypt.comparePassword(password, vendor.password);
    if (!isPasswordValid) {
      throw new CustomError('Invalid password', 401);
    }

    // Generate JWT token
    const token = JWT.createToken({ id: vendor.id, phone: vendor.phone });

    // Exclude password from the response
    const { password: _, ...vendorData } = vendor;

    res.status(200).json(
      response(200, true, 'Login successful', {
        vendor: vendorData,
        token,
      })
    );
  } catch (error) {
    console.error('Error in loginVendor:', error.message);
    next(error);
  }
};

// Update vendor details (with logo and cover image upload)
exports.updateVendor = async (req, res, next) => {
  try {
    // Validate input using Joi
    const { error, value } = updateVendorSchema.validate(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { id } = req.params;
    const {
      firstName,
      lastName,
      phone,
      email,
      businessName,
      address,
      vatTax,
      minDeliveryTime,
      maxDeliveryTime,
      deliveryUnit,
      businessPlan,
      moduleType,
      zoneId,
    } = value;

    // Find the vendor by ID
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      throw new CustomError('Vendor not found', 404);
    }

    // Store logo and cover files if provided
    let storeLogo = vendor.storeLogo;
    let storeCover = vendor.storeCover;

    if (req.files) {
      if (req.files.logo) {
        // Delete old logo if a new one is uploaded
        if (vendor.storeLogo) {
          await fileHelper.deleteFile(vendor.storeLogo);
        }
        storeLogo = req.files.logo[0].path;
      }

      if (req.files.cover) {
        // Delete old cover if a new one is uploaded
        if (vendor.storeCover) {
          await fileHelper.deleteFile(vendor.storeCover);
        }
        storeCover = req.files.cover[0].path;
      }
    }

    // Update vendor details
    const updatedVendor = await Vendor.updateById(id, {
      firstName,
      lastName,
      phone,
      email,
      businessName,
      storeLogo,
      storeCover,
      address,
      vatTax,
      minDeliveryTime,
      maxDeliveryTime,
      deliveryUnit,
      businessPlan,
      moduleType,
      zoneId,
    });

    res.status(200).json(response(200, true, 'Vendor updated successfully', updatedVendor));
  } catch (error) {
    console.error('Error in updateVendor:', error.message);
    // Delete uploaded files if there's an error
    if (req.files) {
      deleteUploadedFiles(req.files);
    }
    next(error);
  }
};

// Get all vendors (Admin only)
exports.getVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.getAll();
    res.status(200).json(response(200, true, 'Vendors retrieved successfully', vendors));
  } catch (error) {
    console.error('Error in getVendors:', error.message);
    next(error);
  }
};

// Get a single vendor by ID
exports.getVendorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      throw new CustomError('Vendor not found', 404);
    }
    res.status(200).json(response(200, true, 'Vendor retrieved successfully', vendor));
  } catch (error) {
    console.error('Error in getVendorById:', error.message);
    next(error);
  }
};

// Delete a vendor by ID (Admin only)
exports.deleteVendor = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the vendor by ID
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      throw new CustomError('Vendor not found', 404);
    }

    // Delete logo and cover files if they exist
    if (vendor.storeLogo) {
      await fileHelper.deleteFile(vendor.storeLogo);
    }
    if (vendor.storeCover) {
      await fileHelper.deleteFile(vendor.storeCover);
    }

    await Vendor.deleteById(id);

    res.status(200).json(response(200, true, 'Vendor deleted successfully'));
  } catch (error) {
    console.error('Error in deleteVendor:', error.message);
    next(error);
  }
};

// Helper function to delete uploaded files if there's an error
function deleteUploadedFiles(files) {
  if (files.logo) {
    fileHelper.deleteFile(files.logo[0].path);
  }
  if (files.cover) {
    fileHelper.deleteFile(files.cover[0].path);
  }
}
