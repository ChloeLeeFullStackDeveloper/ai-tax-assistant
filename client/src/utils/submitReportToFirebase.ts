import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { User as FirebaseUser } from 'firebase/auth';

interface TaxSummary {
  taxOwed: number;
  credits: number;
  netPayable: number;
}

interface TaxReport {
  userId: string;
  taxSummary: TaxSummary;
  input: any;
  timestamp: string;
}

export const submitReportToFirebase = async (
  user: FirebaseUser | null,
  taxSummary: TaxSummary,
  input: any
): Promise<string> => {
  if (!user) throw new Error('User not authenticated');

  const report: TaxReport = {
    userId: user.uid,
    taxSummary,
    input,
    timestamp: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, 'taxReports'), report);
  return docRef.id;
};
