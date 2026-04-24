import { createTask, findTaskByTaskName, findAlltask, updateTask, updateTaskStatus, deleteTask, getTaskByUserId } from "../repository/task-repository.js";


const addTask = async function (req: any, res: any) {
    try {
        const { title, description, task_status, deadline, userId } = req.body
        if (!title || !description || !task_status || !deadline || !userId) {
            throw new Error("title,description,task_status,deadline,userId required")
        }
        const existsTask: any = await findTaskByTaskName(title)
        if (existsTask) {
            throw new Error("task already exists")
        }
        const newTask = await createTask({
            title, description, task_status, deadline, userId
        })
        res.send({
            error: false,
            message: "task created successful",
            data: newTask
        })
    }

    catch (err: any) {
        res.send({
            error: true,
            message: err.message
        })
    }
}



const getAllTask = async function (req: any, res: any) {
    try {
        const taskData = await findAlltask()
        res.send({
            error: false,
            message: "task fetched successfully...",
            data: taskData
        })
    }
    catch (err: any) {
        res.send({
            error: true,
            message: err.message
        })
    }

}

const getAllTaskByUserId = async function (req: any, res: any) {
    try {
       const { userId } = req.params.userId
        const taskData = await getTaskByUserId(userId)
        res.send({
            error: false,
            message: "task fetched successfully...",
            data: taskData
        })
    }
    catch (err: any) {
        res.send({
            error: true,
            message: err.message
        })
    }

}

const updatetask = async function(req: any, res: any){
    try {
        const data = req.body
        const taskUpdate = await updateTask(data)
        res.send({
            error: false,
            message: "task updated successfully...",
            data: taskUpdate
        })
    }
    catch (err: any) {
        res.send({
            error: true,
            message: err.message
        })
    }
}


const updateTStatus = async function (req: any, res: any) {
    try {
        const data = req.body
        const updateStatus = await updateTaskStatus(data)
        res.send({
            error: false,
            message: "task status updated successfully...",
            data: updateStatus
        })
    }
    catch (err: any) {
        res.send({
            error: true,
            message: err.message
        })

    }
}



const deleteTsk = async function(req:any, res:any){
    try {
        const id = req.params.id
        const deleteTaksData = await deleteTask(id)
        res.send({
            error: false,
            message: "task deleted successfully...",
            data: deleteTaksData
        })
    }
    catch (err: any) {
        res.send({
            error: true,
            message: err.message
        })

    }
}


export { addTask, getAllTask, updatetask, updateTStatus, deleteTsk, getAllTaskByUserId }