import express from 'express';
import dotenv from 'dotenv';
import rewriteRoutes from './routes/RewriteText/textRewriteRoutes.js';
import userAuthRoutes from './routes/user/auth.js';
import connectDb from './config/dbConnection.js';
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDb();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send('main project backend is working now')
})

app.use('/api/rewrite', rewriteRoutes);

app.use('/api/user', userAuthRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
