export interface CreateTodoPayload {
    title: string;
    description: string;
}

export interface UpdateTodoPayload {
    title: string;
    description: string;
    isCompleted: boolean;
}


