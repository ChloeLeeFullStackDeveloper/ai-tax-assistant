import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionsService } from './suggestions.service';
import { SuggestionStorageService } from './suggestion-storage.service';
import { OpenAIService } from './openai.service';

describe('SuggestionsService', () => {
  let service: SuggestionsService;

  const mockStorageService = {
    save: jest.fn().mockResolvedValue(undefined), // save는 Promise<void> 반환
  };

  const mockAIService = {
    getTaxSuggestions: jest.fn().mockResolvedValue([
      'AI suggestion 1',
      'AI suggestion 2',
      'AI suggestion 3',
    ]), // Promise<string[]> 반환
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuggestionsService,
        { provide: SuggestionStorageService, useValue: mockStorageService },
        { provide: OpenAIService, useValue: mockAIService },
      ],
    }).compile();

    service = module.get<SuggestionsService>(SuggestionsService);
  });

  it('should generate combined rule-based and AI suggestions', async () => {
    const input = {
      income: 12000,
      rrsp: 1000,
      tuition: 1500,
      dependents: 1,
      childcare: 800,
    };

    const result = await service.generateSuggestions(input);

    expect(mockStorageService.save).toHaveBeenCalledWith(
      'demo-user',
      input,
      expect.any(Array)
    );

    expect(result).toContain('You may be eligible for tuition tax credits.');
    expect(result).toContain('AI suggestion 1');
    expect(result.length).toBeGreaterThan(3); // rule + AI
  });
});
