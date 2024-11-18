import express from 'express';
import dotenv from 'dotenv';
import rewriteRoutes from './routes/RewriteText/textRewriteRoutes.js';
import userAuthRoutes from './routes/user/auth.js';
import connectDb from './config/dbConnection.js';
import userRoutes from './routes/user/usersRoutes.js';
import fileUploadRoutes from './routes/fileUpload/fileUploadRoutes.js';
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDb();
const port = process.env.PORT || 8000;

// app.get("/", (req, res) => {
//     res.send('main project backend is working now')
// })

app.use('/api/rewrite', rewriteRoutes);

app.use('/api/user', userAuthRoutes);

app.use("/api/user", userRoutes);

app.use("/api/user", contactUsRoutes);

app.use("/api/file", fileUploadRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
