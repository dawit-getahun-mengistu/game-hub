/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";


interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(enpoint: string, requestConfig?: AxiosRequestConfig, deps? : any[]) => {
  const [data, Data] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true)
    apiClient
      .get<FetchResponse<T>>(enpoint, { signal: controller.signal, ...requestConfig })
      .then((res) => {Data(res.data.results); setLoading(false)})
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false)
      });

    return () => controller.abort();
  }, deps ? [...deps]: []);

  return { data, error, isloading };
};

export default useData;
