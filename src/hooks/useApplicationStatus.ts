import { useState, useCallback } from 'react';
import type { ApplicationStatusInfo } from '../types/application';
import type { RequestStatus } from '../types/api';
import { loanService } from '../services/loanService';

interface UseApplicationStatusReturn {
  status: RequestStatus;
  data: ApplicationStatusInfo | null;
  error: string | null;
  lookup: (applicationId: string, mobile: string) => Promise<void>;
  reset: () => void;



  
}

export function useApplicationStatus(): UseApplicationStatusReturn {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [data, setData] = useState<ApplicationStatusInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(async (applicationId: string, mobile: string) => {
    setStatus('loading');
    setError(null);
    setData(null);
    try {
      const result = await loanService.getApplicationStatus(applicationId, mobile);
      setData(result);
      setStatus('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not fetch application status.';
      setError(message);
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  return { status, data, error, lookup, reset };
}
