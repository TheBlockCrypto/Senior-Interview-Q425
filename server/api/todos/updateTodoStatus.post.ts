import { todos } from "~/lib/db/schema";
import { db, schema } from "../../../lib/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const id = body.id;

    if (!id || isNaN(Number(id))) {
     throw createError({
      statusCode: 400,
      statusMessage: "Invalid todo ID",
    });    
    }

    try {
    const updatedEntry = await db.update(schema.todos)
        .set({ completed: true })
        .where(eq(todos.id, id))
        .returning();

        return updatedEntry;
    } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch todo",
    });
    }
    
})