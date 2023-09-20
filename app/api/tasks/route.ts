import { dateStringConverter } from '@/lib/date';
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";

// Read Tasks
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
export async function GET() {
  console.log("GET method called for tasks")
  const tasks: ITask[] | any = await prisma.task.findMany({
    include: {
      task_assignment: true,
    }
  })
  tasks.map((task: ITask) => (task.due_date = dateStringConverter(task.due_date)));

  return NextResponse.json(tasks)
}

// Create Tasks
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#create
export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  console.log('Raw Request Body:', requestBody);
  requestBody.due_date = new Date(requestBody.due_date).toISOString(); // Convert the date string to a full ISO-8601 DateTime string

  try {
    const created = await prisma.task.create({
      data: requestBody
    });

    return new NextResponse(JSON.stringify(created), { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return new NextResponse("Error creating task", { status: 500 });
  }
}
