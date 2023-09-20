type IEmployee = {
    id: number,
    first_name: string,
    last_name: string,
    role: string,
    email: string,
    tasks?: ITask[],
    groups: IGroup[],
}

type INewEmployee = {
    first_name: string,
    last_name: string,
    role: string,
    email: string,
    tasks?: ITask[],
    groups: IGroup[],
}

type ITask = {
    id: number,
    title: string,
    description?: string | any,
    priority?: "Low" | "Medium" | "High" | any,
    status?: "Complete" | "Not Started" | "In Progress" | any,
    task_assignment?: IEmployee[] | any,
    reminder_time?: string,
    assigned_by?: IUser[]
    due_date?: string | any,
    createdAt?: string | any,
    updatedAt?: string | any,
}

type INewTask = {
    title: string,
    description?: string | any,
    priority?: "Low" | "Medium" | "High" | any,
    status?: "Complete" | "Not Started" | "In Progress" | any,
    task_assignment?: IEmployee[] | any,
    reminder_time?: string,
    assigned_by?: IUser[],
    due_date?: string | any
}

type Props = {
    searchParams: Record<string, string> | null | undefined;
}

type IUser = {
    id: number,
    username: string,
    role: "Manager" | "Human Resources",
    email: string,
    isAdmin: boolean,
}

type IGroup = {
    id: number,
    name: string | any,
    employees?: IEmployee[],
}

type INewGroup = {
    name: string | any,
    employees?: IEmployee[],
}