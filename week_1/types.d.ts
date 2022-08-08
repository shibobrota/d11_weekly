import { TaskStatus } from './enums';

type User = {
    name: string;
    email: string;
}

type SubTask = {
    details: string;
    dueDate: Date;
    status: TaskStatus
}

type Task = {
    details: string;
    dueDate: Date;
    status: TaskStatus;
    subTasks: [SubTask];
}

export { User, SubTask, Task}