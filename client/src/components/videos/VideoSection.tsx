import { VideoIcon } from "lucide-react";
import PopUp from "../PopUp";
import SectionTitle from "../SectionTitle";
import VideoForm from "./VideoForm";
import { Button } from "../ui/button";
import VideoList from "./VideoList";

function VideoSection() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title="Videos" />
        <PopUp
          trigger={
            <Button className="btn btn-primary">
              <VideoIcon className="mx-1 h-4 w-4" />
              Upload Video
            </Button>
          }
        >
          <VideoForm />
        </PopUp>
      </div>
      <VideoList />
    </section>
  );
}

export default VideoSection;
