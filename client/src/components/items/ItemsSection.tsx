import { CirclePlus } from "lucide-react";
import PopUp from "../PopUp";
import { Button } from "../ui/button";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import SectionTitle from "../SectionTitle";

function ItemsSection() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title="Items List" />
        <PopUp
          trigger={
            <Button className="btn btn-primary">
              <CirclePlus className="mx-1 h-4 w-4" />
              create Item
            </Button>
          }
        >
          <ItemForm />
        </PopUp>
      </div>
      <ItemList />
    </section>
  );
}

export default ItemsSection;
