import axios from 'axios';
import { BASE_URL } from './Base.url';

export class TaskService {
    static loadTasks = async () => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data.data; 
        } catch (error) {
            console.error('Failed to fetch tasks', error);
            throw new Error('Failed to fetch tasks');
        }
    };

    static deleteTask = async (documentId: string) => {
        await axios.delete(`${BASE_URL}/${documentId}`);
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

    static updateTask = async (documentId: string, title: string, completed: boolean, userId: number) => {
        const response = await axios.put(`${BASE_URL}/${documentId}`, {
            data: {
                title,
                completed,
                userId,
            },
        });
        return response.data.data; 
    };
}
