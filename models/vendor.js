const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Vendor {
  static async findById(id) {
    try {
      return await prisma.vendor.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error('Error finding Vendor by id:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      return await prisma.vendor.findUnique({
        where: { email: email },
      });
    } catch (error) {
      console.error('Error finding Vendor by email:', error);
      throw error;
    }
  }

  static async findByPhone(phone) {
    try {
      return await prisma.vendor.findUnique({
        where: { phone: phone },
      });
    } catch (error) {
      console.error('Error finding Vendor by phone:', error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating Vendor with data: ${JSON.stringify(data)}`);
      return await prisma.vendor.create({
        data,
      });
    } catch (error) {
      console.error('Error creating Vendor:', error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.vendor.update({
        where: { id: id.toString() },
        data,
      });
    } catch (error) {
      console.error(`Error updating Vendor with id ${id}:`, error.message);
      throw new Error(`Unable to update Vendor with id ${id}`);
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting Vendor with ID ${id}`);
      return await prisma.vendor.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error('Error deleting Vendor by id:', error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.vendor.findMany();
    } catch (error) {
      console.error('Error finding all Vendors:', error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = '') {
    try {
      const skip = (page - 1) * limit;

      // Define where condition if query is provided
      const where = query
        ? {
            OR: [
              { firstName: { contains: query } },
              { lastName: { contains: query } },
              { moduleType: { contains: query } },
            ],
          }
        : {};

      // Fetch the paginated vendors
      const vendors = await prisma.vendor.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of vendors
      const totalVendors = await prisma.vendor.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalVendors / limit);

      return {
        vendors: vendors,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalVendors,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error('Error getting vendors with pagination and search:', error);
      throw error;
    }
  }

  static async login(phone, password) {
    try {
      let vendor = await this.findByPhone(phone);

      if (!vendor) {
        throw new Error('Vendor not found');
      }

      // Here, you would usually compare the provided password with the hashed password stored in the database
      // Assuming password comparison is successful:
      console.log(`Vendor with phone: ${phone} logged in successfully`);

      return vendor;
    } catch (error) {
      console.error('Error during login process:', error);
      throw error;
    }
  }
}

module.exports = Vendor;
