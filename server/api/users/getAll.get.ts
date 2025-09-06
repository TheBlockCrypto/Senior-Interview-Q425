import { db, schema } from "../../../lib/db";
import { eq } from "drizzle-orm";
import { cache } from "../../../lib/cache";

export default defineEventHandler(async (event) => {
  try {
    const users = await db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        username: schema.users.username,
        email: schema.users.email,
        role: schema.users.role,
        avatar: schema.users.avatar,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
      })
      .from(schema.users)
      .limit(100);

    if (!users.length) {
      throw createError({
        statusCode: 404,
        statusMessage: "No users found",
      });
    }

    return users;
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch user",
    });
  }
});

