const path = require("path");
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");

const ensureDir = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
};

const safeExtFromMimetype = (mimetype) => {
  if (/^image\/png$/.test(mimetype)) return ".png";
  if (/^image\/jpe?g$/.test(mimetype)) return ".jpg";
  if (/^image\/webp$/.test(mimetype)) return ".webp";
  return "";
};

const multerOptions = () => {
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.params.id || "common";
      const dir = path.join(process.cwd(), "uploads", "avatars", userId);
      ensureDir(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext =
        safeExtFromMimetype(file.originalname) ||
        path.extname(file.originalname).toLowerCase();
      const name = crypto.randomBytes(8).toString("hex");
      cb(null, `${Date.now()}_${name}${ext}`);
    },
  });

  const multerFilter = (req, file, cb) => {
    if (!/^image\/(png|jpe?g|webp)$/.test(file.mimetype)) {
      return cb(new Error("Only PNG/JPG/WEBP allowed"), false);
    }
    cb(null, true);
  };

  const upload = multer({
    storage: multerStorage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: multerFilter,
  });

  return upload;
};

exports.uploadSingleImage = (fileName) => multerOptions().single(fileName);

exports.uploadMixOfImage = (arrayOfFiels) =>
  multerOptions().fields(arrayOfFiels);
