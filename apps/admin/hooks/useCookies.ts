import { useQuery } from "@tanstack/react-query";

export const getCookies = async (): Promise<
  { name: string; value: string; path: string }[]
> => {
  const response = await fetch("/api/cookies");
  const data = await response.json();
  return data;
};

export const useCookies = () => {
  return useQuery({
    queryKey: ["cookies"],
    queryFn: getCookies,
  });
};
