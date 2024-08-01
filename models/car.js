const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Car {
  static async findById(id) {
    try {
      return await prisma.car.findUnique({
        where: { id: Number(id) },
        include: {
          brand: true,
          carType: true,
          city: true,
          facilities: true, // Includes the facilities related to the car
        },
      });
    } catch (error) {
      console.error("Error finding car by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.car.create({
        data: {
          ...data,
          facilities: {
            connect: data.facilities.map((facilityId) => ({ id: facilityId })),
          },
        },
        include: {
          brand: true,
          carType: true,
          city: true,
          facilities: true,
        },
      });
    } catch (error) {
      console.error("Error creating car:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.car.update({
        where: { id: Number(id) },
        data: {
          ...data,
          facilities: {
            set: data.facilities.map((facilityId) => ({ id: facilityId })),
          },
        },
        include: {
          brand: true,
          carType: true,
          city: true,
          facilities: true,
        },
      });
    } catch (error) {
      console.error("Error updating car by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.car.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting car by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.car.findMany({
        include: {
          brand: true,
          carType: true,
          city: true,
          facilities: true,
        },
      });
    } catch (error) {
      console.error("Error finding all cars:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      // Define where condition if query is provided
      const where = query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              { driverName: { contains: query, mode: "insensitive" } },
              { fuelType: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated cars with or without a search query
      const cars = await prisma.car.findMany({
        skip,
        take: limit,
        where,
        include: {
          brand: true,
          carType: true,
          city: true,
          facilities: true,
        },
      });

      // Fetch the total number of cars
      const totalCars = await prisma.car.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalCars / limit);

      return {
        data: cars,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCars,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting cars with pagination and search:", error);
      throw error;
    }
  }
}

module.exports = Car;
