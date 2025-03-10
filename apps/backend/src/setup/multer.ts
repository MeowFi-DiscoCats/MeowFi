import multer, { StorageEngine, Multer } from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const storageImg: StorageEngine = multer.memoryStorage();

const uploadImg: Multer = multer({ storage: storageImg });

const processAndSaveImage = async (
  file: Express.Multer.File,
): Promise<string> => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const outputFilename = `image-${uniqueSuffix}.webp`;
  const outputPath = path.join(__dirname, "./src/files/images", outputFilename);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await sharp(file.buffer).resize(250).webp({ quality: 80 }).toFile(outputPath);

  return outputFilename;
};

export { uploadImg, processAndSaveImage };
