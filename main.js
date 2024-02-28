import { config as dotenvConfig } from "dotenv";
import express from "express";
dotenvConfig();
const app = express();
const PORT = process.env.PORT || 5000;

// enable body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set static folder
app.use(express.static("public"));

import { openaiRouter } from "./routes/openai-routes.js";

app.use("/openai", openaiRouter);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
