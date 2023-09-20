import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    console.log("GET method called for groups")
    const groups: IGroup[] | any = await prisma.group.findMany({
        include: {
            employees: true
        }
    });
    console.log("Fetched groups:", groups);
    return NextResponse.json(groups)
}

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    console.log('Raw Request Body:', requestBody);

    try {
        const created = await prisma.group.create({
            data: requestBody
        });

        return new NextResponse(JSON.stringify(created), { status: 201 });
    } catch (error) {
        console.error("Error creating group:", error);
        return new NextResponse("Error creating group", { status: 500 });
    }
}