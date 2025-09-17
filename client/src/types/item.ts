export type ItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  expiryDate: string;
};

export type NewItemType = Omit<ItemType, "id" | "createdAt">;
