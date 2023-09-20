'use client'

import { addGroup } from "@/lib/groupsHelper";
import { useState, useEffect } from "react";
import { getAllGroups } from "@/lib/groupsHelper";

type CreateGroupProps = {
    onGroupCreated: () => Promise<void>;
};

export default function CreateGroup(props: CreateGroupProps) {
    const [name, setName] = useState('');

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: { value: string };
        };

        const group: INewGroup = {
            name: target.name.value,
        };

        console.log("Inserting group:", group);
        await addGroup(group);
        if (props.onGroupCreated) {
            props.onGroupCreated();
        }
        closeModal();
    }

    function handleOnChange(params: any) {
        setName(params.name)
    }

    const openModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createGroupModal');
        dialog.showModal();
    };

    const closeModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createGroupModal');
        dialog.close();
    };

    return (
        <>
            <button className="text-xl transition-transform transform hover:scale-105 duration-300 rounded-[30px]
            bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md py-3 px-5 rounded-xl
            bg-darkseagreen shadow-md" onClick={openModal}>Create Group</button>

            <dialog id="createGroupModal" className="modal fixed z-10 inset-0 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <form method="post" onSubmit={handleSubmit} className="w-[750px] max-h-[80vh] relative bg-[#f5ecdf] rounded-[20px] overflow-y-auto" style={{ boxShadow: "0px 8px 20px 0 #664a2d" }}>
                    <div className="p-8 space-y-5">
                        <div className="flex flex-col items-center mb-5">
                            <label htmlFor="name" className="mb-2 text-2xl font-semibold text-[#333333]">Group Name:</label>
                            <input id="name" type="text" onChange={e => handleOnChange(e)} name="name" value={name} className="w-[400px] h-6 overflow-hidden rounded-lg bg-neutral-100 text-lg p-4" />
                        </div>

                    </div>

                    <div className="flex mb-4 space-x-6 justify-center">
                        <button type="submit" className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] bg-[#e2b268] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl text-black py-2 px-6">Create Group</button>
                        <button onClick={closeModal} type="button" className="transition-transform transform hover:scale-105 duration-300 rounded-[30px] shadow-md hover:shadow-xl transition-shadow shadow-md text-2xl font-light text-black py-2 px-4">Cancel</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}
