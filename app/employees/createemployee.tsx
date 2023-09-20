'use client'

import { addEmployee } from "@/lib/employeesHelper";
import { useState, useEffect } from "react";
import { getAllGroups } from "@/lib/groupsHelper";

type CreateEmployeeProps = {
    onEmployeeCreated: () => Promise<void>;
    searchParams?: string;
};

export default function CreateEmployee(props: CreateEmployeeProps) {
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [group, setGroup] = useState('');
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
    const [tasks, setTasks] = useState('');

    const roleValues = [
        { value: 'Vet Tech', label: 'Vet Tech' },
        { value: 'HR', label: 'HR' },
        { value: 'Manager', label: 'Manager' },
        { value: 'CSR', label: 'CSR' },
    ]

    const groupValues = [
        { value: 'Vet Tech', label: 'Vet Tech' },
        { value: 'HR', label: 'HR' },
        { value: 'Manager', label: 'Manager' },
        { value: 'CSR', label: 'CSR' },
    ]

    useEffect(() => {
        async function fetchGroups() {
            const allGroups = await getAllGroups();
            console.log('All Groups:', allGroups);
            setGroups(allGroups);
        }
        fetchGroups();
    }, []);

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            first_name: { value: string };
            last_name: { value: string };
            role: { value: string };
            groups: { value: number };
        };

        const employee: INewEmployee = {
            email: target.email.value,
            first_name: target.first_name.value,
            last_name: target.last_name.value,
            role: target.role.value,
            // groups: target.groups.value,
            groups: [],
        };

        if (selectedGroup !== null) {
            employee.groups = [selectedGroup];
        }

        console.log("Inserting employee:", employee);
        await addEmployee(employee);

        if (props.onEmployeeCreated) {
            props.onEmployeeCreated();
        }
        closeModal();
    }

    function handleOnChange(params: any) {
        setEmail(params.email)
        setFirstName(params.first_name)
        setLastName(params.last_name)
        setRole(params.role)
        //setGroups(params.groups)
    }

    const openModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createEmployeeModal');
        dialog.showModal();
    };

    const closeModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createEmployeeModal');
        dialog.close();
    };

    return (
        <>
            <button className="text-xl transition-transform transform hover:scale-105 duration-300 rounded-[30px]
            bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md py-3 px-5 rounded-xl
            bg-darkseagreen shadow-md" onClick={openModal}>Create Employee</button>

            <dialog id="createEmployeeModal" className="modal fixed z-10 inset-0 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <form method="post" onSubmit={handleSubmit} className="w-[750px] max-h-[80vh] relative bg-[#f5ecdf] rounded-[20px] overflow-y-auto" style={{ boxShadow: "0px 8px 20px 0 #664a2d" }}>
                    <div className="p-8 space-y-5">
                        <div className="flex flex-col items-center mb-5">
                            <label htmlFor="first_name" className="mb-2 text-2xl font-semibold text-[#333333]">First Name:</label>
                            <input id="first_name" onChange={e => handleOnChange(e)} name="first_name" value={first_name} className="w-[400px] h-6 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4" />
                        </div>

                        <div className="flex flex-col items-center mb-5">
                            <label htmlFor="last_name" className="mb-2 text-2xl font-semibold text-[#333333]">Last Name:</label>
                            <input id="last_name" onChange={e => handleOnChange(e)} name="last_name" value={last_name} className="w-[400px] h-6 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4" />
                        </div>

                        <div className="flex flex-col items-center mb-5">
                            <label htmlFor="email" className="mb-2 text-2xl font-semibold text-[#333333]">Employee Email:</label>
                            <input id="email" onChange={e => handleOnChange(e)} type="email" name="email" value={email} className="w-[400px] h-6 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4" />
                        </div>

                        <div className="flex flex-col items-center mb-5">
                            <label htmlFor="role" className="mb-2 text-2xl font-semibold text-[#333333]">Role:</label>
                            <select id="role" onChange={e => handleOnChange(e)} name="role" value={role} className="w-[400px] h-12 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4">
                                <option value="" selected>Select Status</option>
                                {roleValues.map(p => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col items-center mb-5">
                            <label htmlFor="group" className="mb-2 text-2xl font-semibold text-[#333333]">Assign Group: </label>
                            <select id="group" onChange={e => {
                                const selected = groups.find(grp => grp.id === Number(e.target.value));
                                setSelectedGroup(selected || null);
                            }} name="group" placeholder="Group" className="w-[400px] h-12 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4">
                                <option value="">Select Group</option>
                                {groups && groups.map(grp => (
                                    <option key={grp.id} value={grp.id}>{grp.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex mb-4 space-x-6 justify-center">
                        <button type="submit" className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl text-black py-2 px-6">Create Employee</button>
                        <button onClick={closeModal} type="button" className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl font-light text-black py-2 px-4">Cancel</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}
