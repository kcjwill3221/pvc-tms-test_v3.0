'use client'
import { getAllEmployees, deleteEmployee } from "@/lib/employeesHelper";
import CreateEmployee from "./createemployee";
import EmployeeList from "./employeeList";
// import { IEmployee } from "./employeeList";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import EditButton from './editbutton';
import Image from "next/image";
import { useClerk } from "@clerk/clerk-react";

export default function EmployeesPage() {
    const [isCanceled, setCanceled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
    const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState<string | null>(null);
    const { signOut } = useClerk();
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchEmployees() {
            const employees = await getAllEmployees();
            setEmployeeList(employees);
        }

        if (!isCanceled) {
            fetchEmployees();
        }

        return () => {
            console.log('Canceled fetching employees... user navigated away');
            setCanceled(true);
        }

    }, [isCanceled, employeeList]);

    const handleEmployeeCreated = async () => {
        const employees = await getAllEmployees();
        setEmployeeList(employees);
    }

    const handleEmployeeEdited = async () => {
        const employees = await getAllEmployees();
        setEmployeeList(employees);
    }

    const handleEmployeeDeleted = async () => {
        const employees = await getAllEmployees();
        setEmployeeList(employees);
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const openModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createEmployeeModal');
        dialog.showModal();
    }

    const closeModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createEmployeeModal');
        dialog.close();
    }

    return (
        <>
            <div style={{ position: 'absolute', left: '-9999px' }}>
                <CreateEmployee onEmployeeCreated={handleEmployeeCreated} />
                <EmployeeList employees={employeeList} onEmployeeEdited={handleEmployeeEdited} onEmployeeDeleted={handleEmployeeDeleted} />
            </div>

            <div className="grid grid-cols-12 h-auto min-h-screen font-inter text-5xl text-black">
                <div className="col-span-8 p-10 bg-peachpuff">
                    <h1 className="mb-8 text-[64px] font-medium text-dimgray-200">Employees</h1>
                    <div className="p-8 rounded-[9px] bg-linen shadow-inner w-full max-w-xl">
                        <div className="flex space-x-4 mb-4">

                            <button onClick={openModal} className="text-xl transition-transform transform hover:scale-105
                                duration-300 rounded-[30px] shadow-md py-3 px-5 rounded-xl bg-darkseagreen hover:shadow-xl">
                                Create Employees
                            </button>

                            <Link href="../groups">
                                <button className="text-xl transition-transform transform
                             hover:scale-105 duration-300 rounded-[30px] shadow-md py-3 px-5 rounded-xl bg-sandybrown hover:shadow-xl">
                                    Groups
                                </button>
                            </Link>

                        </div>
                        <ul className="list-none">
                            {employeeList.map((employee: IEmployee) => (
                                <li
                                    key={employee.id}
                                    className={`bg-[#F5F5F5] m-2 p-4 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex justify-between items-center
                                    ${employee.id === selectedEmployeeId ? 'bg-[#D3D3D3]' : ''}`}
                                    onClick={() => setSelectedEmployeeId(employee.id)}
                                >
                                    <button className="font-semibold text-xl text-[#333333] hover:text-[#e2b268] focus:outline-none transition-all duration-300 bg-transparent border-none">
                                        {employee.first_name} {employee.last_name}
                                    </button>

                                    <EditButton editingEmployee={employee} onEmployeeEdited={handleEmployeeEdited} employee={[]} groups={[]} onEmployeeDeleted={function (): Promise<void> {
                                        throw new Error("Function not implemented.");
                                    }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="col-span-2 bg-silver"></div>

                <div className="col-span-2 p-10 bg-dimgray-100 flex flex-col items-center">
                    <Image
                        className="object-cover mt-10"
                        alt="Employee image"
                        src="/1630696668162-3.jpeg"
                        width={151}
                        height={146}
                    />
                    <div className="flex flex-col items-center w-full space-y-6 mt-6">
                        <Link href="../tasks">
                            <button className="transition-transform transform hover:scale-105 duration-300 rounded-[30px]
                            shadow-md py-6 px-14 text-5xl text-dimgray-200 font-semibold bg-ddcaae hover:shadow-xl">
                                Tasks
                            </button>
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="transition-transform transform hover:scale-105 duration-300 rounded-[30px]
    shadow-md py-6 px-14 text-5xl text-dimgray-200 font-semibold bg-sandybrown hover:shadow-xl"
                        >
                            Sign-Out
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}
