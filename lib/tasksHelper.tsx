import { baseUrl } from "./constants";
import { sendEmail } from "./sendEmail";

export const getAllTasks = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/api/tasks`, { cache: 'no-store' });
  const tasks = await res.json();
  return tasks;
}

export const addTask = async (task: INewTask, employee?: IEmployee | null, group?: IGroup | null): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const newTask = await res.json();
  if (group) {
    await assignGroup(group, newTask);
  } else if (employee) {
    await assignEmployee(employee, newTask);
  }
  return newTask;
}

export const editTask = async (task: ITask, employee?: IEmployee | null, group?: IGroup | null): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const updatedTask = await res.json();
  return updatedTask;
}

export const deleteTask = async (task: ITask): Promise<void> => {
  console.log("deleteTask called")
  await fetch(`${baseUrl}/api/tasks/${task.id}`, {
    method: 'DELETE',
  })
}

export const assignEmployee = async (employee: IEmployee, task: ITask): Promise<void> => {
  await fetch(`${baseUrl}/api/employees/${employee.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Assignment': 'true'
    },
    body: JSON.stringify({
      task: task
    })
  })

  await fetch(`${baseUrl}/api/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Assignment': 'true'
    },
    body: JSON.stringify({
      employee: employee
    })

  })

  sendEmail(employee, task)
  console.log('%s assigned to %s', task.id, employee.email)
}

export const assignGroup = async (group: IGroup, task: ITask): Promise<void> => {
  await fetch(`${baseUrl}/api/groups/${group.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Assignment': 'true'
    },
    body: JSON.stringify({
      task: task
    })
  })

  await fetch(`${baseUrl}/api/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Assignment': 'true'
    },
    body: JSON.stringify({
      group: group
    })

  })

  // sendEmail(employee, task)
  // console.log('%s assigned to %s', task.id, employee.email)
}