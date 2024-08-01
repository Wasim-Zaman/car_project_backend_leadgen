const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Booking {
  static async findById(id) {
    try {
      return await prisma.booking.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding booking by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.booking.create({
        data,
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.booking.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating booking by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.booking.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting booking by id:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      const where = query
        ? {
            OR: [
              query
                ? { pickupOTP: { contains: query, mode: "insensitive" } }
                : {},
              query
                ? { driverName: { contains: query, mode: "insensitive" } }
                : {},
            ],
            AND: [status ? { status } : {}],
          }
        : {};

      // Fetch the paginated bookings with or without a search query
      const bookings = await prisma.booking.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of bookings
      const totalBookings = await prisma.booking.count({ where });

      // Calculate total pages
      const totalPageCount = Math.ceil(totalBookings / limit);

      return {
        data: bookings,
        pagination: {
          currentPage: page,
          totalPages: totalPageCount,
          totalItems: totalBookings,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting bookings with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = Booking;
