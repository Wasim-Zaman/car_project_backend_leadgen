const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Advertisement {
  // Create a new advertisement
  static async create(data) {
    return prisma.advertisement.create({ data });
  }

  // Find an advertisement by positionId and moduleType
  static async findAdByPositionAndModule(positionId, moduleType) {
    return prisma.advertisement.findFirst({
      where: {
        positionId,
        moduleType,
      },
    });
  }

  // Find an advertisement by ID
  static async findById(id) {
    return prisma.advertisement.findUnique({ where: { id } });
  }

  // Get all advertisements with pagination
  static async getAll(page, limit) {
    const [data, total] = await prisma.$transaction([
      prisma.advertisement.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.advertisement.count(),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
      },
    };
  }

  // Update an advertisement by ID
  static async updateById(id, data) {
    return prisma.advertisement.update({
      where: { id },
      data,
    });
  }

  // Delete an advertisement by ID
  static async deleteById(id) {
    return prisma.advertisement.delete({
      where: { id },
    });
  }
}

module.exports = Advertisement;
