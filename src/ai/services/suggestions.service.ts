import { Injectable } from '@nestjs/common';
import { SuggestionStorageService } from './suggestion-storage.service';
import { OpenAIService } from './openai.service';

@Injectable()
export class SuggestionsService {
  constructor(
    private readonly storageService: SuggestionStorageService,
    private readonly aiService: OpenAIService,
  ) {}

  // RRSP 최적화 알고리즘
  private calculateOptimalRRSP(income: number, userMax: number): number {
    const maxAllowed = income * 0.18; // CRA 기준 RRSP 기여 한도
    return Math.min(maxAllowed, userMax);
  }

  async generateSuggestions(userData: any): Promise<string[]> {
    const ruleBasedSuggestions: string[] = [];

    const { income = 0, rrsp = 0, tuition = 0, dependents = 0, childcare = 0 } = userData;

    // ✅ 규칙 기반 추천
    if (tuition > 0) {
      ruleBasedSuggestions.push("You may be eligible for tuition tax credits.");
    }
    if (dependents > 0) {
      ruleBasedSuggestions.push("Consider claiming dependent-related tax credits.");
    }
    if (childcare > 0) {
      ruleBasedSuggestions.push("Childcare expenses may be tax deductible.");
    }
    if (income < 15000) {
      ruleBasedSuggestions.push("You may qualify for the GST/HST credit.");
    }

    // ✅ 최적화 알고리즘 추천 추가 (하나만 유지)
    const optimalRRSP = this.calculateOptimalRRSP(income, rrsp);
    if (optimalRRSP > 0) {
      ruleBasedSuggestions.push(
        `Based on your income, your maximum RRSP contribution room is $${optimalRRSP.toFixed(2)}.`
      );
    }

    
    console.log("📨 Input received:", userData);
    console.log("📊 Optimal RRSP:", optimalRRSP);
    console.log("📜 Rule-based suggestions:", ruleBasedSuggestions);

    const aiSuggestions = await this.aiService.getTaxSuggestions(userData);
    console.log("🧠 AI suggestions:", aiSuggestions);

    // 🔹 GPT 추천 활성화 시
    // const aiSuggestions = await this.aiService.getTaxSuggestions(userData);
    const allSuggestions = [...ruleBasedSuggestions, ...aiSuggestions];
    await this.storageService.save('demo-user', userData, allSuggestions);
    return allSuggestions;

    return ruleBasedSuggestions;
  }
}
