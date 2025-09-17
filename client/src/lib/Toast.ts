import { toast } from "sonner";

const Notify = ({
  fn,
  successMessage = "Success",
  errorMessage = "Error",
}: {
  fn: Promise<void>;
  successMessage?: string;
  errorMessage?: string;
}) => {
  toast.promise(fn, {
    loading: "Loading...",
    success: () => {
      return successMessage;
    },
    error: () => {
      return errorMessage;
    },
  });
};

export default Notify;
