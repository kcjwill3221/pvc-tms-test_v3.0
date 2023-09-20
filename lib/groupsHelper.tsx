import { baseUrl } from "./constants";

export const getAllGroups = async (): Promise<IGroup[]> => {
    const res = await fetch(`${baseUrl}/api/groups`, { cache: 'no-store' });
    const groups = await res.json();
    return groups;
}

export const addGroup = async (group: INewGroup): Promise<IGroup> => {
    const res = await fetch(`${baseUrl}/api/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    })
    const newGroup = await res.json();
    return newGroup;
}

export const editGroup = async (group: IGroup): Promise<IGroup> => {
    const res = await fetch(`${baseUrl}/api/groups/${group.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    })
    const updatedGroup = await res.json();
    return updatedGroup;
}

export const deleteGroup = async (group: IGroup): Promise<void> => {
    console.log("deleteGroup called")
    await fetch(`${baseUrl}/api/groups/${group.id}`, {
        method: 'DELETE',
    })
}