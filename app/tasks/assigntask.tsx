'use client'

import { assignEmployee } from "@/lib/tasksHelper"
import { useState } from "react";

interface ITaskProps {
    taskProp: ITask,
    employees: IEmployee[]
    
}


export default function AssignmentList({ taskProp, employees }: ITaskProps) {
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(taskProp.task_assignment['0']);

    return (
        <>
        <div className="dropdown">
        <label tabIndex={0} className="btn m-1">Assign</label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>{selectedEmployee !== undefined ? `✔ ${selectedEmployee?.first_name} ${selectedEmployee?.last_name}` : '  No Employee Assigned'}</li>
                {employees?.map(employee => (
                    <div className="Row" key={employee.email}>
                        <li><button onClick={e => {assignEmployee(employee, taskProp)}}>{employee.first_name} {employee.last_name}</button></li>
                    </div>
                ))}
            </ul>
        </div>
        </>
    )
}