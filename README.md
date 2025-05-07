# 🧾 AI-Assisted Tax Suggestion Service

This project provides personalized Canadian tax suggestions based on user data using both rule-based logic and AI (GPT-3.5 via OpenAI API). It also includes an RRSP optimization algorithm and persists results to Firebase Firestore.

---

## 🚀 Features

- ✅ Rule-based suggestions (tuition, dependents, childcare, GST/HST)
- 🤖 GPT-3.5 tax tip generation (OpenAI)
- 📊 RRSP contribution optimization
- 🔒 Firebase data storage
- 🧪 Jest unit tests with mocks

---

## 📦 Tech Stack

- **Backend:** NestJS, TypeScript
- **AI Integration:** OpenAI (gpt-3.5-turbo)
- **Database:** Firebase Firestore
- **Testing:** Jest

---

## 📐 RRSP Optimization Logic

We use a greedy algorithm based on CRA’s 18% rule:

```ts
private calculateOptimalRRSP(income: number, userMax: number): number {
  const maxAllowed = income * 0.18;
  return Math.min(maxAllowed, userMax);
}
```
src/
├── ai/
│   ├── services/
│   │   ├── suggestions.service.ts
│   │   ├── openai.service.ts
│   │   └── suggestion-storage.service.ts
├── firebase/
│   └── firebase.provider.ts
└── main.ts
```

📋 License
MIT
