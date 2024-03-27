// category mockup data

import { db } from "../db/database";
import { category } from "../db/schema";
export const addCategory = async () => {
  const data = await db
    .insert(category)
    .values({
      name: "Qamis",
      categoryDescription: "Qamis Joggers",
    })
    .returning();
  console.log(data);
  return data;
};

addCategory();
