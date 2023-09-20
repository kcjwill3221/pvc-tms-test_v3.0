import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id
    const group: IGroup | any = await prisma.group.findUnique({
        where: {
            id: parseInt(id, 10)
        }
    })

    return NextResponse.json(group)
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // updates a group
    const id = params.id
    const json = await request.json()
    const updatedgroup: IGroup | any = await prisma.group.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            name: json.name,
        }
    })

    return NextResponse.json(updatedgroup)
}

// Update group
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#update
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id, 10);
    const json = await request.json()

    if (request.headers.has('Assignment')) {
        json.task.due_date = new Date(json.task.due_date).toISOString();

        // Fetch the group to get the list of employees
        const updatedgroup: IGroup | any = await prisma.group.findUnique({
            where: { id: id },
            include: { employees: true }
        });

        // Iterate over all employees of the group and assign the task to them
        if (updatedgroup && updatedgroup.employees) {
            for (const employee of updatedgroup.employees) {
                await prisma.employee.update({
                    where: { id: employee.id },
                    data: {
                        tasks: {
                            connect: {
                                id: parseInt(json.task.id, 10)
                            }
                        },
                    },
                });
            }
        }

        return NextResponse.json(updatedgroup);
    } else {
        const updatedgroup: IGroup | any = await prisma.group.update({
            where: { id: id },
            data: json,
        })
        return NextResponse.json(updatedgroup)
    }
}


// Delete group
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#delete
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // deletes an group
    const id = params.id

    const deleted = await prisma.group.delete({
        where: {
            id: parseInt(id, 10)
        }
    })

    return NextResponse.json(deleted)
}
