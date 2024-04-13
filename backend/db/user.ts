import { users } from "../db/schema";
import { db } from "../db/database";
import { eq } from "drizzle-orm";
import { User } from "../models/models";

export const createUser = async (user: User) => {
  try {
    await db.insert(users).values(user).returning();
  } catch (err) {
    console.log(err);
  }
};
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
    const e = await db.select().from(users).where(eq(users.email, email));
    return e;
  } catch (err) {
    console.log(err);
  }
};

export const getUserbyId = async (id: number) => {
  try {
    await db.query.users.findFirst({
      where: eq(users.id, id),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserByToken = async (session: string) => {
  try {
    await db.query.users.findFirst({
      where: eq(users.sessionToken, session),
    });
  } catch (err) {
    console.log(err);
  }
};

export const editUserbyId = async (id: number, updatedUser: User) => {
  try {
    await db.update(users).set(updatedUser).where(eq(users.id, id));
  } catch (err) {
    console.log(err);
  }
};
