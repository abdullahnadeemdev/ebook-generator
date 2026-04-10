import multer from "multer";
import path from "path";
import fs from "fs";

//creating upload directoru if it doesnt exists

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// function to check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error:images only");
  }
}

//initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, //2MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("coverImage"); //field name for the uploaded file

export default upload;
