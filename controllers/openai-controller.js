import { config as dotenvConfig } from "dotenv";
import OpenAI from "openai";

dotenvConfig();

export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const generateImage = async (req, res) => {
	const { prompt, size } = req.body;

	const imageSize = size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

	try {
		const response = await openai.images.generate({
			prompt,
			n: 1,
			size: imageSize,
		});

		const imageURL = response.data[0].url;

		res.status(200).json({
			success: true,
			data: imageURL,
		});
	} catch (error) {
		if (error.response) {
			// just for the developer to view
			console.log(error.response.status);
			console.log(error.response.data);
		}
		// error to display to the client
		res.status(400).json({
			success: false,
			error: "The image couldn't be generated", // usually when policy is violated
		});
	}
};
