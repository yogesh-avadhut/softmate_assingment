import mysql from "mysql2/promise"

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "3097",
    database: "softmate_assingment",
    waitForConnections: true,
    connectionLimit: 10
})



export async function createConnection() {
    try {
        const conn = await pool.getConnection()
        console.log("db connected successfully...")
        conn.release()
    }
    catch (err: any) {
        console.log("getting error when connecting db...", err)
    }
}


export default pool;