import { z } from "zod";
import { create } from "zustand";

import { DashboardPage } from "@/defines/dashboard-page";

const uiEventSchema = z.object({
  showLogin: z.boolean().default(false),
  dashboardPage: z.string().default(DashboardPage.Home),
  showSettings: z.boolean().default(false),
});

type UIEvent = z.infer<typeof uiEventSchema>;

interface UIEventStore {
  event: UIEvent;
  setEvent: (event: UIEvent) => void;
  reset: () => void;
  setShowLogin: (showLogin: boolean) => void;
  setDashboardPage: (dashboardPage: string) => void;
  setShowSettings: (showSettings: boolean) => void;
}

const useUIEventStore = create<UIEventStore>((set) => ({
  event: {
    showLogin: false,
    dashboardPage: DashboardPage.Home,
    showSettings: false,
  },
  setEvent: (event) => set({ event }),
  reset: () =>
    set({
      event: {
        showLogin: false,
        dashboardPage: DashboardPage.Home,
        showSettings: false,
      },
    }),
  setShowLogin: (showLogin) =>
    set((prevState) => ({
      event: { ...prevState.event, showLogin },
    })),
  setDashboardPage: (dashboardPage) =>
    set((prevState) => ({
      event: { ...prevState.event, dashboardPage },
    })),
  setShowSettings: (showSettings) =>
    set((prevState) => ({
      event: { ...prevState.event, showSettings },
    })),
}));

export default useUIEventStore;
