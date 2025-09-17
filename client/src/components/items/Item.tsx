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
function Item({
  item,
  ...props
}: { item: ItemType } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        <CardAction>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Trash color="red" />
            </Button>
            <Button variant="outline" size="icon">
              <Edit />
            </Button>
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
