const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

class Admin {
  static async findByEmail(email) {
    try {
      const admin = await prisma.admin.findUnique({
        where: { email: email.toString() },
      });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  static async createAdmin(data) {
    try {
      console.log(`Creating admin with data: ${JSON.stringify(data)}`);
      const admin = await prisma.admin.create({
        data: {
          ...data,
          password: data.password, // Use already hashed password
        },
      });
      console.log(`Admin created with data: ${JSON.stringify(admin)}`);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  static async comparePassword(inputPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    console.log(
      `Comparing passwords: ${inputPassword} vs ${hashedPassword} -> ${isMatch}`
    );
    return isMatch;
  }

  static async createPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(`Created hashed password: ${hashedPassword}`);
    return hashedPassword;
  }
}

module.exports = Admin;
