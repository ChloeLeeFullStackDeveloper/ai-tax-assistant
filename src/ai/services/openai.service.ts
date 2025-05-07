import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getTaxSuggestions(userData: any): Promise<string[]> {
    const prompt = `
You are a helpful Canadian tax assistant. Based on the following user data, provide 3 personalized tax tips in simple English.

User Data:
- Income: ${userData.income}
- RRSP: ${userData.rrsp}
- Tuition: ${userData.tuition}
- Dependents: ${userData.dependents}
- Childcare: ${userData.childcare}

Tips:
`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });

    console.log("Calling OpenAI API with:", userData);

    const content = response.choices[0]?.message?.content || '';
    return content.split('\n').filter(line => line.trim().length > 0);
  }
}
