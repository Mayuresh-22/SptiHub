import Groq from "groq-sdk";


class GroqService {
	groq: Groq | undefined;

    async sendMessage(message: any, GROQ_API_KEY: string) {
		const groq = new Groq({ apiKey: GROQ_API_KEY });
		const chatCompletion = await groq.chat.completions.create({
			"messages": message,
			"model": "gemma-7b-it",
			"temperature": 0.71,
			"max_tokens": 900,
			"top_p": 0.75,
			"stream": false,
			"stop": null
		});

		return chatCompletion.choices[0].message.content;
	}
}


export default new GroqService;