'use client'

import { editGroup, deleteGroup } from '@/lib/groupsHelper';
import { useState, useEffect } from 'react';
import { getAllGroups } from '@/lib/groupsHelper';

interface IGroupProps {
    editingGroup: IGroup,
    onGroupEdited: () => Promise<void>;
}



const EditButton: React.FC<IGroupProps> = (props: IGroupProps) => {
    const [id] = useState(props.editingGroup.id);
    const [name, setGroupName] = useState(props.editingGroup.name);
    const [loading, setLoading] = useState(false);

    async function handleEdit(e: React.SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            id: { value: number };
            name: { value: string };
        };

        const group: IGroup = {
            id: target.id.value,
            name: target.name.value,
        }
        console.log('Editing Group:', group);
        await editGroup(group);
        props.onGroupEdited();
        closeModal();
        setLoading(true);
    }

    const closeModal = () => {
        let checkbox: HTMLInputElement | any = document.getElementById(`${props.editingGroup.id}`)
        if (checkbox.checked == true) checkbox.checked = false
    }

    const onEmployeeDeleted = async () => {
        closeModal();
    };

    const handleDelete = async (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setLoading(true);
        await deleteGroup(props.editingGroup);
        await onEmployeeDeleted();
        setLoading(false);
        closeModal();
    }

    return (
        <>
            {/* The button to open modal */}
            {loading && <div className="fixed inset-0 flex items-center justify-center">Loading...</div>}

            <label htmlFor={String(props.editingGroup.id)} className="text-xl transition-transform transform hover:scale-105 duration-300 rounded-[30px] bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md py-3 px-5 rounded-xl bg-darkseagreen shadow-md">Edit</label>

            <input type="checkbox" id={String(props.editingGroup.id)} className="modal-toggle" />
            <div className="modal fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <form method="dialog" className="w-[750px] max-h-[80vh] relative bg-[#f5ecdf] rounded-[20px] overflow-y-auto" style={{ boxShadow: "0px 8px 20px 0 #664a2d" }} onSubmit={handleEdit}>
                    <p>ID: {id}</p>
                    <input type="hidden" name="id" value={id} />
                    <div className="p-8 space-y-5">

                        <label htmlFor="name" className="mb-2 text-2xl font-semibold text-[#333333]">Name: </label>
                        <input id="name" onChange={e => setGroupName(e.target.value)} name="name" value={name} className="w-[400px] h-6 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4" />

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