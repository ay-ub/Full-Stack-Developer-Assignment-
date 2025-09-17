import { API_BASE_URL } from "@/config/appConfig";
import type { ItemType } from "@/types/item";
import { create } from "zustand";
type Store = {
  items: ItemType[];
  selectedItem: ItemType | null;
  isLoading: boolean;

  createItem: (item: Omit<ItemType, "id">) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  updateItem: (item: ItemType) => Promise<void>;
  fetchItems: () => Promise<void>;
};
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SLEEPDURATION = 500;
const useItemsStore = create<Store>()((set) => ({
  items: [],
  selectedItem: null,
  isLoading: false,

  createItem: async (item: Omit<ItemType, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error("Failed to create item");
      }
      const newItem = await response.json();
      set((state) => ({ items: [...state.items, newItem] }));
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  },
  deleteItem: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      await response.json();
      await sleep(SLEEPDURATION);
      set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  },
  updateItem: async (updatedItem: ItemType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${updatedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      const newItem = await response.json();
      await sleep(SLEEPDURATION);
      set((state) => ({
        items: state.items.map((item) =>
          item.id === updatedItem.id ? newItem : item
        ),
      }));
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  },
  fetchItems: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const items = await response.json();
      await sleep(SLEEPDURATION);
      set({ items });
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useItemsStore;
