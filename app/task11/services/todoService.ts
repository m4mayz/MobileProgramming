import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

async function getDB() {
    if (!db) {
        db = await SQLite.openDatabaseAsync("databaseName");
    }
    return db;
}

export type Todo = {
    id?: number;
    text: string;
    done: number;
    finished_at?: string;
    created_at?: string;
};

/** Create table */
export async function initDB(): Promise<void> {
    const db = await getDB();

    // Drop and recreate table to ensure schema is correct
    await db.execAsync(`
    DROP TABLE IF EXISTS todos;
    CREATE TABLE todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      finished_at DATETIME,
      created_at DATETIME DEFAULT (datetime('now', '+7 hours'))
    );
  `);
}

/** Get all todos */
export async function getTodos(): Promise<Todo[]> {
    const db = await getDB();
    const rows = await db.getAllAsync<Todo>(
        "SELECT * FROM todos ORDER BY id DESC;"
    );
    return rows;
}

/** Insert todo */
export async function addTodo(text: string): Promise<number> {
    const db = await getDB();

    const result = await db.runAsync(
        "INSERT INTO todos (text, done) VALUES (?, 0);",
        [text]
    );

    return result.lastInsertRowId ?? 0;
}

/** Update todo */
export async function updateTodo(
    id: number,
    fields: { text?: string; done?: number }
): Promise<void> {
    const db = await getDB();

    const sets: string[] = [];
    const params: any[] = [];

    if (fields.text !== undefined) {
        sets.push("text = ?");
        params.push(fields.text);
    }

    if (fields.done !== undefined) {
        sets.push("done = ?");
        params.push(fields.done);
    }

    if (fields.done === 1) {
        sets.push("finished_at = datetime('now', '+7 hours')");
    } else if (fields.done === 0) {
        sets.push("finished_at = NULL");
    }

    if (sets.length === 0) return;

    params.push(id);

    await db.runAsync(
        `UPDATE todos SET ${sets.join(", ")} WHERE id = ?;`,
        params
    );
}

/** Delete todo */
export async function deleteTodo(id: number): Promise<void> {
    const db = await getDB();
    await db.runAsync("DELETE FROM todos WHERE id = ?;", [id]);
}

export default {
    initDB,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
};
