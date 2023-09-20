import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const task: ITask | any = await prisma.task.findUnique({
    where: {
      id: parseInt(id, 10)
    }, include: {
      task_assignment: true,
    }
  })

  return NextResponse.json(task)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // updates a task
  const id = params.id
  const json = await request.json()
  json.due_date = new Date(json.due_date).toISOString();
  const updatedTask: ITask | any = await prisma.task.update({
    where: {
      id: parseInt(id, 10)
    },
    data: {
      title: json.title,
      description: json.description,
      priority: json.priority,
      status: json.status,
      task_assignment: json.task_assignment,
      due_date: json.due_date
    }
  })

  return NextResponse.json(updatedTask)
}

// Update Task
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#update
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // updates a task
  const id = parseInt(params.id, 10);
  const json = await request.json();
  console.log("Parsed JSON:", json);

  if (request.headers.has('Assignment')) {
    const currentTask = await prisma.task.findUnique({
      where: { id: id },
      include: { task_assignment: true }
    });

    if (currentTask) {
      //const currentEmployees = currentTask.task_assignment.map(e => e.id);
      const currentEmployees = currentTask.task_assignment?.map(e => e.id) || [];
      if (!json.employee) {
        return NextResponse.json({ error: "Employee data missing in request", statusCode: 400 });
      }
      const updatedTask: ITask | any = await prisma.task.update({
        where: { id: id },
        data: {
          task_assignment: {
            disconnect: currentEmployees.map(id => ({ id: id })),
            connect: { id: json.employee.id }
          }
        }
      });

      return NextResponse.json(updatedTask);
    }
    return NextResponse.json({ error: "Task not found", statusCode: 404 });
  }
  else {
    const updatedTask: ITask | any = await prisma.task.update({
      where: { id: id },
      data: json,
    });
    return NextResponse.json(updatedTask);
  }
}


// Delete Task
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#delete
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // deletes a task
  const id = params.id

  const deleted = await prisma.task.delete({
    where: {
      id: parseInt(id, 10)
    }
  })

  return NextResponse.json(deleted)
}