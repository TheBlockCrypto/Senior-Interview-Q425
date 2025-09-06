import { db, schema } from "../../../lib/db";
import { eq, isNotNull, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
        try {
            const todos = await db
                .select()
                .from(schema.todos)
                .where(eq(schema.todos.userId, Number(query.userId)))
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