import multer from 'multer';
import path from 'path';

// Define um filtro para aceitar apenas os tipos de arquivo desejados (.pdf e .csv)

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  console.log(file);

  const allowedMimes = ['text/csv', 'application/pdf'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only CSV and PDF are allowed.'));
  }
};

// Usaremos o armazenamento em memória. O arquivo ficará disponível como um Buffer em `req.file.buffer`.
// Isso é ótimo para processamento imediato sem salvar no disco.
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10 // Limite de 10MB
  }
});

export default upload;