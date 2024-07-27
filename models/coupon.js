const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Coupon {
  static async findById(id) {
    try {
      return await prisma.coupon.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding coupon by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.coupon.create({
        data,
      });
    } catch (error) {
      console.error("Error creating coupon:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.coupon.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating coupon by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.coupon.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting coupon by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.coupon.findMany();
    } catch (error) {
      console.error("Error finding all coupons:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch the paginated coupons
      const coupons = await prisma.coupon.findMany({
        skip,
        take: limit,
      });

      // Fetch the total number of coupons
      const totalCoupons = await prisma.coupon.count();

      // Calculate total pages
      const totalPages = Math.ceil(totalCoupons / limit);

      return {
        data: coupons,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCoupons,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting coupons with pagination:", error);
      throw error;
    }
  }
}

module.exports = Coupon;
