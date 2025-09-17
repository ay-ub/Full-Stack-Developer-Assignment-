import SectionTitle from "../SectionTitle";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../DatePicker";
import { useState } from "react";
import type { ItemType } from "@/types/item";
import useItemsStore from "@/store/itemsStore";
import Notify from "@/lib/Toast";
import { toast } from "sonner";

type Inputs = {
  name: string;
  description: string;
  price: number;
};

function ItemForm({ item }: { item?: ItemType }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: item?.name || "",
      description: item?.description || "",
      price: item?.price || 100,
    },
  });
  const updateItem = useItemsStore((state) => state.updateItem);
  const createItem = useItemsStore((state) => state.createItem);

  const handleSubmitForm: SubmitHandler<Inputs> = (data) => {
    if (!date) {
      toast.error("Please select a date", {
        icon: "❌",
      });
      return;
    }
    const expiryDate = date.toISOString();

    if (item) {
      Notify({
        fn: updateItem({ ...item, ...data, expiryDate }),
        successMessage: "Item has been updated",
        errorMessage: "error updating item",
      });
    } else {
      Notify({
        fn: createItem({ ...data, expiryDate }),
        successMessage: "Item has been created",
        errorMessage: "error creating item",
      });
    }

    document.getElementById("cancleBtn")?.click();
  };

  const [date, setDate] = useState<Date | undefined>(
    item?.expiryDate ? new Date(item.expiryDate) : undefined
  );

  return (
    <form id="item-form" onSubmit={handleSubmit(handleSubmitForm)}>
      <SectionTitle title={item ? "Update Item" : "Create New Item"} />
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
                value: /^[\u0600-\u06FFA-Za-z0-9\s,.]+$/,
                message:
                  "Only letters, numbers, spaces, commas, and periods are allowed",
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
                value: /^[\u0600-\u06FFA-Za-z0-9\s,.]+$/,
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
          <Button variant={"destructive"} className="flex-1" id="cancleBtn">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="flex-1"
          disabled={!!Object.keys(errors).length}
        >
          {item ? "Update Item" : "Create Item"}
        </Button>
      </div>
    </form>
  );
}

export default ItemForm;
