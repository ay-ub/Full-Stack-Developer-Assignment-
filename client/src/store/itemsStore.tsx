import type { ItemType } from "@/types/item";
import { create } from "zustand";
import itemsData from "@/constants/items";
type Store = {
  items: ItemType[];
  selectedItem: ItemType | null;

  createItem: (item: Omit<ItemType, "id">) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  updateItem: (item: ItemType) => Promise<void>;
  fetchItems: () => Promise<void>;
};
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const useItemsStore = create<Store>()((set) => ({
  items: itemsData,
  selectedItem: null,

  createItem: async (item: Omit<ItemType, "id">) => {
    try {
      //   const response = await fetch("http://localhost:5000/items", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(item),
      //   });
      //   const data = await response.json();
      //   if (!response.ok) {
      //     throw new Error("Failed to create item");
      //   }
      //   if (data.status === "success") {
      const newItem: ItemType = { id: Date.now().toString(), ...item };
      set((state) => ({ items: [...state.items, newItem] }));
      //   } else {
      // throw new Error("Failed to create item");
      //   }
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  },
  deleteItem: async (id: string) => {
    try {
      //   await fetch(`http://localhost:5000/items/${id}`, {
      //     method: "DELETE",
      //   });
      await sleep(1000);
      set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  },
  updateItem: async (updatedItem: ItemType) => {
    try {
      //   await fetch(`http://localhost:5000/items/${updatedItem.id}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updatedItem),
      //   });
      await sleep(1000);
      set((state) => ({
        items: state.items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
      }));
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  },
  fetchItems: async () => {
    try {
      //   const response = await fetch("http://localhost:5000/items");
      //   const items = await response.json();
      const items: ItemType[] = [];
      set({ items });
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  },
}));

export default useItemsStore;
