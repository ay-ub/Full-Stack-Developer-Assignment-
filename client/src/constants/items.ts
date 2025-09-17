import type { ItemType } from "@/types/item";

const items: ItemType[] = [
  {
    id: "1",
    name: "Laptop Dell XPS 15",
    description: "High-performance laptop with 16GB RAM and 512GB SSD.",
    price: 1500,
    expiryDate: "2025-12-31",
  },
  {
    id: "2",
    name: "Toyota Corolla 2022",
    description:
      "Reliable sedan, automatic transmission, suitable for city driving.",
    price: 200,
    expiryDate: "2026-03-15",
  },
  {
    id: "3",
    name: "Office Chair",
    description: "Ergonomic chair with lumbar support and adjustable height.",
    price: 120,
    expiryDate: "2025-11-10",
  },
  {
    id: "4",
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone, 256GB storage, titanium frame.",
    price: 999,
    expiryDate: "2026-01-20",
  },
  {
    id: "5",
    name: "Power Drill",
    description: "Cordless power drill with 2 batteries and charger included.",
    price: 180,
    expiryDate: "2025-10-05",
  },
];

export default items;
