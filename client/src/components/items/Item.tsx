import React from "react";
import type { ItemType } from "@/types/item";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import PopUp from "../PopUp";
import { DialogClose } from "../ui/dialog";
import ItemForm from "./ItemForm";
import useItemsStore from "@/store/itemsStore";
import Notify from "@/lib/Toast";

function Item({
  item,
  ...props
}: { item: ItemType } & React.HTMLAttributes<HTMLDivElement>) {
  const removeItem = useItemsStore((state) => state.deleteItem);

  const handleRemoveItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Notify({
      fn: removeItem(item.id),
      successMessage: "Item has been deleted",
      errorMessage: "error deleting item",
    });

    document.getElementById("cancleDeleteBtn")?.click();
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        <CardAction>
          <div className="flex gap-2">
            <PopUp
              trigger={
                <Button variant="outline" size="icon">
                  <Trash color="red" />
                </Button>
              }
            >
              <form onSubmit={handleRemoveItem}>
                <h3>Are you sure you want to delete {item.name}?</h3>
                <p>This action cannot be undone.</p>
                <div className="mt-4 flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button id="cancleDeleteBtn">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive">Delete</Button>
                </div>
              </form>
            </PopUp>
            <PopUp
              trigger={
                <Button variant="outline" size="icon">
                  <Edit />
                </Button>
              }
            >
              <ItemForm item={item} />
            </PopUp>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex flex-col ">
          <span className="text-xs text-muted-foreground">Price</span>
          <span className="font-semibold">{item.price} SR</span>
        </div>
        <div className="flex flex-col ">
          <span className="text-xs text-muted-foreground">Expiry Date</span>
          <span className="font-semibold">
            {new Date(item.expiryDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
export default Item;
