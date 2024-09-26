const Car = require('../models/car');
const CustomError = require('../utils/error');
const generateResponse = require('../utils/response');
const fileHelper = require('../utils/fileUtil');

exports.getCars = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || '';

  try {
    const cars = await Car.get(page, limit, query);

    if (!cars || cars.data.length <= 0) {
      throw new CustomError('No cars found', 404);
    }

    res.status(200).json(generateResponse(200, true, 'Cars retrieved successfully', cars));
  } catch (error) {
    next(error);
  }
};

exports.postCar = async (req, res, next) => {
  try {
    const {
      name,
      number,
      status,
      rating,
      totalSeat,
      hasAC,
      driverName,
      driverMobile,
      gearSystem,
      rentPriceWithoutDriver,
      rentPriceWithDriver,
      engineHP,
      priceType,
      fuelType,
      description,
      pickupAddress,
      latitude,
      longitude,
      totalDrivenKM,
      minimumHoursRequired,
      carTypeId,
      brandId,
      cityId,
      facilities,
      carOwner,
    } = req.body;

    let image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError('Image is required', 400);
    }

    let facilitiesList = [];

    if (Array.isArray(facilities)) {
      facilitiesList = facilities;
    } else {
      facilitiesList = facilities.split(',').map((id) => parseInt(id.trim()));
    }

    const car = await Car.create({
      name,
      number,
      image,
      status: status ? parseInt(status, 10) : 1,
      rating: rating ? parseFloat(rating) : null,
      totalSeat: totalSeat ? parseInt(totalSeat) : null,
      hasAC: hasAC ? Boolean(hasAC) : false,
      driverName,
      driverMobile,
      gearSystem,
      rentPriceWithoutDriver: rentPriceWithoutDriver ? parseFloat(rentPriceWithoutDriver) : null,
      rentPriceWithDriver: rentPriceWithDriver ? parseFloat(rentPriceWithDriver) : null,
      engineHP: engineHP ? parseFloat(engineHP) : null,
      priceType,
      fuelType,
      description,
      pickupAddress,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      totalDrivenKM: totalDrivenKM ? parseInt(totalDrivenKM) : null,
      minimumHoursRequired: minimumHoursRequired ? parseInt(minimumHoursRequired) : null,
      carTypeId: parseInt(carTypeId),
      brandId: parseInt(brandId),
      cityId: parseInt(cityId),
      facilities: facilitiesList,
      carOwner,
    });

    res.status(201).json(generateResponse(201, true, 'Car created successfully', car));
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);
    if (!car) {
      throw new CustomError('Car not found', 404);
    }

    await fileHelper.deleteFile(car.image);
    await Car.deleteById(id);

    res.status(200).json(generateResponse(200, true, 'Car deleted successfully'));
  } catch (error) {
    next(error);
  }
};

exports.patchCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);
    if (!car) {
      throw new CustomError('Car not found', 404);
    }

    let image = req.file ? req.file.path : null;

    if (image) {
      await fileHelper.deleteFile(car.image);
    }

    const updatedCar = await Car.updateById(id, {
      name: req.body.name || car.name,
      number: req.body.number || car.number,
      image: image || car.image,
      status: req.body.status ? parseInt(req.body.status, 10) : car.status,
      rating: req.body.rating ? parseFloat(req.body.rating) : car.rating,
      totalSeat: req.body.totalSeat ? parseInt(req.body.totalSeat) : car.totalSeat,
      hasAC: req.body.hasAC !== undefined ? Boolean(req.body.hasAC) : car.hasAC,
      driverName: req.body.driverName || car.driverName,
      driverMobile: req.body.driverMobile || car.driverMobile,
      gearSystem: req.body.gearSystem || car.gearSystem,
      rentPriceWithoutDriver: req.body.rentPriceWithoutDriver
        ? parseFloat(req.body.rentPriceWithoutDriver)
        : car.rentPriceWithoutDriver,
      rentPriceWithDriver: req.body.rentPriceWithDriver
        ? parseFloat(req.body.rentPriceWithDriver)
        : car.rentPriceWithDriver,
      engineHP: req.body.engineHP ? parseFloat(req.body.engineHP) : car.engineHP,
      priceType: req.body.priceType || car.priceType,
      fuelType: req.body.fuelType || car.fuelType,
      description: req.body.description || car.description,
      pickupAddress: req.body.pickupAddress || car.pickupAddress,
      latitude: req.body.latitude ? parseFloat(req.body.latitude) : car.latitude,
      longitude: req.body.longitude ? parseFloat(req.body.longitude) : car.longitude,
      totalDrivenKM: req.body.totalDrivenKM ? parseInt(req.body.totalDrivenKM) : car.totalDrivenKM,
      minimumHoursRequired: req.body.minimumHoursRequired
        ? parseInt(req.body.minimumHoursRequired)
        : car.minimumHoursRequired,
      carTypeId: req.body.carTypeId ? parseInt(req.body.carTypeId) : car.carTypeId,
      brandId: req.body.brandId ? parseInt(req.body.brandId) : car.brandId,
      cityId: req.body.cityId ? parseInt(req.body.cityId) : car.cityId,
      facilities: req.body.facilities ? { set: req.body.facilities.map((id) => ({ id })) } : undefined,
    });

    res.status(200).json(generateResponse(200, true, 'Car updated successfully', updatedCar));
  } catch (error) {
    next(error);
  }
};
