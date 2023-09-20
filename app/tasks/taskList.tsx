'use client'
import { getAllEmployees } from "@/lib/employeesHelper";
import AssignmentList from "./assigntask";
import DeleteButton from "./deletebutton";
import EditButton from "./editbutton";
import { useEffect, useState } from "react";

export interface ITaskProps {
    tasks: ITask[],
    onTaskEdited: () => Promise<void>;
    onTaskDeleted: () => Promise<void>;
    employees: IEmployee[];
    groups: any[];
}

export default function TaskList({ tasks, onTaskEdited, onTaskDeleted }: ITaskProps) {
    let blankEmployees: IEmployee[] = [
        {
            id: -1,
            email: "null",
            first_name: "Loading ",
            last_name: "Employees ...",
            role: "null",
            groups: [],
        }
    ]

    const [employees, setEmployees] = useState(blankEmployees)
    const [isCanceled, setCanceled] = useState(false)

    useEffect(() => {
        async function fetchEmployees() {
            const allEmployees = await getAllEmployees()
            setEmployees(allEmployees)
        }
        if (!isCanceled) {
            fetchEmployees();
        }

        return () => {
            console.log('Canceled fetching employees... user navigated away')
            setCanceled(true)
        }
    }, [isCanceled, employees]);

    return (
        <>
            {tasks?.map(task => (
                <div className="Row" key={task.id}>
                    {task.title}
                    <EditButton editingTask={task} onTaskEdited={onTaskEdited} employees={employees} groups={[]} taskProp={task} onTaskDeleted={function (): Promise<void> {
                        throw new Error("Function not implemented.");
                    }} />
                    <DeleteButton taskProp={task} onTaskDeleted={onTaskDeleted} />
                    <AssignmentList taskProp={task} employees={employees} />
                </div>
            ))}
        </>
    )
}