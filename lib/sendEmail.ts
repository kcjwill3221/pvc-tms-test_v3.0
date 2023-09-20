import { baseUrl } from "./constants";

export const sendEmail = async ({ email }: IEmployee, task: ITask) => {
    console.log('Sending email to %s with task %s', email, task.title)

    const res = await fetch(`${baseUrl}/api/send/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    
}
