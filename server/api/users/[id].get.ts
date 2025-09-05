import { db, schema } from "../../../lib/db";
import { eq } from "drizzle-orm";
import { cache } from "../../../lib/cache";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid user ID",
    });
  }

  const cacheKey = `user:${id}`;
  const cached = await cache.get(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const user = await db
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
      .where(eq(schema.users.id, Number(id)))
      .limit(1);

    if (!user.length) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    const result = user[0];
    await cache.set(cacheKey, result, 300);

    return result;
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

