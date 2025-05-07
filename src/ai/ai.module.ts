import { Module } from '@nestjs/common';
import { SuggestionsService } from './services/suggestions.service';
import { SuggestionStorageService } from './services/suggestion-storage.service';
import { OpenAIService } from './services/openai.service';
import { AIController } from './controllers/ai.controller';

@Module({
  controllers: [AIController],
  providers: [SuggestionsService, SuggestionStorageService, OpenAIService],
})
export class AIModule {}
