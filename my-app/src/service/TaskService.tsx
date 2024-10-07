import axios from 'axios';
import { BASE_URL } from './Base.url';

export class TaskService {
    static loadTasks = async () => {
        const response = await axios.get(BASE_URL);
        return response.data.data; 
    };

    static deleteTask = async (id: number) => {
        await axios.delete(`${BASE_URL}/${id}`);
    };

    static addTask = async (title: string, userId: number) => {
        const response = await axios.post(BASE_URL, {
            data: {
                title,
                completed: false,
                userId,
            },
        });
        return response.data.data; 
    };

    static updateTask = async (id: number, title: string, completed: boolean, userId: number) => {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            data: {
                id,
                title,
                completed,
                userId,
            },
        });
        return response.data.data; 
    };
}
