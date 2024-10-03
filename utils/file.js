const fs = require('fs').promises;

/**
 * Deletes a file based on the provided file path.
 * @param {string} filePath - The path to the file to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the file is deleted.
 * @throws {Error} - Throws an error if the file cannot be deleted.
 */
exports.deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
};

/**
 * Deletes multiple files based on the provided file paths.
 * @param {string[]} filePaths - An array of file paths to be deleted.
 * @returns {Promise<void>} - A promise that resolves when all files are deleted.
 * @throws {Error} - Throws an error if any file cannot be deleted.
 */
exports.deleteFiles = async (filePaths) => {
  await Promise.all(filePaths.map(this.deleteFile));
};
