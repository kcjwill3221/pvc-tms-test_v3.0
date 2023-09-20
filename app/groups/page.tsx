'use client'
import { getAllGroups } from "@/lib/groupsHelper";
import CreateGroup from "./creategroup";
import GroupList from "./groupList";
import { useEffect, useState } from 'react';
import { UserButton } from "@clerk/nextjs";

export default function GroupsPage() {
    const [isCanceled, setCanceled] = useState(false)
    const [groupList, setGroupList] = useState<IGroup[]>([]);

    useEffect(() => {
        async function fetchGroups() {
            const groups = await getAllGroups();
            setGroupList(groups);
        }
        if (!isCanceled) {
            fetchGroups();
        }

        return () => {
            console.log('Canceled fetching groups... user navigated away')
            setCanceled(true)
        }

    }, [isCanceled]);

    const handleGroupCreated = async () => {
        const groups = await getAllGroups();
        setGroupList(groups);
    }

    const handleGroupEdited = async () => {
        const groups = await getAllGroups();
        setGroupList(groups);
    }

    const handleGroupDeleted = async () => {
        const groups = await getAllGroups();
        setGroupList(groups);
    }

    return (
        <>
            <h1>Groups</h1>
            <UserButton afterSignOutUrl="/" />
            <CreateGroup onGroupCreated={handleGroupCreated} />
            <GroupList groups={groupList} onGroupEdited={handleGroupEdited} onGroupDeleted={handleGroupDeleted} />
        </>
    )
}