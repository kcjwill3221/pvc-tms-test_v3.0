'use client'

import { editGroup } from '@/lib/groupsHelper';
import { useState } from 'react';

interface IGroupProps {
    editingGroup: IGroup,
    onGroupEdited: () => Promise<void>;
}



const EditButton: React.FC<IGroupProps> = (props: IGroupProps) => {
    const [id] = useState(props.editingGroup.id);
    const [name, setFirstName] = useState(props.editingGroup.name);

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
        console.log('Generated Task:', group);
        await editGroup(group);
        props.onGroupEdited();
    }

    const closeModal = () => {
        let checkbox: HTMLInputElement | any = document.getElementById(`${props.editingGroup.id}`)
        if (checkbox.checked == true) checkbox.checked = false
    }

    return (
        <>
            {/* The button to open modal */}
            <label htmlFor={String(props.editingGroup.id)} className="btn btn-info">Edit</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id={String(props.editingGroup.id)} className="modal-toggle" />
            <div className="modal">
                <form method="dialog" className="modal-box" onSubmit={handleEdit}>
                    <p>ID: {id}</p>
                    <input type="hidden" name="id" value={id} />
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <label htmlFor="name">Name: </label>
                        <input id="name" onChange={e => setFirstName(e.target.value)} name="name" value={name} />
                        <br />
                        <button onClick={closeModal} type="submit" className="btn mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">Confirm</button>
                        <p className="py-4">Press ESC key or click outside to cancel</p>
                    </div>
                </form>
                <label className="modal-backdrop" htmlFor={String(props.editingGroup.id)}>Close</label>
            </div>

        </>
    )
}

export default EditButton;