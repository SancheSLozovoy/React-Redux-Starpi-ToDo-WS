import React from 'react';
import './Task.css';
import { TaskProps } from '../../types/Task.type';
import { TaskContainer, TaskContent, TaskTitle, Checkbox, Button, ChangeButton, ButtonContainer } from './TaskStyle';
import { TaskService } from '../../service/TaskService';

const Task: React.FC<TaskProps> = ({ documentId, title, completed, userId, onToggle, onDelete, onEdit }) => {

    const handleEdit = () => {
        const newTitle = prompt("Edit task title", title);
        if (newTitle && newTitle.trim() !== "") {
            onEdit(documentId, newTitle.trim());
        }
    };

    const handleToggle = async () => {
        const newCompletedState = !completed;
        await TaskService.updateTask(documentId, title, newCompletedState, userId);
        onToggle(documentId);
    };

    return (
        <TaskContainer>
            <TaskContent>
                <TaskTitle completed={completed}>{title}</TaskTitle>
                <ButtonContainer>
                    <Checkbox type="checkbox" checked={completed} onChange={handleToggle} />
                    <Button onClick={() => onDelete(documentId)}>Delete</Button>
                    <ChangeButton className="change-button" onClick={handleEdit}>Change</ChangeButton>
                </ButtonContainer>
            </TaskContent>
        </TaskContainer>
    );
};

export default Task;
