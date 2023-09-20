'use client'
import { getAllTasks, deleteTask } from "@/lib/tasksHelper";
import CreateTask from "./createtask";
import TaskList from "./taskList";
import Link from "next/link";
import EditButton from './editbutton';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useClerk } from "@clerk/clerk-react";

export default function TasksPage() {
    const [isCanceled, setCanceled] = useState(false);
    const [taskList, setTaskList] = useState<ITask[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    const { signOut } = useClerk();

    useEffect(() => {
        async function fetchTasks() {
            const tasks = await getAllTasks();
            setTaskList(tasks);
        }
        if (!isCanceled) {
            fetchTasks();
        }

        return () => {
            console.log('Canceled fetching tasks... user navigated away')
            setCanceled(true)
        }
    }, [isCanceled]);

    const handleTaskCreated = async () => {
        const tasks = await getAllTasks();
        setTaskList(tasks);
    }

    const handleTaskEdited = async () => {
        const tasks = await getAllTasks();
        setTaskList(tasks);
    }

    const handleTaskDeleted = async () => {
        const tasks = await getAllTasks();
        setTaskList(tasks);
    }

    const handleDeleteTask = async () => {
        if (selectedTaskId) {
            const taskToDelete = taskList.find(task => task.id === selectedTaskId);
            if (taskToDelete) {
                await deleteTask(taskToDelete);
                handleTaskDeleted();
            }
        }
    }

    return (
        <>
            <div style={{ position: 'absolute', left: '-9999px' }}>
                <h1>TASKS</h1>
                <TaskList tasks={taskList} onTaskEdited={handleTaskEdited} onTaskDeleted={handleTaskDeleted} />
            </div>
            <div className="grid grid-cols-12 h-auto min-h-screen font-inter text-5xl text-black">
                <div className="col-span-8 p-10 bg-peachpuff">
                    <h1 className="mb-8 text-[64px] font-medium text-dimgray-200">Tasks</h1>
                    <div className="p-8 rounded-[9px] bg-linen shadow-inner w-full max-w-xl">
                        <div className="flex space-x-4 mb-4 text-5xl font-semibold">
                            <CreateTask
                                onTaskCreated={handleTaskCreated}
                                type="button"
                                className="text-xl transition-transform transform hover:scale-105 duration-300 rounded-[30px]
                                bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md py-3 px-5 rounded-xl
                                bg-darkseagreen shadow-md"
                                label="Create Tasks"
                            />
                        </div>

                        <ul className="list-none">
                            {taskList.map((task: ITask) => (
                                <li
                                    key={task.id}
                                    className={`bg-[#F5F5F5] m-2 p-4 rounded-lg shadow-md hover:shadow-xl transform
                                    hover:scale-105 transition-all duration-300 flex justify-between items-center
                                    ${task.id === selectedTaskId ? 'bg-[#D3D3D3]' : ''}`}
                                    onClick={() => setSelectedTaskId(task.id)}>
                                    <div className="flex-1">
                                        <Link href="/tasks">
                                            <button className="font-semibold text-xl text-[#33333] hover:text-[#e2b268] focus:outline-none
                                            transition-all duration-300 bg-transparent border-none">
                                                {task.title}
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="ml-4">
                                        <EditButton editingTask={task} onTaskEdited={handleTaskEdited} employees={[]} groups={[]} taskProp={{
                                            id: 0,
                                            title: "",
                                            description: undefined,
                                            priority: undefined,
                                            status: undefined,
                                            task_assignment: undefined,
                                            reminder_time: undefined,
                                            assigned_by: undefined,
                                            due_date: undefined,
                                            createdAt: undefined,
                                            updatedAt: undefined
                                        }} onTaskDeleted={function (): Promise<void> {
                                            throw new Error("Function not implemented.");
                                        }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-2 bg-silver"></div>
                <div className="col-span-2 p-10 bg-dimgray-100">
                    <div className="flex flex-col items-center w-full space-y-6 mt-6">
                        <Image
                            src="/1630696668162-3.jpeg" alt={"Papaya"}
                            className="object-cover mt-10 mb-4"
                            width={151}
                            height={146}
                        />
                        <Link href="../employees">
                            <button
                                type="button"
                                className="transition-transform transform hover:scale-105 duration-300 rounded-[30px]
                                shadow-md py-6 px-14 text-5xl text-dimgray-200 font-semibold bg-ddcaae hover:shadow-xl"
                            >
                                Employees
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
            </div>
        </>
    )
}
