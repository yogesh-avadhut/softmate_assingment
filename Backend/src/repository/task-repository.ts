import pool from "../config/mysql.js";

const createTask = async function (data: any) {
    const result: any = await pool.query(
        `INSERT INTO tasks(title,description,task_status,deadline,userId)
    values(?,?,?,?,?)`,
        [data.title, data.description, data.task_status, data.deadline,data.userId]
    )

    return {
        id: result.insertId,
        title: data.title,
        description: data.description,
        task_status: data.task_status,
        deadline: data.deadline,
        userId: data.userId,
        created_at: new Date()
    }
}


const findTaskByTaskName = async function (title: any) {
    const [rows]: any = await pool.query(
        `SELECT * FROM tasks WHERE title = ?`,
        [title]
    )
    return rows[0]
}


const findAlltask = async function () {
    const [AllTasks] = await pool.query(
        `SELECT * FROM tasks`
    )
    return AllTasks
}


const updateTask = async function (data:any){

    const {id, title, description,task_status,deadline} = data
    const [updateresult] = await pool.query(
        `UPDATE tasks 
        SET title = ?, description = ?,task_status = ?,deadline = ?
        WHERE id = ?`,
        [ title, description,task_status,deadline, id]
    ) 
    return updateresult 
} 


const updateTaskStatus = async function(data:any){
    const { task_status,id } = data
    const [updateStatus] = await pool.query(
        `UPDATE tasks 
        SET task_status = ?
        WHERE id = ?`,
        [task_status,id]
    )
return updateStatus
}

const deleteTask = async function(id:any){
    const [tskData] = await pool.query(
        `UPDATE tasks 
        SET is_active = FALSE,
        updated_at  = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [id]
    )
    return tskData
}



export { createTask, findTaskByTaskName, findAlltask,updateTask,updateTaskStatus, deleteTask }