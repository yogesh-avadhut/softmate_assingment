import pool from "../config/mysql.js";


const createUser = async function (data: any) {
    const [result]: any = await pool.query(
        `INSERT INTO users(name,email,password,role)
         values(?,?,?,?)`,
        [data.name, data.email, data.password, data.role]
    )

    return {
        id: result.insertId,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        created_at: new Date()
    }
}

const findUserByEmail = async (email: string) => {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return (rows as any[])[0];
};


const findAlluser = async function () {
    const [AllUsers] = await pool.query(
        `SELECT * FROM users`
    )
    return AllUsers
}


const updateProfilePic = async function (userId: any, filename: any) {
    const [result] = await pool.query(
        `UPDATE users SET profile_pic = ? WHERE id = ?`,
        [filename, userId]
    )
    return result
}


export { createUser, findUserByEmail, findAlluser, updateProfilePic }