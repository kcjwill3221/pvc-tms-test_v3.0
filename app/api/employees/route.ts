import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";
import querystring from 'querystring';

type EmployeeInput = {
  first_name: string,
  last_name: string,
  role: string,
  email: string,
  group: string
};

// Read Employees
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
export async function GET() {
  console.log("GET method called for employees")
  const employee: IEmployee[] | any = await prisma.employee.findMany({
    include: {
      tasks: true,
      groups: true
    }
  })

  return NextResponse.json(employee)
}

// Create Employees
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#create
export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  console.log('Raw Request Body:', requestBody);

  try {
    const created = await prisma.employee.create({
      data: {
        first_name: requestBody.first_name,
        last_name: requestBody.last_name,
        role: requestBody.role,
        email: requestBody.email,
        groups: {
          connect: requestBody.groups.map((group: { id: number }) => ({ id: group.id }))
        }
      }
    });

    return new NextResponse(JSON.stringify(created), { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return new NextResponse("Error creating employee", { status: 500 });
  }
}
