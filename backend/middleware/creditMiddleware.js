import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/xml" || file.mimetype === "application/xml") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only XML files are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

export default upload;
