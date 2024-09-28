const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Advertisement {
  // Create a new advertisement
  static async create(data) {
    try {
      const ad = await prisma.advertisement.create({
        data: {
          campaignName: data.campaignName,
          moduleType: data.moduleType,
          image: data.image,
          publishDate: data.publishDate,
          unpublishDate: data.unpublishDate,
          positionId: data.positionId,
          zoneId: data.zoneId,
        },
      });
      return ad;
    } catch (error) {
      console.error('Error creating advertisement:', error);
      throw new Error('Could not create advertisement');
    }
  }

  // Find advertisement by ID
  static async findById(id) {
    try {
      const ad = await prisma.advertisement.findUnique({
        where: { id },
      });
      return ad;
    } catch (error) {
      console.error('Error finding advertisement by ID:', error);
      throw new Error('Could not find advertisement');
    }
  }

  // Update advertisement by ID
  static async updateById(id, data) {
    try {
      const updatedAd = await prisma.advertisement.update({
        where: { id },
        data: {
          campaignName: data.campaignName,
          moduleType: data.moduleType,
          image: data.image,
          publishDate: data.publishDate,
          unpublishDate: data.unpublishDate,
          positionId: data.positionId,
          zoneId: data.zoneId,
        },
      });
      return updatedAd;
    } catch (error) {
      console.error('Error updating advertisement:', error);
      throw new Error('Could not update advertisement');
    }
  }

  // Delete advertisement by ID
  static async deleteById(id) {
    try {
      await prisma.advertisement.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      throw new Error('Could not delete advertisement');
    }
  }

  // Find advertisements by position and module type (only active ones based on unpublishDate)
  static async findActiveAdByPositionAndModule(positionId, moduleType) {
    try {
      const ad = await prisma.advertisement.findFirst({
        where: {
          positionId,
          moduleType,
          unpublishDate: {
            gte: new Date(), // Only find ads where unpublishDate is in the future (active ads)
          },
        },
      });
      return ad;
    } catch (error) {
      console.error('Error finding active advertisement by position and module:', error);
      throw new Error('Could not find active advertisement');
    }
  }

  // Find all expired advertisements (unpublishDate in the past)
  static async findExpiredAdvertisements(now) {
    try {
      const expiredAds = await prisma.advertisement.findMany({
        where: {
          unpublishDate: {
            lt: now,
          },
        },
      });
      return expiredAds;
    } catch (error) {
      console.error('Error finding expired advertisements:', error);
      throw new Error('Could not find expired advertisements');
    }
  }

  // Get all advertisements with pagination
  static async getAll(page, limit) {
    try {
      const ads = await prisma.advertisement.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      const totalAds = await prisma.advertisement.count(); // For pagination

      return {
        data: ads,
        pagination: {
          total: totalAds,
          currentPage: page,
          pageSize: limit,
          totalPages: Math.ceil(totalAds / limit),
        },
      };
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      throw new Error('Could not fetch advertisements');
    }
  }
}

module.exports = Advertisement;
