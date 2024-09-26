const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Zone {
  // Find Zone by ID
  static async findById(id) {
    try {
      return await prisma.zone.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error('Error finding Zone by id:', error);
      throw error;
    }
  }

  // Create Zone
  static async create(data) {
    try {
      console.log(`Creating Zone with data: ${JSON.stringify(data)}`);
      return await prisma.zone.create({
        data: {
          name: data.name,
        },
      });
    } catch (error) {
      console.error('Error creating Zone:', error);
      throw error;
    }
  }

  // Update Zone by ID
  static async updateById(id, data) {
    try {
      console.log(`Updating Zone with ID ${id} and data: ${JSON.stringify(data)}`);
      return await prisma.zone.update({
        where: { id: id },
        data: {
          name: data.name,
        },
      });
    } catch (error) {
      console.error(`Error updating Zone with id ${id}:`, error.message);
      throw new Error(`Unable to update Zone with id ${id}`);
    }
  }

  // Delete Zone by ID
  static async deleteById(id) {
    try {
      console.log(`Deleting Zone with ID ${id}`);
      return await prisma.zone.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error('Error deleting Zone by id:', error);
      throw error;
    }
  }

  // Get all Zones
  static async getAll() {
    try {
      return await prisma.zone.findMany();
    } catch (error) {
      console.error('Error finding all Zones:', error);
      throw error;
    }
  }

  // Paginated search with query
  static async get(page = 1, limit = 10, query = '') {
    try {
      const skip = (page - 1) * limit;

      const where = query
        ? {
            OR: [{ name: { contains: query } }],
          }
        : {};

      const zones = await prisma.zone.findMany({
        skip,
        take: limit,
        where,
      });

      const totalZones = await prisma.zone.count({ where });

      const totalPages = Math.ceil(totalZones / limit);

      return {
        data: zones,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalZones,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error('Error getting Zones with pagination and search:', error);
      throw error;
    }
  }
}

module.exports = Zone;
