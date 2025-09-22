import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { API_BASE_URL } from "@/config/appConfig";
import { toast } from "sonner";
import Notify from "@/lib/Toast";
import { useState } from "react";
import Loading from "../Loading";
import { DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
import useVideoStore from "@/store/videoStore";

type Inputs = {
  video: FileList;
};

function VideoForm() {
  const [isUploading, setIsUploading] = useState(false);
  const fetchVideos = useVideoStore((state) => state.fetchVideos);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const uploadVideo = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("file", data.video[0]);

    try {
      setIsUploading(true);
      const response = await fetch(`${API_BASE_URL}/upload-video`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      await response.json();
      reset();
      fetchVideos();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    if (!data.video || data.video.length === 0) {
      toast.error("Please select a video file", { icon: "❌" });
      return;
    }
    Notify({
      fn: uploadVideo(data),
      successMessage: "Video has been uploaded",
      errorMessage: "Error uploading video",
    });
  };

  return (
    <form
      id="video-form"
      className="flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label htmlFor="video">Select Video</Label>
      <Input
        type="file"
        accept="video/*"
        id="video"
        {...register("video", { required: true })}
      />
      {errors.video && <span className="text-red-500">Video is required</span>}
      <div className="flex items-center gap-2">
        <DialogClose asChild>
          <Button variant={"destructive"} className="flex-1" id="cancleBtn">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="flex-1" disabled={!!errors.video}>
          {isUploading && <Loading />}Upload Video
        </Button>
      </div>
    </form>
  );
}

export default VideoForm;
