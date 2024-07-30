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

  static async get(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const cars = await prisma.car.findMany({
        skip,
        take: limit,
        include: {
          brand: true,
          carType: true,
          city: true,
          facilities: true,
        },
      });

      const totalCars = await prisma.car.count();
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
      console.error("Error getting cars with pagination:", error);
      throw error;
    }
  }
}

module.exports = Car;
