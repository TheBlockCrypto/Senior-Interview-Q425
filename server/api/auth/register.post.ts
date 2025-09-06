import { db, schema } from "../../../lib/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { username, name, email } = await readBody(event);

  if (!username?.trim() || !name?.trim() || !email?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Username, name, and email are required",
    });
  }

  try {
    const existingUsers = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username.trim()))
      .limit(1);

    if (existingUsers.length) {
      throw createError({
        statusCode: 409,
        statusMessage: "Username already exists",
      });
    }

    const newUsers = await db
      .insert(schema.users)
      .values({
        username: username.trim(),
        name: name.trim(),
        email: email.trim(),
        role: "user",
      })
      .returning();

    const user = newUsers[0];

    setCookie(event, 'username', username.trim())

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
      statusMessage: "Registration failed",
    });
  }
});

