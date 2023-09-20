import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const employee: IEmployee | any = await prisma.employee.findUnique({
    where: {
      id: parseInt(id, 10)
    }, include: {
      tasks: true,
    }
  })

  return NextResponse.json(employee)
}

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;
//   const json = await request.json();

//   let updateData: any = {
//     first_name: json.first_name,
//     last_name: json.last_name,
//     role: json.role,
//     email: json.email
//   };

//   if (json.groups && Array.isArray(json.groups) && json.groups.length > 0) {
//     updateData.groups = {
//       disconnect: { // disconnect old groups
//         id: { NOT_IN: json.groups.map((group: IGroup) => group.id) }
//       },
//       connect: json.groups.map((group: IGroup) => ({ id: group.id })) // connect new groups
//     };
//   }

//   const updatedEmployee: IEmployee | any = await prisma.employee.update({
//     where: {
//       id: parseInt(id, 10)
//     },
//     data: updateData
//   });

//   return NextResponse.json(updatedEmployee);
// }
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;
//   const json = await request.json();

//   let updateData: any = {
//     first_name: json.first_name,
//     last_name: json.last_name,
//     role: json.role,
//     email: json.email
//   };

//   // Always disconnect all groups
//   updateData.groups = {
//     disconnect: {}
//   };

//   // If there are groups provided, connect them
//   if (json.groups && Array.isArray(json.groups) && json.groups.length > 0) {
//     updateData.groups.connect = json.groups.map((group: IGroup) => ({ id: group.id }));
//   }

//   const updatedEmployee: IEmployee | any = await prisma.employee.update({
//     where: {
//       id: parseInt(id, 10)
//     },
//     data: updateData
//   });

//   return NextResponse.json(updatedEmployee);
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id as string;
//   const json = await request.json();

//   // Fetch current employee's groups
//   const currentEmployee: IEmployee | any = await prisma.employee.findUnique({
//     where: { id: parseInt(id, 10) },
//     select: { groups: true }
//   });
//   const currentGroupIds = currentEmployee.groups.map((group: IGroup) => group.id);
//   console.log("Current Group IDs:", currentGroupIds);

//   let updateData: any = {
//     first_name: json.first_name,
//     last_name: json.last_name,
//     role: json.role,
//     email: json.email
//   };

//   // Disconnect all current groups
//   updateData.groups = {
//     disconnect: currentGroupIds.map((id: number) => ({ id }))
//   };

//   // If there are groups provided, connect them
//   if (json.groups && Array.isArray(json.groups) && json.groups.length > 0) {
//     updateData.groups.connect = json.groups.map((group: IGroup) => ({ id: group.id }));
//   }

//   const updatedEmployee: IEmployee | any = await prisma.employee.update({
//     where: {
//       id: parseInt(id, 10)
//     },
//     data: updateData
//   });

//   console.log("Update Data:", updateData);
//   return NextResponse.json(updatedEmployee);
// }


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id as string;
  const json = await request.json();

  // Fetch current employee's groups
  const currentEmployee: IEmployee | any = await prisma.employee.findUnique({
    where: { id: parseInt(id, 10) },
    select: { groups: true }
  });
  const currentGroupIds = currentEmployee.groups.map((group: IGroup) => group.id);
  console.log("Current Group IDs:", currentGroupIds);

  let updateData: any = {
    first_name: json.first_name,
    last_name: json.last_name,
    role: json.role,
    email: json.email,
    groups: {
      disconnect: currentGroupIds.map((id: number) => ({ id }))  // Disconnect all current groups first
    }
  };

  // If there are groups provided, connect them
  if (json.groups && Array.isArray(json.groups) && json.groups.length > 0) {
    // Assuming you only want to connect the first group (or the only group) from json.groups
    updateData.groups.connect = [{ id: json.groups[0].id }];
  }

  const updatedEmployee: IEmployee | any = await prisma.employee.update({
    where: {
      id: parseInt(id, 10)
    },
    data: updateData
  });

  console.log("Update Data:", updateData);
  return NextResponse.json(updatedEmployee);
}



// Update employee
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#update
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // updates a employee
  const id = parseInt(params.id, 10);
  const json = await request.json()

  if (request.headers.has('Assignment')) {
    json.task.due_date = new Date(json.task.due_date).toISOString();
    const updatedemployee: IEmployee | any = await prisma.employee.update({
      where: { id: id },
      data: {
        tasks: {
          connect: {
            id: parseInt(json.task.id, 10)
          }
        },
      },
    })
    return NextResponse.json(updatedemployee)
  } else {
    const updatedemployee: IEmployee | any = await prisma.employee.update({
      where: { id: id },
      data: json,
    })
    return NextResponse.json(updatedemployee)
  }


}

// Delete employee
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#delete
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // deletes an employee
  const id = params.id

  const deleted = await prisma.employee.delete({
    where: {
      id: parseInt(id, 10)
    }
  })

  return NextResponse.json(deleted)
}
