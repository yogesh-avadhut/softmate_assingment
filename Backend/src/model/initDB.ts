import pool from "../config/mysql.js";
import dotenv from "dotenv";

dotenv.config();

const initDB = async (): Promise<void> => {
  const conn = await pool.getConnection();

  try {
    console.log(" initialization started...");

    // USERS TABLE
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_pic VARCHAR(100),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('manager','employee','teamlead') 
          NOT NULL DEFAULT 'employee',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log(" Users table created... ");

    // TASKS TABLE
    await conn.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,

        title VARCHAR(100) NOT NULL,
        description VARCHAR(1000) NOT NULL,

        userId INT NOT NULL,
        profile_pic VARCHAR(300),

        task_status ENUM('assigned','inProgress','completed','cancelled')
          NOT NULL DEFAULT 'assigned',

        deadline DATE NOT NULL,

        is_active BOOLEAN DEFAULT TRUE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by INT,

        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP,
        updated_by INT,

        -- ✅ FK for assigned user
        FOREIGN KEY (userId) REFERENCES users(id)
          ON DELETE CASCADE,

        -- ✅ FK for creator
        FOREIGN KEY (created_by) REFERENCES users(id)
          ON DELETE SET NULL,

        -- ✅ FK for updater
        FOREIGN KEY (updated_by) REFERENCES users(id)
          ON DELETE SET NULL
      )
    `);
    console.log(" Tasks table created...");

    console.log(" Database setup completed ");
  } catch (error) {
    console.error(" DB initialization error:", error);
    throw error;
  } finally {
    conn.release();
  }
};

initDB();