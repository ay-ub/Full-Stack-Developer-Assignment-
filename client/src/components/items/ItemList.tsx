import items from "@/constants/items";
import Item from "./item";

function ItemList() {
  return (
    <div id="item-list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Item key={item.id} item={item} className="md:max-w-md" />
      ))}
    </div>
  );
}

export default ItemList;
