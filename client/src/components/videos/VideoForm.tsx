import { Button } from "../ui/button";
import { Input } from "../ui/input";

function VideoForm() {
  return (
    <form id="video-form" className="flex flex-col gap-4 max-w-sm mt-4">
      <Input type="file" accept="video/*" />
      <Button className="w-fit">Upload Video</Button>
    </form>
  );
}

export default VideoForm;
