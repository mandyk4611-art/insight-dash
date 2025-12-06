import { useState, useCallback, useMemo } from 'react';
import { 
  CallRecord, 
  parseCSV,
  getCallStatusDistribution,
  getSentimentDistribution,
  getInterestFlagDistribution,
  getAwarenessDistribution,
  getSchemeLevelDistribution,
  getDailyCallVolume,
  getAverageInteractions,
  getTotalCalls,
  getCompletedCalls,
  getConversionRate,
} from '@/utils/csvParser';

// Default sample data
const defaultData: CallRecord[] = [
  { call_id: 331891, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'no', final_interest_flag: 'yes', user_scheme_level: 'first', interaction_count: 9, call_direction: 'outbound' },
  { call_id: 331899, call_date: '2025-12-04', call_status: 'busy', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331900, call_date: '2025-12-04', call_status: 'busy', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331902, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Neutral', awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 1, call_direction: 'outbound' },
  { call_id: 331905, call_date: '2025-12-04', call_status: 'no-answer', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331915, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'second', interaction_count: 12, call_direction: 'outbound' },
  { call_id: 331920, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Negative', awareness_flag: 'no', final_interest_flag: 'no', user_scheme_level: 'first', interaction_count: 5, call_direction: 'outbound' },
  { call_id: 331925, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'third', interaction_count: 8, call_direction: 'outbound' },
  { call_id: 331930, call_date: '2025-12-03', call_status: 'completed', sentiment: 'Neutral', awareness_flag: 'no', final_interest_flag: 'no', user_scheme_level: 'first', interaction_count: 3, call_direction: 'outbound' },
  { call_id: 331940, call_date: '2025-12-03', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'second', interaction_count: 15, call_direction: 'outbound' },
  { call_id: 331950, call_date: '2025-12-03', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'first', interaction_count: 7, call_direction: 'outbound' },
  { call_id: 331955, call_date: '2025-12-02', call_status: 'completed', sentiment: 'Neutral', awareness_flag: 'no', final_interest_flag: 'no', user_scheme_level: 'first', interaction_count: 4, call_direction: 'outbound' },
  { call_id: 331965, call_date: '2025-12-02', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'second', interaction_count: 11, call_direction: 'outbound' },
  { call_id: 331970, call_date: '2025-12-02', call_status: 'completed', sentiment: 'Negative', awareness_flag: 'no', final_interest_flag: 'no', user_scheme_level: 'first', interaction_count: 2, call_direction: 'outbound' },
  { call_id: 331980, call_date: '2025-12-01', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'third', interaction_count: 10, call_direction: 'outbound' },
  { call_id: 331985, call_date: '2025-12-01', call_status: 'completed', sentiment: 'Neutral', awareness_flag: 'no', final_interest_flag: 'yes', user_scheme_level: 'first', interaction_count: 6, call_direction: 'outbound' },
  { call_id: 331995, call_date: '2025-12-01', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'second', interaction_count: 14, call_direction: 'outbound' },
];

export const useCallData = () => {
  const [callData, setCallData] = useState<CallRecord[]>(defaultData);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFromCSV = useCallback((content: string, name: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const parsed = parseCSV(content);
      if (parsed.length === 0) {
        throw new Error('No valid data found in the CSV file');
      }
      setCallData(parsed);
      setFileName(name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse CSV');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setCallData(defaultData);
    setFileName(null);
    setError(null);
  }, []);

  // Computed analytics
  const analytics = useMemo(() => ({
    totalCalls: getTotalCalls(callData),
    completedCalls: getCompletedCalls(callData),
    conversionRate: getConversionRate(callData),
    averageInteractions: getAverageInteractions(callData),
    callStatusDistribution: getCallStatusDistribution(callData),
    sentimentDistribution: getSentimentDistribution(callData),
    interestDistribution: getInterestFlagDistribution(callData),
    awarenessDistribution: getAwarenessDistribution(callData),
    schemeLevelDistribution: getSchemeLevelDistribution(callData),
    dailyVolume: getDailyCallVolume(callData),
  }), [callData]);

  return {
    callData,
    fileName,
    isLoading,
    error,
    loadFromCSV,
    clearData,
    analytics,
  };
};
