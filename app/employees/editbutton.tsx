'use client'

import { editEmployee, deleteEmployee } from '@/lib/employeesHelper';
import { useState, useEffect } from 'react';
import { getAllGroups } from '@/lib/groupsHelper';

interface IEmployeeProps {
    editingEmployee: IEmployee,
    onEmployeeEdited: () => Promise<void>;
    employee: IEmployee[];
    groups: IGroup[];
    onEmployeeDeleted: () => Promise<void>;
}



const EditButton: React.FC<IEmployeeProps> = (props: IEmployeeProps) => {
    const [id] = useState(props.editingEmployee.id);
    const [email, setEmail] = useState(props.editingEmployee.email);
    const [first_name, setFirstName] = useState(props.editingEmployee.first_name);
    const [last_name, setLastName] = useState(props.editingEmployee.last_name);
    const [role, setRole] = useState(props.editingEmployee.role);
    const [group, setGroup] = useState('');
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
    const [tasks, setTasks] = useState(props.editingEmployee.tasks);
    const [loading, setLoading] = useState(false);



    const roleValues = [
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

    async function handleEdit(e: React.SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            id: { value: number };
            email: { value: string };
            first_name: { value: string };
            last_name: { value: string };
            role: { value: string };
            groups: { value: number };
        };

        const employee: IEmployee = {
            id: target.id.value,
            email: target.email.value,
            first_name: target.first_name.value,
            last_name: target.last_name.value,
            role: target.role.value,
            // groups: [],
            // groups: selectedGroup ? [selectedGroup.id] : [],
            groups: selectedGroup ? [selectedGroup] : [],

        }
        console.log('Editing Employee:', employee);
        await editEmployee(employee);
        props.onEmployeeEdited();
        closeModal();
        setLoading(true);
    }

    function handleOnChange(params: any) {
        setEmail(params.email)
        setFirstName(params.first_name)
        setLastName(params.last_name)
        setRole(params.role)
        setGroups(params.groups)
    }

    const closeModal = () => {
        let checkbox: HTMLInputElement | any = document.getElementById(`${props.editingEmployee.email}`);
        if (checkbox.checked == true) checkbox.checked = false;
    }

    const onEmployeeDeleted = async () => {
        closeModal();
    };

    const handleDelete = async (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setLoading(true);
        await deleteEmployee(props.editingEmployee);
        await onEmployeeDeleted();
        setLoading(false);
        closeModal();
    }


    return (
        <>
            {loading && <div className="fixed inset-0 flex items-center justify-center">Loading...</div>}

            <label htmlFor={props.editingEmployee.email} className="text-xl transition-transform transform hover:scale-105 duration-300 rounded-[30px] bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md py-3 px-5 rounded-xl bg-darkseagreen shadow-md">Edit</label>

            <input type="checkbox" id={props.editingEmployee.email} className="modal-toggle" />
            <div className="modal fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <form method="dialog" className="w-[750px] max-h-[80vh] relative bg-[#f5ecdf] rounded-[20px] overflow-y-auto" style={{ boxShadow: "0px 8px 20px 0 #664a2d" }} onSubmit={handleEdit}>
                    <p>ID: {id}</p>
                    <input type="hidden" name="id" value={id} />
                    <div className="p-8 space-y-5">
                        {['email', 'first_name', 'last_name'].map((field, i) => (
                            <div className="flex flex-col items-center mb-5" key={i}>
                                <label htmlFor={field} className="mb-2 text-2xl font-semibold text-[#333333]">
                                    {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                                </label>
                                <input
                                    id={field}
                                    onChange={e => handleOnChange(e)}
                                    name={field}
                                    value={field === 'email' ? email : field === 'first_name' ? first_name : last_name}
                                    className="w-[400px] h-6 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4"
                                />
                            </div>
                        ))}

                        <div className="flex flex-col items-center mb-5">
                            <label htmlFor="role" className="mb-2 text-2xl font-semibold text-[#333333]">Role:</label>
                            <select
                                id="role"
                                onChange={e => handleOnChange(e)}
                                name="role"
                                value={role}
                                className="w-[400px] h-12 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4"
                            >
                                <option value="" disabled>Select Status</option>
                                {roleValues.map(p => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col items-center mb-5">
                            <label htmlFor="group" className="mb-2 text-2xl font-semibold text-[#333333]">Group:</label>
                            <div className="w-[400px] h-12 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4">
                                <select id="group" onChange={e => {
                                    const selected = groups.find(grp => grp.id === Number(e.target.value));
                                    setSelectedGroup(selected || null);
                                }} name="group" placeholder="Group" className="w-[400px] h-12 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4">
                                    <option value="" >None</option>
                                    {groups.map(grp => (
                                        <option key={grp.id} value={grp.id}>{grp.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex mb-4 space-x-6 justify-center">
                            <button type="submit" className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl text-black py-2 px-6">Submit</button>
                            <button onClick={handleDelete} className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] bg-[#D46A6A] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl font-light text-black py-2 px-4 flex items-center justify-center">
                                Delete
                            </button>
                            <button onClick={closeModal} type="button" className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl font-light text-black py-2 px-4">Cancel</button>
                        </div>
                    </div>
                </form>
                <div className="modal-close" onClick={closeModal}></div>
            </div>
        </>
    );
};

export default EditButton;
