// Mock data based on PM-SVANidhi Voice Agent Call Summary
export interface CallRecord {
  call_id: number;
  call_date: string;
  call_status: 'completed' | 'busy' | 'no-answer' | 'failed';
  sentiment: 'Positive' | 'Neutral' | 'Negative' | null;
  awareness_flag: 'yes' | 'no' | null;
  final_interest_flag: 'yes' | 'no' | null;
  user_scheme_level: 'first' | 'second' | 'third' | null;
  interaction_count: number;
  call_direction: 'outbound' | 'inbound';
}

// Simulated dataset based on the Excel structure
export const callData: CallRecord[] = [
  { call_id: 331891, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'no', final_interest_flag: 'yes', user_scheme_level: 'first', interaction_count: 9, call_direction: 'outbound' },
  { call_id: 331899, call_date: '2025-12-04', call_status: 'busy', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331900, call_date: '2025-12-04', call_status: 'busy', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331902, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Neutral', awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 1, call_direction: 'outbound' },
  { call_id: 331905, call_date: '2025-12-04', call_status: 'no-answer', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331907, call_date: '2025-12-04', call_status: 'no-answer', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331910, call_date: '2025-12-04', call_status: 'busy', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331915, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'second', interaction_count: 12, call_direction: 'outbound' },
  { call_id: 331920, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Negative', awareness_flag: 'no', final_interest_flag: 'no', user_scheme_level: 'first', interaction_count: 5, call_direction: 'outbound' },
  { call_id: 331925, call_date: '2025-12-04', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'third', interaction_count: 8, call_direction: 'outbound' },
  { call_id: 331930, call_date: '2025-12-03', call_status: 'completed', sentiment: 'Neutral', awareness_flag: 'no', final_interest_flag: 'no', user_scheme_level: 'first', interaction_count: 3, call_direction: 'outbound' },
  { call_id: 331935, call_date: '2025-12-03', call_status: 'busy', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331940, call_date: '2025-12-03', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'second', interaction_count: 15, call_direction: 'outbound' },
  { call_id: 331945, call_date: '2025-12-03', call_status: 'no-answer', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331950, call_date: '2025-12-03', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'first', interaction_count: 7, call_direction: 'outbound' },
  { call_id: 331955, call_date: '2025-12-02', call_status: 'completed', sentiment: 'Neutral', awareness_flag: 'no', final_interest_flag: 'no', user_scheme_level: 'first', interaction_count: 4, call_direction: 'outbound' },
  { call_id: 331960, call_date: '2025-12-02', call_status: 'busy', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331965, call_date: '2025-12-02', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'second', interaction_count: 11, call_direction: 'outbound' },
  { call_id: 331970, call_date: '2025-12-02', call_status: 'completed', sentiment: 'Negative', awareness_flag: 'no', final_interest_flag: 'no', user_scheme_level: 'first', interaction_count: 2, call_direction: 'outbound' },
  { call_id: 331975, call_date: '2025-12-02', call_status: 'no-answer', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331980, call_date: '2025-12-01', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'third', interaction_count: 10, call_direction: 'outbound' },
  { call_id: 331985, call_date: '2025-12-01', call_status: 'completed', sentiment: 'Neutral', awareness_flag: 'no', final_interest_flag: 'yes', user_scheme_level: 'first', interaction_count: 6, call_direction: 'outbound' },
  { call_id: 331990, call_date: '2025-12-01', call_status: 'busy', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
  { call_id: 331995, call_date: '2025-12-01', call_status: 'completed', sentiment: 'Positive', awareness_flag: 'yes', final_interest_flag: 'yes', user_scheme_level: 'second', interaction_count: 14, call_direction: 'outbound' },
  { call_id: 332000, call_date: '2025-12-01', call_status: 'no-answer', sentiment: null, awareness_flag: null, final_interest_flag: null, user_scheme_level: null, interaction_count: 0, call_direction: 'outbound' },
];

// Analytics helper functions
export const getCallStatusDistribution = () => {
  const distribution = callData.reduce((acc, call) => {
    acc[call.call_status] = (acc[call.call_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getSentimentDistribution = () => {
  const completedCalls = callData.filter(c => c.sentiment);
  const distribution = completedCalls.reduce((acc, call) => {
    if (call.sentiment) {
      acc[call.sentiment] = (acc[call.sentiment] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getInterestFlagDistribution = () => {
  const completedCalls = callData.filter(c => c.final_interest_flag);
  const distribution = completedCalls.reduce((acc, call) => {
    if (call.final_interest_flag) {
      const label = call.final_interest_flag === 'yes' ? 'Interested' : 'Not Interested';
      acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getAwarenessDistribution = () => {
  const completedCalls = callData.filter(c => c.awareness_flag);
  const distribution = completedCalls.reduce((acc, call) => {
    if (call.awareness_flag) {
      const label = call.awareness_flag === 'yes' ? 'Aware' : 'Not Aware';
      acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getSchemeLevelDistribution = () => {
  const callsWithLevel = callData.filter(c => c.user_scheme_level);
  const distribution = callsWithLevel.reduce((acc, call) => {
    if (call.user_scheme_level) {
      const label = `Loan ${call.user_scheme_level.charAt(0).toUpperCase() + call.user_scheme_level.slice(1)}`;
      acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return distribution;
};

export const getDailyCallVolume = () => {
  const volume = callData.reduce((acc, call) => {
    acc[call.call_date] = (acc[call.call_date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(volume).sort(([a], [b]) => a.localeCompare(b));
};

export const getAverageInteractions = () => {
  const completedCalls = callData.filter(c => c.call_status === 'completed');
  const total = completedCalls.reduce((sum, c) => sum + c.interaction_count, 0);
  return (total / completedCalls.length).toFixed(1);
};

export const getTotalCalls = () => callData.length;
export const getCompletedCalls = () => callData.filter(c => c.call_status === 'completed').length;
export const getConversionRate = () => {
  const completedCalls = callData.filter(c => c.call_status === 'completed');
  const interested = completedCalls.filter(c => c.final_interest_flag === 'yes').length;
  return ((interested / completedCalls.length) * 100).toFixed(1);
};
