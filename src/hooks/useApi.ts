import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "localhost";

//generic fetch function
async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    console.log(`${BASE_URL}${url}`);
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
  });

  if (!res.ok) {
    throw new Error((await res.text()) || "API request failed");
  }

  return res.json();
}

export function useApiQuery<T>(
  key: string[],
  url: string,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => fetcher<T>(url),
    ...options,
  });
}

export function useApiMutation<T>(
    url: string,
    method: "POST"|"PUT"|"DELETE",
    options?: UseMutationOptions<T, Error, any>
){
  return useMutation<T, Error, any>({
    mutationFn: async(body: any) => {
      let fetchOptions: RequestInit;
      if(body instanceof FormData){
        fetchOptions = { method, body};

      }else{
        fetchOptions = {
          method,
          headers: { "Content-Type":"application/json"},
          body: JSON.stringify(body)
        };
      }
      return fetcher<T>(url, fetchOptions);
    }, ...options
  });
    // return useMutation<T, Error, any>({
    //     mutationFn: async(body: any) => fetcher<T>(url, {
    //         method,
    //         body: JSON.stringify(body),
    //     }),
    //     ...options,
    // });
}
