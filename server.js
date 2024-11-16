import express from "express";
import dotenv from "dotenv";
import rewriteRoutes from "./routes/RewriteText/textRewriteRoutes.js";
import userAuthRoutes from "./routes/user/auth.js";
import userRoutes from "./routes/user/usersRoutes.js";
import contactUsRoutes from "./routes/user/contactUsRoutes.js";
import fileUploadRoutes from "./routes/fileUpload/fileUploadRoutes.js";
import connectDb from "./config/dbConnection.js";

dotenv.config();

const app = express();
app.use(express.json());
connectDb();
const port = process.env.PORT || 8000;

app.use("/api/rewrite", rewriteRoutes);

app.use("/api/user", userAuthRoutes);

app.use("/api/user", userRoutes);

app.use("/api/user", contactUsRoutes);

app.use("/api/file", fileUploadRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
