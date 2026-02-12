import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: join(__dirname, '..', 'uploads'),
    filename: (_req, file, cb) => {
      cb(null, randomUUID() + extname(file.originalname));
    },
  }),
};
