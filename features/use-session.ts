import { Session } from "@auth/core/types";
import { QueryClient, useQuery } from "@tanstack/react-query";

export interface CustomSession extends Session {
  token?: {
    sub?: string;
  };
}

export const useSession = (): { session: CustomSession; status: string } => {
  const { data, status } = useQuery(
    {
      queryKey: ["session"],
      queryFn: async () => {
        const res = await fetch("/api/auth/session");
        return res.json();
      },
      staleTime: 5 * (60 * 1000),
      gcTime: 10 * (60 * 1000),
      refetchOnWindowFocus: true,
    },
    new QueryClient()
  );
  return { session: data as CustomSession, status };
};
