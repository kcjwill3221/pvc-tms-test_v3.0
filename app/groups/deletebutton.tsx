'use client'

import { deleteGroup } from '@/lib/groupsHelper';
import { useRouter } from 'next/navigation';

interface IGroupProps {
    groupProp: IGroup,
    onGroupDeleted: () => Promise<void>;
}

const DeleteButton: React.FC<IGroupProps> = (props: IGroupProps) => {
    const router = useRouter();

    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        await deleteGroup(props.groupProp);
        await props.onGroupDeleted();
        router.refresh();
    }

    return (
        <>
            <button className='btn btn-error' onClick={handleDelete}>Delete</button>
        </>
    )
}

export default DeleteButton;
