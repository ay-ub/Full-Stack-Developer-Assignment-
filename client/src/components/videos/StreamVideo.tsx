import { API_BASE_URL } from "@/config/appConfig";

export default function StreamVideo({ vedioId }: { vedioId: string }) {
  return (
    <video
      controls
      width="640"
      height="360"
      autoPlay
      className="w-full max-w-2xl mx-auto rounded-lg"
      src={`${API_BASE_URL}/videos/stream/${vedioId}`}
    >
      Your browser does not support the video tag.
    </video>
  );
}
