export type VideoType = {
  id: string;
  name: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  duration: number | null;
  width: number | null;
  height: number | null;
  format: string | null;
  codec: string | null;
  upload_date: string;
};
