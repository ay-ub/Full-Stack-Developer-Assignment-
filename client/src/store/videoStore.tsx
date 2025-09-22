import { create } from "zustand";
import type { VideoType } from "@/types/video";
import { API_BASE_URL } from "@/config/appConfig";

type VideoState = {
  videos: VideoType[];
  loading: boolean;

  setVideos: (videos: VideoType[]) => void;
  fetchVideos: () => Promise<void>;
};

const useVideoStore = create<VideoState>()((set) => ({
  videos: [],
  loading: true,
  setVideos: (videos: VideoType[]) => set({ videos }),
  fetchVideos: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos`);
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const data = await response.json();
      set({ videos: data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useVideoStore;
