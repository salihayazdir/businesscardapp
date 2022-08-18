
import nextConnect from 'next-connect';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const suffix = `${uuid()}-`
      cb(null, suffix+file.originalname)
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('theImage'));

apiRoute.post((req, res) => {
  res.status(200).json({ success:true, filename: req.file.filename });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};





// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

// export default (req, res) => {
//   if (req.method === 'POST') {
//     // Process a POST request
//     res.status(200).json({ data: 'success' });
//   } else {
//     // Handle any other HTTP method
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   }
// };