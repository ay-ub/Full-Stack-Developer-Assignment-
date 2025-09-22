import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "../ui/card";
import type { VideoType } from "../../types/video";
import { formatDate, formatDuration, formatFileSize } from "@/lib/file";
import PopUp from "../PopUp";
import { Button } from "../ui/button";
import { VideoIcon } from "lucide-react";
import StreamVideo from "./StreamVideo";

function Video({ video }: { video: VideoType }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg truncate" title={video.name}>
          {video.name}
        </CardTitle>
        <CardAction>
          <PopUp
            trigger={
              <Button asChild size="icon">
                <VideoIcon className="mx-1 cursor-pointer p-2" />
              </Button>
            }
          >
            <StreamVideo vedioId={video.id} />
          </PopUp>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium text-gray-600">Duration:</span>
            <div>{formatDuration(video.duration)}</div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Size:</span>
            <div>{formatFileSize(video.file_size)}</div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Resolution:</span>
            <div>
              {video.width && video.height
                ? `${video.width}x${video.height}`
                : "Unknown"}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Format:</span>
            <div className="uppercase">{video.format || "Unknown"}</div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Codec:</span>
            <div className="uppercase">{video.codec || "Unknown"}</div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Uploaded:</span>
            <div className="text-xs">{formatDate(video.upload_date)}</div>
          </div>
        </div>
        <div className="pt-2 border-t">
          <span className="font-medium text-gray-600 text-xs">File Path:</span>
          <div
            className="text-xs text-gray-500 truncate"
            title={video.file_path}
          >
            {video.file_path}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Video;
