import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import DragbleItem from "./Dragble";
import useItemsStore from "@/store/itemsStore";
import Loading from "../Loading";
function ItemList() {
  const itemsData = useItemsStore((state) => state.items);
  const isLoading = useItemsStore((state) => state.isLoading);

  const [items, setItems] = useState(itemsData);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });

  const sensors = useSensors(pointerSensor);
  const fetchItems = useItemsStore((state) => state.fetchItems);
  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={rectSortingStrategy}
      >
        <div
          id="item-list"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-hidden items-stretch"
        >
          {isLoading ? (
            <Loading className="col-span-3 min-h-20" />
          ) : items.length > 0 ? (
            items.map((item) => <DragbleItem key={item.id} itemData={item} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full h-30">
              No items available
            </p>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default ItemList;
