import { users } from "../db/schema";
import { db } from "../db/database";
import { eq } from "drizzle-orm";
import { User } from "../models/models";

export const createUser = async (user: User) => {
  try {
    await db.insert(users).values({
      password: user.password,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getUsers = async () => {
  try {
    const data = await db.query.users.findMany({
      columns: {
        userid: true,
        username: true,
        email: true,
      },
    });
    return data;
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

export const getUserbyId = async (id: string) => {
  try {
    await db.query.users.findFirst({
      where: eq(users.userid, id),
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

export const editUserbyId = async (id: string, updatedUser: User) => {
  try {
    await db.update(users).set(updatedUser).where(eq(users.userid, id));
  } catch (err) {
    console.log(err);
  }
};
