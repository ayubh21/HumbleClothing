// categories db crud

import { category } from "./schema";
import { db } from "./database";
import { Category, editC } from "../models/models";
import { eq } from "drizzle-orm";

export const addCategory = async (c: Category) => {
  try {
    await db.insert(category).values({
      categoryId: c.id,
      name: c.name,
      categoryDescription: c.categoryDescription,
    });
    if (c.categoryDescription == "") {
      console.log("Category description cannot be empty!");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async () => {
  const c = await db.query.category.findMany();
  console.log(c);
  if (c.length == 0) {
    console.log("failed to retrieve category record");
  }
  return c;
};

export const getCategory = async (id: number) => {
  try {
    const row = await db.query.category.findFirst({
      where: eq(category.categoryId, id),
    });
    return row;
  } catch (err) {
    console.log(err);
  }
};

export const editCategory = async (id: number, c: editC) => {
  try {
    const updatedRow = await db
      .update(category)
      .set({
        categoryDescription: c.categoryDescription,
        name: c.name,
      })
      .where(eq(category.categoryId, id));
    return updatedRow;
  } catch (err) {
    console.log(err);
  }
};
