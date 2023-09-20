import { baseUrl } from "./constants";

export const getAllEmployees = async (): Promise<IEmployee[]> => {
  const res = await fetch(`${baseUrl}/api/employees`, { cache: 'no-store' });
  const employees = await res.json();
  return employees;
}

export const addEmployee = async (employee: INewEmployee): Promise<IEmployee> => {
  const res = await fetch(`${baseUrl}/api/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
  const newEmployee = await res.json();
  return newEmployee;
}

export const editEmployee = async (employee: IEmployee): Promise<IEmployee> => {
  const res = await fetch(`${baseUrl}/api/employees/${employee.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
  const updatedEmployee = await res.json();
  return updatedEmployee;
}

export const deleteEmployee = async (employee: IEmployee): Promise<void> => {
  console.log("deleteEmployee called")
  await fetch(`${baseUrl}/api/employees/${employee.id}`, {
    method: 'DELETE',
  })
}