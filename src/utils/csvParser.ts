import Papa from 'papaparse';

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

// Column name mappings (handles various naming conventions)
const COLUMN_MAPPINGS: Record<string, keyof CallRecord> = {
  'call_id': 'call_id',
  'callid': 'call_id',
  'call id': 'call_id',
  'id': 'call_id',
  
  'call_date': 'call_date',
  'calldate': 'call_date',
  'call date': 'call_date',
  'date': 'call_date',
  
  'call_status': 'call_status',
  'callstatus': 'call_status',
  'call status': 'call_status',
  'status': 'call_status',
  
  'sentiment': 'sentiment',
  'call_sentiment': 'sentiment',
  
  'awareness_flag': 'awareness_flag',
  'awareness': 'awareness_flag',
  'aware': 'awareness_flag',
  
  'final_interest_flag': 'final_interest_flag',
  'interest_flag': 'final_interest_flag',
  'interest': 'final_interest_flag',
  'interested': 'final_interest_flag',
  
  'user_scheme_level': 'user_scheme_level',
  'scheme_level': 'user_scheme_level',
  'loan_level': 'user_scheme_level',
  'level': 'user_scheme_level',
  
  'interaction_count': 'interaction_count',
  'interactions': 'interaction_count',
  'count': 'interaction_count',
  
  'call_direction': 'call_direction',
  'direction': 'call_direction',
};

const normalizeColumnName = (name: string): keyof CallRecord | null => {
  const normalized = name.toLowerCase().trim();
  return COLUMN_MAPPINGS[normalized] || null;
};

const normalizeValue = (value: string | null | undefined): string | null => {
  if (value === null || value === undefined || value === '' || value === 'null' || value === 'NULL') {
    return null;
  }
  return value.toString().trim();
};

const parseCallStatus = (value: string | null): CallRecord['call_status'] => {
  if (!value) return 'failed';
  const normalized = value.toLowerCase().trim();
  if (normalized.includes('complet')) return 'completed';
  if (normalized.includes('busy')) return 'busy';
  if (normalized.includes('no') && normalized.includes('answer')) return 'no-answer';
  if (normalized === 'no-answer' || normalized === 'noanswer') return 'no-answer';
  return 'failed';
};

const parseSentiment = (value: string | null): CallRecord['sentiment'] => {
  if (!value) return null;
  const normalized = value.toLowerCase().trim();
  if (normalized.includes('positive') || normalized === 'pos') return 'Positive';
  if (normalized.includes('negative') || normalized === 'neg') return 'Negative';
  if (normalized.includes('neutral') || normalized === 'neu') return 'Neutral';
  return null;
};

const parseYesNo = (value: string | null): 'yes' | 'no' | null => {
  if (!value) return null;
  const normalized = value.toLowerCase().trim();
  if (normalized === 'yes' || normalized === 'y' || normalized === '1' || normalized === 'true') return 'yes';
  if (normalized === 'no' || normalized === 'n' || normalized === '0' || normalized === 'false') return 'no';
  return null;
};

const parseSchemeLevel = (value: string | null): CallRecord['user_scheme_level'] => {
  if (!value) return null;
  const normalized = value.toLowerCase().trim();
  if (normalized.includes('first') || normalized === '1' || normalized === '1st') return 'first';
  if (normalized.includes('second') || normalized === '2' || normalized === '2nd') return 'second';
  if (normalized.includes('third') || normalized === '3' || normalized === '3rd') return 'third';
  return null;
};

const parseCallDirection = (value: string | null): CallRecord['call_direction'] => {
  if (!value) return 'outbound';
  const normalized = value.toLowerCase().trim();
  if (normalized.includes('inbound') || normalized === 'in') return 'inbound';
  return 'outbound';
};

export const parseCSV = (fileContent: string): CallRecord[] => {
  const result = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  const records: CallRecord[] = [];

  result.data.forEach((row: any, index: number) => {
    const mappedRow: Partial<CallRecord> = {};
    
    // Map columns to our standard format
    Object.keys(row).forEach((key) => {
      const mappedKey = normalizeColumnName(key);
      if (mappedKey) {
        const rawValue = normalizeValue(row[key]);
        
        switch (mappedKey) {
          case 'call_id':
            mappedRow.call_id = parseInt(rawValue || String(index + 1), 10) || index + 1;
            break;
          case 'call_date':
            mappedRow.call_date = rawValue || new Date().toISOString().split('T')[0];
            break;
          case 'call_status':
            mappedRow.call_status = parseCallStatus(rawValue);
            break;
          case 'sentiment':
            mappedRow.sentiment = parseSentiment(rawValue);
            break;
          case 'awareness_flag':
            mappedRow.awareness_flag = parseYesNo(rawValue);
            break;
          case 'final_interest_flag':
            mappedRow.final_interest_flag = parseYesNo(rawValue);
            break;
          case 'user_scheme_level':
            mappedRow.user_scheme_level = parseSchemeLevel(rawValue);
            break;
          case 'interaction_count':
            mappedRow.interaction_count = parseInt(rawValue || '0', 10) || 0;
            break;
          case 'call_direction':
            mappedRow.call_direction = parseCallDirection(rawValue);
            break;
        }
      }
    });

    // Only add rows that have at least some data
    if (Object.keys(mappedRow).length > 0) {
      records.push({
        call_id: mappedRow.call_id || index + 1,
        call_date: mappedRow.call_date || new Date().toISOString().split('T')[0],
        call_status: mappedRow.call_status || 'failed',
        sentiment: mappedRow.sentiment || null,
        awareness_flag: mappedRow.awareness_flag || null,
        final_interest_flag: mappedRow.final_interest_flag || null,
        user_scheme_level: mappedRow.user_scheme_level || null,
        interaction_count: mappedRow.interaction_count || 0,
        call_direction: mappedRow.call_direction || 'outbound',
      });
    }
  });

  return records;
};

// Analytics helper functions that take data as parameter
export const getCallStatusDistribution = (data: CallRecord[]) => {
  return data.reduce((acc, call) => {
    acc[call.call_status] = (acc[call.call_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getSentimentDistribution = (data: CallRecord[]) => {
  const completedCalls = data.filter(c => c.sentiment);
  return completedCalls.reduce((acc, call) => {
    if (call.sentiment) {
      acc[call.sentiment] = (acc[call.sentiment] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
};

export const getInterestFlagDistribution = (data: CallRecord[]) => {
  const completedCalls = data.filter(c => c.final_interest_flag);
  return completedCalls.reduce((acc, call) => {
    if (call.final_interest_flag) {
      const label = call.final_interest_flag === 'yes' ? 'Interested' : 'Not Interested';
      acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
};

export const getAwarenessDistribution = (data: CallRecord[]) => {
  const completedCalls = data.filter(c => c.awareness_flag);
  return completedCalls.reduce((acc, call) => {
    if (call.awareness_flag) {
      const label = call.awareness_flag === 'yes' ? 'Aware' : 'Not Aware';
      acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
};

export const getSchemeLevelDistribution = (data: CallRecord[]) => {
  const callsWithLevel = data.filter(c => c.user_scheme_level);
  return callsWithLevel.reduce((acc, call) => {
    if (call.user_scheme_level) {
      const label = `Loan ${call.user_scheme_level.charAt(0).toUpperCase() + call.user_scheme_level.slice(1)}`;
      acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
};

export const getDailyCallVolume = (data: CallRecord[]) => {
  const volume = data.reduce((acc, call) => {
    acc[call.call_date] = (acc[call.call_date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(volume).sort(([a], [b]) => a.localeCompare(b));
};

export const getAverageInteractions = (data: CallRecord[]) => {
  const completedCalls = data.filter(c => c.call_status === 'completed');
  if (completedCalls.length === 0) return '0';
  const total = completedCalls.reduce((sum, c) => sum + c.interaction_count, 0);
  return (total / completedCalls.length).toFixed(1);
};

export const getTotalCalls = (data: CallRecord[]) => data.length;

export const getCompletedCalls = (data: CallRecord[]) => 
  data.filter(c => c.call_status === 'completed').length;

export const getConversionRate = (data: CallRecord[]) => {
  const completedCalls = data.filter(c => c.call_status === 'completed');
  if (completedCalls.length === 0) return '0';
  const interested = completedCalls.filter(c => c.final_interest_flag === 'yes').length;
  return ((interested / completedCalls.length) * 100).toFixed(1);
};
