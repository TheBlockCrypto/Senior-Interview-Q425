import { db, schema } from "../../../lib/db";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const status = query.status;


    try {
    const todos = await db
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.completed, Boolean(status)))
      .limit(100);

      return todos;        
    } catch (error: any){
        if (error.statusCode) {
            throw error;
        }

        throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch todo",
        });
    }


})