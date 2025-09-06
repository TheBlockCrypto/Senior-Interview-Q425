import { db, schema } from "../../../lib/db";
import { eq, isNotNull, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    if (!query.status) {
        try {
            const todos = await db
                .select()
                .from(schema.todos)
                .where(isNotNull(schema.todos.userId))
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
    } else {
        try {
            const status = query.status === 'true';
            const todos = await db
                .select()
                .from(schema.todos)
                .where(and(
                    eq(schema.todos.completed, status),
                isNotNull(schema.todos.userId)))
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
    }
})