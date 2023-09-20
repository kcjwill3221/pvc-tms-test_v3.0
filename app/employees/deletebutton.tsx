'use client'

import { deleteEmployee } from '@/lib/employeesHelper';
import { useRouter } from 'next/navigation';

interface IEmployeeProps {
    employeeProp: IEmployee,
    onEmployeeDeleted: () => Promise<void>;
}

const DeleteButton: React.FC<IEmployeeProps> = (props: IEmployeeProps) => {
    const router = useRouter();

    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        await deleteEmployee(props.employeeProp);
        await props.onEmployeeDeleted();
        router.refresh();
    }

    return (
        <>
            <button className='btn btn-error' onClick={handleDelete}>Delete</button>
        </>
    )
}

export default DeleteButton;
