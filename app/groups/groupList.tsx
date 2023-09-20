'use client'
import { getAllTasks } from "@/lib/tasksHelper";
import DeleteButton from "./deletebutton";
import EditButton from "./editbutton";
import { useEffect, useState } from "react";

interface IGroupProps {
    groups: IGroup[],
    onGroupEdited: () => Promise<void>;
    onGroupDeleted: () => Promise<void>;
}

export default function GroupList({ groups, onGroupEdited, onGroupDeleted }: IGroupProps) {
    return (
        <>
            {groups?.map(group => (
                <div className="Row" key={group.id}>
                    {group.name}
                    <EditButton editingGroup={group} onGroupEdited={onGroupEdited} />
                    <DeleteButton groupProp={group} onGroupDeleted={onGroupDeleted} />
                </div>
            ))}
        </>
    )
}