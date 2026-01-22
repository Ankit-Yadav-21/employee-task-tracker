import { db } from "./index";

async function testConnection() {
    try {
        const result = await db.execute("SELECT 1 + 1 AS result");
        console.log("✅ Database connected successfully!");
        console.log("Result:", result);
        process.exit(0);
    } catch (error) {
        console.error("❌ Database connection failed");
        console.error(error);
        process.exit(1);
    }
}

testConnection();
