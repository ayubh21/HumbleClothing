import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "../db/schema";
import { db } from "../db/database";
import { eq } from "drizzle-orm";
export const getUsers = async () => {
  try {
    await db.query.users.findMany({
      columns: {
        id: true,
        username: true,
        email: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserbyEmail = async (email: string) => {
  try {
    await db.query.users.findFirst({
      where: eq(users.email, email),
    });
  } catch (err) {
    console.log(err);
  }
};
