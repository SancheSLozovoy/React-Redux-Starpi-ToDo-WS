interface TaskProps {
    documentId: string;
    title: string;
    completed: boolean;
    userId: number;
    onToggle: (documentId: string) => void;
    onDelete: (documentId: string) => void;
    onEdit: (documentId: string, title: string) => void;
}

interface TaskState {
    selected: boolean;
}

interface TaskListState {
    tasks: TaskProps[];
    filterTasks: TaskProps[];
    selectedUserId: number | null;

}

interface UserSelectProps {
    userIds: number[];
    selectedUserId: number | null;
    onUserChange: (userId: number | null) => void;
}


export type { TaskProps, TaskListState, TaskState, UserSelectProps }