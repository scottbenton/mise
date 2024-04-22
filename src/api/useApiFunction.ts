import { useCallback, useEffect, useState } from "react";
import { ApiFunction } from "./createApiFunction";

interface UseApiFunctionReturn<ReturnType> {
  data?: ReturnType;
  loading: boolean;
  error?: string;
}

export function useApiFunctionImmediately<Params, ReturnType>(
  params: Params,
  apiFunction: ApiFunction<Params, ReturnType>,
  verb: string,
  noun: string
): UseApiFunctionReturn<ReturnType> {
  const [state, setState] = useState<UseApiFunctionReturn<ReturnType>>({
    loading: true,
  });

  useEffect(() => {
    let shouldContinue = true;

    setState({
      loading: true,
    });
    apiFunction(params)
      .then((data) => {
        if (shouldContinue) {
          setState({
            data: data,
            loading: false,
          });
        }
      })
      .catch(() => {
        if (shouldContinue) {
          setState({
            error: `Failed to ${verb} ${noun}.`,
            loading: false,
          });
        }
      });

    return () => {
      shouldContinue = false;
    };
  }, [apiFunction, params, verb, noun]);

  return state;
}

export function useInvokeApiFunction<Params, ReturnType>(
  apiFunction: ApiFunction<Params, ReturnType>,
  verb: string,
  noun: string
): UseApiFunctionReturn<ReturnType> & {
  call: (params: Params) => Promise<ReturnType>;
} {
  const [state, setState] = useState<UseApiFunctionReturn<ReturnType>>({
    loading: true,
  });

  const call = useCallback(
    (params: Params) =>
      new Promise<ReturnType>((resolve, reject) => {
        apiFunction(params)
          .then((data) => {
            resolve(data);
            setState({
              data: data,
              loading: false,
            });
          })
          .catch((e) => {
            reject(e);
            setState({
              error: `Failed to ${verb} ${noun}.`,
              loading: false,
            });
          });
      }),
    [apiFunction, verb, noun]
  );
  return { ...state, call };
}
