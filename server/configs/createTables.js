const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, //  Required for Render PostgreSQL
  },
});

// Function to create tables if they don’t exist
const createTables = async () => {
  try {
    //  Check & Create "users" table
    const usersExists = await db.schema.hasTable("users");
    if (!usersExists) {
      await db.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true);
      });
      console.log(" Users table created");
    } else {
      console.log(" Users table already exists");
    }

    //  Check & Create "expenses" table
    const expensesExists = await db.schema.hasTable("expenses");
    if (!expensesExists) {
      await db.schema.createTable("expenses", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
        table.decimal("amount", 10, 2).notNullable();
        table.string("category").notNullable();
        table.string("description");
        table.timestamp("created_at").defaultTo(db.fn.now());
      });
      console.log(" Expenses table created");
    } else {
      console.log(" Expenses table already exists");
    }
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
};

// Run table creation on startup
createTables();

