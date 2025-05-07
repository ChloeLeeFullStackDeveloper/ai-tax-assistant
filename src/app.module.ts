import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ 추가
import { SuggestionsService } from './ai/services/suggestions.service';
import { SuggestionStorageService } from './ai/services/suggestion-storage.service';
import { OpenAIService } from './ai/services/openai.service';
import { AIController } from './ai/controllers/ai.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), // ✅ 등록 필수
  ],
  controllers: [AIController],
  providers: [SuggestionsService, SuggestionStorageService, OpenAIService],
})
export class AIModule {}
