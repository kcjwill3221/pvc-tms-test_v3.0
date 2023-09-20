'use client'

import { editTask, assignEmployee, assignGroup, deleteTask } from '@/lib/tasksHelper';
import { useState, useEffect } from 'react';
import { getAllEmployees } from "@/lib/employeesHelper";;
import { getAllGroups } from '@/lib/groupsHelper';

interface ITaskProps {
    editingTask: ITask,
    onTaskEdited: () => Promise<void>;
    employees: IEmployee[];
    groups: IGroup[];
    taskProp: ITask,
    onTaskDeleted: () => Promise<void>;
}

const EditButton: React.FC<ITaskProps> = (props: ITaskProps) => {
    const [id] = useState(props.editingTask?.id)
    const [title, setTitle] = useState(props.editingTask?.title);
    const [description, setDescription] = useState(props.editingTask?.description);
    const [priority, setPriority] = useState(props.editingTask?.priority);
    const [status, setStatus] = useState(props.editingTask?.status);
    const [due_date, setDueDate] = useState(props.editingTask?.due_date);
    const [employees, setEmployees] = useState<IEmployee[]>(props.employees || []);
    // const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(props.editingTask.task_assignment['0']);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
    const [groups, setGroups] = useState<IGroup[]>(props.groups || []);
    // const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(props.editingTask.task_assignment['0']);
    const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);

    const prioritiesValues = [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
    ]

    const statusValues = [
        { value: 'Complete', label: 'Complete' },
        { value: 'Not Started', label: 'Not Started' },
        { value: 'In Progress', label: 'In Progress' },
    ]


    useEffect(() => {
        async function fetchEmployees() {
            const allEmployees = await getAllEmployees();
            setEmployees(allEmployees);
        }
        fetchEmployees();

        async function fetchGroups() {
            const allGroups = await getAllGroups();
            setGroups(allGroups);
        }
        fetchGroups();
    }, []);

    if (!props.editingTask) {
        return null;
    }

    function handleOnChange(params: any) {
        setTitle(params.title)
        setDescription(params.description)
        setPriority(params.priority)
        setStatus(params.status)
        if (params.target.value === "") {
            setDueDate("");
        } else {
            setDueDate(params.target.value);
        }
    }

    async function handleEdit(e: React.SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            id: { value: number };
            title: { value: string };
            description: { value: string };
            priority: { value: string };
            status: { value: string };
            due_date: { value: string };
        };

        const task: ITask = {
            id: target.id.value,
            title: target.title.value,
            description: target.description.value,
            priority: target.priority.value,
            status: target.status.value,
            due_date: target.due_date.value
        }
        console.log('Edited Task:', task);
        await editTask(task);
        if (selectedEmployee) {
            await assignEmployee(selectedEmployee, task);
        } else if (selectedGroup) {
            await assignGroup(selectedGroup, task);
        }

        // if (selectedGroup !== null)
        //     if (selectedEmployee) {
        //         await assignEmployee(selectedEmployee, task);
        //     } else if (selectedGroup) {
        //         await assignGroup(selectedGroup, task);
        //     }

        // props.onTaskEdited();
        // if (selectedGroup) {
        //     await editTask(task, null, selectedGroup);
        // } else {
        //     await editTask(task, selectedEmployee, null);
        // }
        if (props.onTaskEdited) {
            props.onTaskEdited();
        }
    }

    const handleDelete = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await deleteTask(props.editingTask);
        await props.onTaskEdited();
        closeModal();
    };

    const closeModal = () => {
        let checkbox: HTMLInputElement | any = document.getElementById(`${props.editingTask.id}`)
        if (checkbox.checked == true) checkbox.checked = false
    }


    return (
        <>
            <label htmlFor={String(props.editingTask.id)} className="text-xl transition-transform transform hover:scale-105 duration-300 rounded-[30px]
                                                               bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md py-3 px-5 rounded-xl
                                                               bg-darkseagreen shadow-md">Edit</label>
            <input type="checkbox" id={String(props.editingTask.id)} className="modal-toggle" />
            <div className="modal fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <form method="dialog" onSubmit={handleEdit} className="w-[900px] max-h-[80vh] relative bg-[#f5ecdf] rounded-[20px] overflow-y-auto" style={{ boxShadow: "0px 8px 20px 0 #664a2d" }}>
                    <p>ID: {id}</p>
                    <input type="hidden" name="id" value={id} />
                    <div className="mt-9 text-8xl font-semibold text-black text-[#333333] mb-4 flex items-center justify-center">
                        <label htmlFor="title" className="sr-only">Task Name: </label>
                        <input id="title" onChange={e => setTitle(e.target.value)} type="text" name="title" value={title} placeholder="Task Name" className="w-72 h-12 overflow-hidden rounded-lg bg-neutral-100 text-6xl text-center" />
                    </div>

                    <div className="ml-7 mt-8">
                        <label htmlFor="description" className="block text-2xl font-semibold text-left text-[#5c5c5c] mb-5">Description:</label>
                        <textarea id="description" onChange={e => setDescription(e.target.value)} name="description" value={description} className="w-[800px] h-36 overflow-hidden rounded-[10px] bg-neutral-100 text-black p-4 mb-8"></textarea>
                    </div>

                    <div className="flex mb-4 ml-7 space-x-6">
                        <div className="flex-1">
                            <label htmlFor="priority" className="block text-2xl font-semibold text-[#5c5c5c] mb-2">Priority:</label>
                            <select id="priority" onChange={e => setPriority(e.target.value)} name="priority" value={priority} className="ml-1 rounded-[10px] bg-neutral-100 h-9 overflow-hidden text-lg font-light text-black px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none">
                                <option value="" disabled className="text-xl font-light text-black px-2 py-1 mt-1">Select Priority</option>
                                {prioritiesValues.map(p => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="employee" className="block text-2xl font-semibold text-[#5c5c5c] mb-2">Assign Employee:</label>
                            <select id="employee" onChange={e => {
                                const selected = employees.find(emp => emp.id === Number(e.target.value));
                                setSelectedEmployee(selected || null);
                            }} name="employee" className="ml-1 rounded-[10px] bg-neutral-100 h-9 overflow-hidden text-lg font-light text-black px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none">
                                <option value={selectedEmployee?.id || ''} disabled className="text-xl font-light text-black px-2 py-1 mt-1">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.first_name} {emp.last_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex mb-4 ml-7 space-x-6">
                        <div className="flex-1">
                            <label htmlFor="status" className="block text-2xl font-semibold text-[#5c5c5c] mb-2">Status:</label>
                            <select id="status" onChange={e => setStatus(e.target.value)} name="status" value={status} className="ml-1 rounded-[10px] bg-neutral-100 h-9 overflow-hidden text-lg font-light text-black px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none">
                                <option value="" disabled className="text-xl font-light text-black px-2 py-1 mt-1">Select Status</option>
                                {statusValues.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label htmlFor="group" className="block text-2xl font-semibold text-[#5c5c5c] mb-2">Assign Group:</label>
                            <select id="gorup" onChange={e => {
                                const selected = groups.find(grp => grp.id === Number(e.target.value));
                                setSelectedGroup(selected || null);
                            }} name="group" className="ml-1 rounded-[10px] bg-neutral-100 h-9 overflow-hidden text-lg font-light text-black px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none">
                                <option value={selectedGroup?.id || ''} disabled selected className="text-xl font-light text-black px-2 py-1 mt-1">Select Group</option>
                                {groups.map(grp => (
                                    <option key={grp.id} value={grp.id}>{grp.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label htmlFor="due_date" className="block text-2xl font-semibold text-[#5c5c5c] mb-2">Due Date:</label>
                            <input id="due_date" onChange={e => setDueDate(e.target.value)} type="date" name="due_date" value={due_date} className="ml-1 w-1/2 rounded-[10px] bg-neutral-100 h-9 overflow-hidden text-lg font-light text-black px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none" />
                        </div>
                    </div>

                    <div className="flex mb-4 ml-7 space-x-6 justify-center">
                        <button onClick={closeModal} type="submit" className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl text-black py-2 px-6 flex items-center justify-center">
                            Confirm
                        </button>
                        <button type="button" onClick={handleDelete} className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] bg-[#D46A6A] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl font-light text-black py-2 px-4 flex items-center justify-center">
                            Delete
                        </button>
                        <button type="button" onClick={closeModal} className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl font-light text-black py-2 px-4 flex items-center justify-center">
                            Cancel
                        </button>
                    </div>
                </form>
                <label className="modal-backdrop" htmlFor={String(props.editingTask.id)}>Close</label>
            </div>

        </>
    )
}

export default EditButton;