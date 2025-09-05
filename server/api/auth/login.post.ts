import { db, schema } from "../../../lib/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { username } = await readBody(event);

  if (!username?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Username is required",
    });
  }

  try {
    const users = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username.trim()))
      .limit(1);

    if (!users.length) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    const user = users[0];

    setCookie(event, 'username', username.trin())

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
        },
      },
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Login failed",
    });
  }
});

