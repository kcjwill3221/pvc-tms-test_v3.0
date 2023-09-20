'use client'

import { addGroup } from "@/lib/groupsHelper";
import { useState } from "react";

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
        }
        await addGroup(group);
        if (props.onGroupCreated) {
            props.onGroupCreated();
        }
    }

    function handleOnChange(params: any) {
        setName(params.email)
    }

    const openModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createGroupModal')
        dialog.showModal()
    }

    const closeModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createGroupModal')
        dialog.close()
    }

    return (
        <>
            <button className="btn" onClick={openModal}>Create Group</button>
            <dialog id="createGroupModal" className="modal">
                <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <label htmlFor="name">Name: </label>
                        <input id="name" onChange={e => {
                            handleOnChange(e)
                        }} name="name" value={name} />
                        <br />
                        <button onClick={closeModal} type="submit" className="btn mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">Create Group</button>
                        <p className="py-4">Press ESC key or click outside to close</p>
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}