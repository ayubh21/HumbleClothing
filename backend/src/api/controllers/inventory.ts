import { db } from "../db/database";
import { inventory } from "../db/schema";

const inventories = [
  {
    inventoryId: 1,
    quantity: 21,
  },

  {
    inventoryId: 2,
    quantity: 21,
  },

  {
    inventoryId: 3,
    quantity: 21,
  },

  {
    inventoryId: 4,
    quantity: 21,
  },
];

const addInventory = async () => {
  const data = await db
    .insert(inventory)
    .values({
      inventoryId: 1,
      quantity: 2,
    })
    .returning();
  console.log(data);
};

addInventory();
