'use client'

import { deleteTask } from '@/lib/tasksHelper';
import { useRouter } from 'next/navigation';

interface ITaskProps {
    taskProp: ITask,
    onTaskDeleted: () => Promise<void>;
}

const DeleteButton: React.FC<ITaskProps> = (props: ITaskProps) => {
    const router = useRouter();

    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        await deleteTask(props.taskProp);
        await props.onTaskDeleted();
        router.refresh();
    }

    return (
        <>
            <button className='btn btn-error' onClick={handleDelete}>Delete</button>
        </>
    )
}

export default DeleteButton;
