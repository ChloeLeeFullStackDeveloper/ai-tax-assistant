import { Injectable } from '@nestjs/common';
import { db } from '../../firebase/firebase.provider';

@Injectable()
export class SuggestionStorageService {
  async save(userId: string, inputData: any, suggestions: string[]) {
    const docRef = db.collection('taxSuggestions').doc();
    await docRef.set({
      userId,
      inputData,
      suggestions,
      createdAt: new Date().toISOString(),
    });
  }
}
