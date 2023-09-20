'use client'
import { getAllTasks } from "@/lib/tasksHelper";
import DeleteButton from "./deletebutton";
import EditButton from "./editbutton";
import { useEffect, useState } from "react";

interface IEmployeeProps {
    employees: IEmployee[],
    onEmployeeEdited: () => Promise<void>;
    onEmployeeDeleted: () => Promise<void>;
}

export default function EmployeeList({ employees, onEmployeeEdited, onEmployeeDeleted }: IEmployeeProps) {
    return (
        <>
            {employees?.map(employee => (
                <div className="Row" key={employee.id}>
                    {employee.first_name} {employee.last_name}
                    <EditButton editingEmployee={employee} onEmployeeEdited={onEmployeeEdited} employee={[]} groups={[]} onEmployeeDeleted={function (): Promise<void> {
                        throw new Error("Function not implemented.");
                    }} />
                    <DeleteButton employeeProp={employee} onEmployeeDeleted={onEmployeeDeleted} />
                </div>
            ))}
        </>
    )
}