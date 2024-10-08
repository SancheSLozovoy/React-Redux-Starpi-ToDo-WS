import React, { useEffect, useState } from 'react';
import Task from '../Task/Task';
import './TaskList.css';
import UserSelect from '../TaskSelectUser/TaskSelectUser';
import { TasksContainer, TasksList, ListTitle, ButtonContainer } from './TaskListStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../state/store';
import { loadTasks, markAllTasks, toggleTask, addTask, deleteTask, updateTask } from '../../state/todoSlice';

const TaskList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [filterTasks, setFilterTasks] = useState(tasks);

    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);

    useEffect(() => {
        if (selectedUserId === null) {
            setFilterTasks(tasks);
        } else {
            setFilterTasks(tasks.filter(task => task.userId === selectedUserId));
        }
    }, [tasks, selectedUserId]);

    const handleAddTask = () => {
        if (selectedUserId === null) {
            setSelectedUserId(1);
        }

        const title = prompt('Enter a task title');
        if (title) {
            const userId = selectedUserId || 1;
            dispatch(addTask({ title, userId }));
        }
    };

    const deleteMarks = async () => {
        const tasksToDelete = tasks.filter(task => task.completed && (!selectedUserId || task.userId === selectedUserId));
        try {
            await Promise.all(tasksToDelete.map(task => dispatch(deleteTask({ documentId: task.documentId }))));

        } catch (error) {
            console.error('Error deleting tasks', error);
        }
    };

    return (
        <TasksContainer>
            <ListTitle>Tasks List</ListTitle>
            <ButtonContainer>
                <button onClick={handleAddTask}>Add Task</button>
                <button onClick={() => dispatch(markAllTasks(selectedUserId))}>Mark All</button>
                <button onClick={() => dispatch(() => deleteMarks())}>Delete Completed</button>
                <UserSelect userIds={Array.from(new Set(tasks.map(task => task.userId)))}
                    selectedUserId={selectedUserId}
                    onUserChange={setSelectedUserId} />
            </ButtonContainer>
            <TasksList>
                {filterTasks.map(task => (
                    <Task key={task.documentId}
                        {...task}
                        onToggle={() => dispatch(toggleTask(task.documentId))}
                        onEdit={(documentId, newTitle) => dispatch(updateTask({ documentId, title: newTitle, userId: task.userId, completed: task.completed }))}
                        onDelete={() => dispatch(deleteTask({ documentId: task.documentId }))} />
                ))}
            </TasksList>
        </TasksContainer>
    );
};

export default TaskList;
