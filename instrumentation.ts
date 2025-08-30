export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const { drizzle } = await import("drizzle-orm/postgres-js");
      const { migrate } = await import("drizzle-orm/postgres-js/migrator");
      const postgres = await import("postgres");

      const sql = postgres.default(process.env.DATABASE_URL!, { max: 1 });
      const db = drizzle(sql);
      await migrate(db, { migrationsFolder: "./drizzle" });
      await sql.end();
      console.log("Database migration completed successfully");
    } catch (error) {
      console.error("Failed to run database migration:", error);
    }
  }
}
