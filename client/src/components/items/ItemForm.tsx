import SectionTitle from "../SectionTitle";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../DatePicker";
import { useState } from "react";

type Inputs = {
  name: string;
  description: string;
  price: number;
};

function ItemForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      description: "",
      price: 100,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [date, setDate] = useState<Date>();

  return (
    <form id="item-form" onSubmit={handleSubmit(onSubmit)}>
      <SectionTitle title="Create New Item" />
      <div className="my-4 space-y-3">
        <div className="grid w-full items-center gap-3">
          <Label className="flex justify-between">
            <span>
              Name <span className="text-red-600 mx-0">*</span>
            </span>
            {errors.name && (
              <span className="text-sm text-red-600">
                {errors.name.message}
              </span>
            )}
          </Label>
          <Input
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
              maxLength: {
                value: 20,
                message: "Name cannot exceed 20 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "Alphabetical characters only",
              },
            })}
            type="text"
            placeholder="Item Name"
          />
        </div>
        <div className="grid w-full items-center gap-3">
          <Label className="flex justify-between">
            <span>
              Description <span className="text-red-600 mx-0">*</span>
            </span>
            {errors.description && (
              <span className="text-sm text-red-600">
                {errors.description.message}
              </span>
            )}
          </Label>
          <Textarea
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
              maxLength: {
                value: 100,
                message: "Description cannot exceed 100 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "Alphabetical characters and spaces only",
              },
            })}
            placeholder="Item Description"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="grid w-full items-center gap-3">
            <Label className="flex justify-between">
              <span>
                Price <span className="text-red-600 mx-0">*</span>
              </span>
              {errors.price && (
                <span className="text-sm text-red-600">
                  {errors.price.message}
                </span>
              )}
            </Label>
            <Input
              {...register("price", {
                required: {
                  value: true,
                  message: "Price is required",
                },
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Price must be a valid number",
                },
                min: {
                  value: 10,
                  message: "Price must be at least 0.01",
                },
              })}
              type="number"
              min={10}
              step={10}
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label>
              expiry Date <span className="text-red-600 mx-0">*</span>
            </Label>
            <DatePicker date={date} setDate={setDate} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 my-2">
        <DialogClose asChild>
          <Button variant={"destructive"} className="flex-1">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="flex-1">
          Create Item
        </Button>
      </div>
    </form>
  );
}

export default ItemForm;
