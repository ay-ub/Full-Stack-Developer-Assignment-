import useVideoStore from "@/store/videoStore";
import { useEffect } from "react";
import Loading from "../Loading";
import Video from "./Video";

function VideoList() {
  const videos = useVideoStore((state) => state.videos);
  const loading = useVideoStore((state) => state.loading);
  const fetchVideos = useVideoStore((state) => state.fetchVideos);

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) {
    return <Loading className="col-span-3 min-h-20" />;
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">No videos uploaded yet</div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoList;
