import API from './axios';


export function registerUser(data) {

  return API.post('/user/register', data);
}

export function loginUser(data) {

  return API.post('/user/login', data);
}





export function getAllUsers() {

  return API.get('/user/get-all-user');
}


export function uploadProfilePic(id, form) {

  return API.put(`/user/upload-profile/${id}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  
  });
}

export function getAllTasks() {
  
  return API.get('/task/get-all-task');
}

export function getTasksByUser(id) {
  
  return API.get(`/task/get-task-by-userid/${id}`);
}

export function addTask(data) {
  
  return API.post('/task/add-task', data);
}

export function updateTask(data) {
  
  return API.patch('/task/update-task', data);
}

export function updateTaskStatus(data) {
  
  return API.patch('/task/update-task-status', data);
}

export function deleteTask(id) {
  
  return API.delete(`/task/delete/${id}`);
}