/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ApiResponse } from '../../interfaces/api';
import { apiHost } from '../../config/api.config';

export const useGetItems = (url: string, params?: string): ApiResponse => {
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAPIData = async () => {
      setLoading(true);
      try {
        const apiResponse = await fetch(`${apiHost}/${url}?${params ?? ''}`);
        const { data } = await apiResponse.json();
        setStatus(apiResponse.status);
        setStatusText(apiResponse.statusText);
        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    getAPIData().catch(console.error);
  }, []);

  return { status, statusText, data, error, loading };
};
