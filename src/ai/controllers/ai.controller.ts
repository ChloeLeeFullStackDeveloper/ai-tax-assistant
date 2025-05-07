import { Controller, Post, Body } from '@nestjs/common';
import { SuggestionsService } from '../services/suggestions.service';

@Controller('ai')
export class AIController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post('suggestions')
  async getSuggestions(@Body() userData: any) {
    const suggestions = await this.suggestionsService.generateSuggestions(userData);
    return { suggestions };
  }
}
