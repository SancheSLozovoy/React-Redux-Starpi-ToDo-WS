import { BASE_URL } from "./Base.url";

export class TaskService {

    static loadTasks = async () => {
        const response = await fetch(BASE_URL, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');

        }

        const result = await response.json();
        return result.data;

    };

    static deleteTask = async (id: number) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    };

    static addTask = async (title: string, userId: number) => {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    title: title,
                    completed: false,
                    userId: userId,
                }
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to add task');
        }

        const result = await response.json();
        return result.data;

    };

    static updateTask = async (id: number, title: string, completed: boolean, userId: number) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                data: {
                    title,
                    completed,
                    userId
                }
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        console.log(response)
        if (!response.ok) {
            throw new Error("Failed to update task");
        }
    
        const result = await response.json();
        return result.data;
    };
    
}

