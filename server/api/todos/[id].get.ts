import { db, schema } from "../../../lib/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid todo ID",
    });
  }

  try {
    const todo = await db
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.id, Number(id)))
      .limit(1);

    if (!todo.length) {
      throw createError({
        statusCode: 404,
        statusMessage: "Todo not found",
      });
    }

    const result = [todo[0]];

    return result;
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch todo",
    });
  }
});
