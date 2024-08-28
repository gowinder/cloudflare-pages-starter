import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to logout");
      return response.json();
    },
  });
}
