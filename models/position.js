const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Position {
  // Get a position by ID (this is the missing method you need)
  static async findById(id) {
    try {
      const position = await prisma.position.findUnique({
        where: { id },
      });
      if (!position) {
        throw new Error('Position not found');
      }
      return position;
    } catch (error) {
      console.error('Error fetching position by ID:', error);
      throw new Error('Could not fetch position');
    }
  }
  // Create a new position
  static async createPosition(data) {
    try {
      const newPosition = await prisma.position.create({
        data,
      });
      return newPosition;
    } catch (error) {
      console.error('Error creating position:', error);
      throw new Error('Could not create position');
    }
  }

  // Get a position by ID
  static async getPositionById(id) {
    try {
      const position = await prisma.position.findUnique({
        where: { id },
      });
      if (!position) {
        throw new Error('Position not found');
      }
      return position;
    } catch (error) {
      console.error('Error fetching position by ID:', error);
      throw new Error('Could not fetch position');
    }
  }

  // Get all positions (with optional pagination)
  static async getPositions(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const positions = await prisma.position.findMany({
        skip,
        take: limit,
      });
      const total = await prisma.position.count();

      return {
        data: positions,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
        },
      };
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw new Error('Could not fetch positions');
    }
  }

  // Get All positions
  static async getAllPositions() {
    try {
      const positions = await prisma.position.findMany();
      return positions;
    } catch (error) {
      console.error('Error fetching positions:', error);
      throw new Error('Could not fetch positions');
    }
  }

  // Update a position by ID
  static async updatePositionById(id, data) {
    try {
      const updatedPosition = await prisma.position.update({
        where: { id },
        data,
      });
      return updatedPosition;
    } catch (error) {
      console.error('Error updating position:', error);
      throw new Error('Could not update position');
    }
  }

  // Delete a position by ID
  static async deletePositionById(id) {
    try {
      await prisma.position.delete({
        where: { id },
      });
      return { message: 'Position deleted successfully' };
    } catch (error) {
      console.error('Error deleting position:', error);
      throw new Error('Could not delete position');
    }
  }
}

module.exports = Position;
