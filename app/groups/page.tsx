'use client'
import { getAllGroups, deleteGroup } from "@/lib/groupsHelper";
import CreateGroup from "./creategroup";
import GroupList from "./groupList";
// import { IGroup } from "./groupList";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import EditButton from './editbutton';
import Image from "next/image";
import { useClerk } from "@clerk/clerk-react";

export default function GroupsPage() {
    const [isCanceled, setCanceled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [groupList, setGroupList] = useState<IGroup[]>([]);
    const [selectedGroupEmail, setSelectedGroupEmail] = useState<string | null>(null);
    const { signOut } = useClerk();
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchGroups() {
            const groups = await getAllGroups();
            setGroupList(groups);
        }

        if (!isCanceled) {
            fetchGroups();
        }

        return () => {
            console.log('Canceled fetching groups... user navigated away');
            setCanceled(true);
        }

    }, [isCanceled, groupList]);

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

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const openModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createGroupModal');
        dialog.showModal();
    }

    const closeModal = () => {
        let dialog: HTMLDialogElement | any = document.getElementById('createGroupModal');
        dialog.close();
    }

    return (
        <>
            <div style={{ position: 'absolute', left: '-9999px' }}>
                <CreateGroup onGroupCreated={handleGroupCreated} />
                <GroupList groups={groupList} onGroupEdited={handleGroupEdited} onGroupDeleted={handleGroupDeleted} />
            </div>

            <div className="grid grid-cols-12 h-auto min-h-screen font-inter text-5xl text-black">
                <div className="col-span-8 p-10 bg-peachpuff">
                    <h1 className="mb-8 text-[64px] font-medium text-dimgray-200">Groups</h1>
                    <div className="p-8 rounded-[9px] bg-linen shadow-inner w-full max-w-xl">
                        <div className="flex space-x-4 mb-4">

                            <button onClick={openModal} className="text-xl transition-transform transform hover:scale-105
                                duration-300 rounded-[30px] shadow-md py-3 px-5 rounded-xl bg-darkseagreen hover:shadow-xl">
                                Create Groups
                            </button>

                            <Link href="../employees">
                                <button className="text-xl transition-transform transform
                             hover:scale-105 duration-300 rounded-[30px] shadow-md py-3 px-5 rounded-xl bg-sandybrown hover:shadow-xl">
                                    Employees
                                </button>
                            </Link>

                        </div>
                        <ul className="list-none">
                            {groupList.map((group: IGroup) => (
                                <li
                                    key={group.id}
                                    className={`bg-[#F5F5F5] m-2 p-4 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex justify-between items-center
                                    ${group.id === selectedGroupId ? 'bg-[#D3D3D3]' : ''}`}
                                    onClick={() => setSelectedGroupId(group.id)}
                                >
                                    <button className="font-semibold text-xl text-[#333333] hover:text-[#e2b268] focus:outline-none transition-all duration-300 bg-transparent border-none">
                                        {group.name}
                                    </button>

                                    <EditButton editingGroup={group} onGroupEdited={handleGroupEdited} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="col-span-2 bg-silver"></div>

                <div className="col-span-2 p-10 bg-dimgray-100 flex flex-col items-center">
                    <Image
                        className="object-cover mt-10"
                        alt="Group image"
                        src="/1630696668162-3.jpeg"
                        width={151}
                        height={146}
                    />
                    <div className="flex flex-col items-center w-full space-y-6 mt-6">
                        <Link href="../tasks">
                            <button className="transition-transform transform hover:scale-105 duration-300 rounded-[30px]
                            shadow-md py-6 px-14 text-5xl text-dimgray-200 font-semibold bg-ddcaae hover:shadow-xl">
                                Tasks
                            </button>
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="transition-transform transform hover:scale-105 duration-300 rounded-[30px]
    shadow-md py-6 px-14 text-5xl text-dimgray-200 font-semibold bg-sandybrown hover:shadow-xl"
                        >
                            Sign-Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
