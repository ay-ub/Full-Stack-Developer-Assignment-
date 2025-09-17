import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
function PopUp({
  children,
  trigger,
  ...props
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent {...props}>{children}</DialogContent>
    </Dialog>
  );
}

export default PopUp;
