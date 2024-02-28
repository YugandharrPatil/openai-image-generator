import express from "express";
import { generateImage } from "../controllers/openai-controller.js";
const router = express.Router();

export const openaiRouter = router.post("/generateimage", generateImage);
