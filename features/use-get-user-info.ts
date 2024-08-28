import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export function useGetUserInfo(userId: string | undefined) {
  return useQuery({
    queryKey: ["userInfo", userId],
    queryFn: async () => {
      if (!userId) throw new Error("用户ID是必需的");
      const response = await client.api.users[":userId"].$get({
        param: { userId },
      });
      if (!response.ok) throw new Error("获取用户信息失败");
      return response.json();
    },
    enabled: !!userId,
  });
}
