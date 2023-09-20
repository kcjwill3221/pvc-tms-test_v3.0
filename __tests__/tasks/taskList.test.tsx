import {render,screen} from '@testing-library/react'//commands imported form the testeing library
import TasksPage from '@/app/tasks/taskList' //imported from page.tsx
import userEvent from '@testing-library/user-event'
import TaskList from '@/app/tasks/taskList'
import { getAllEmployees } from '@/lib/employeesHelper'

//mock create task _cloning
const AssignmentList = jest.fn()


//mock function for handleTaskEdited
const handleTaskEdited = jest.fn()
//mock function for handleTaskDeleted
const handleTaskDeleted = jest.fn()

//Can not export the interface button from editbutton.tsx due to no code changes
//this breaks the DRY(dont repeat yourself) concept to mock edit button
interface ITaskProps {
    editingTask: ITask,
    onTaskEdited: () => Promise<void>;
    employees: IEmployee[];
}

//mock edit button
const EditButtonProps = jest.fn()
jest.mock('../../app/tasks/editbutton', ()=>{
    const MockEditButton= (props:ITaskProps)=>{
        EditButtonProps(props)
        return <div data-testid='Edit'>
            <button onClick={props.onTaskEdited}>Edit</button>
        </div>
    }
    return MockEditButton;
})

//props for deleting button
interface ITaskPropsDelete {
    taskProp: ITask,
    onTaskDeleted: () => Promise<void>;
}

//mock deletebutton
const DeleteButtonProps = jest.fn()
jest.mock('../../app/tasks/deletebutton', ()=>{
    const MockDeleteButton= (props:ITaskPropsDelete)=>{
        DeleteButtonProps(props)
        return <div data-testid='Delete'>
            <button onClick={props.onTaskDeleted}>Delete</button>
        </div>
    }
    return MockDeleteButton;
})

//mock getAllemployees API request
jest.mock('../../lib/employeesHelper')



interface ITaskPropsAssigmentList {
    taskProp: ITask,
    employees: IEmployee[]
    
}
//mock AssignmentList
const AssignmentListProps = jest.fn()
jest.mock('../../app/tasks/assigntask', ()=>{
    const MockAssignButton= (props:ITaskPropsAssigmentList)=>{
        AssignmentListProps(props)
        return <div data-testid='Assign'>
        </div>
    }
    return MockAssignButton;
})




//------------------------------------------------------------------



//created dummy data ITask
const dummyTasks: ITask[] = [
    {
      id: 1,
      title: "Task 1",
      description: "This is task 1 description.",
      priority: "High",
      status: "In Progress",
      task_assignment: [
        {
          first_name: "John",
          last_name: "Doe",
          role: "Developer",
          email: "john@example.com",
        },
      ],
      reminder_time: "2023-09-15 10:00 AM",
      assigned_by: [
        {
          id: 1,
          username: "manager1",
          role: "Manager",
          email: "manager1@example.com",
          isAdmin: true,
        },
      ],
      due_date: "2023-09-20",
      createdAt: "2023-09-10T12:00:00Z",
      updatedAt: "2023-09-12T14:30:00Z",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is task 2 description.",
      priority: "Medium",
      status: "Not Started",
      task_assignment: [
        {
          first_name: "Alice",
          last_name: "Johnson",
          role: "Designer",
          email: "alice@example.com",
        },
      ],
      reminder_time: "2023-09-18 09:30 AM",
      assigned_by: [
        {
          id: 2,
          username: "manager2",
          role: "Manager",
          email: "manager2@example.com",
          isAdmin: false,
        },
      ],
      due_date: "2023-09-25",
      createdAt: "2023-09-11T10:15:00Z",
      updatedAt: "2023-09-12T11:45:00Z",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is task 3 description.",
      priority: "Low",
      status: "Complete",
      task_assignment: [
        {
          first_name: "Eva",
          last_name: "Smith",
          role: "Tester",
          email: "eva@example.com",
        },
      ],
      reminder_time: "2023-09-14 03:45 PM",
      assigned_by: [
        {
          id: 1,
          username: "manager1",
          role: "Manager",
          email: "manager1@example.com",
          isAdmin: true,
        },
      ],
      due_date: "2023-09-15",
      createdAt: "2023-09-09T14:45:00Z",
      updatedAt: "2023-09-10T09:30:00Z",
    },
    {
      id: 4,
      title: "Task 4",
      description: "This is task 4 description.",
      priority: "High",
      status: "In Progress",
      task_assignment: [
        {
          first_name: "Bob",
          last_name: "Brown",
          role: "Developer",
          email: "bob@example.com",
        },
      ],
      reminder_time: "2023-09-17 02:00 PM",
      assigned_by: [
        {
          id: 2,
          username: "manager2",
          role: "Manager",
          email: "manager2@example.com",
          isAdmin: false,
        },
      ],
      due_date: "2023-09-22",
      createdAt: "2023-09-12T09:00:00Z",
      updatedAt: "2023-09-14T15:20:00Z",
    },
  ];

  const dummyEmployees: IEmployee[] = [
    {
      first_name: "John",
      last_name: "Doe",
      role: "Developer",
      email: "john@example.com",
      tasks: [
        {
          id: 1,
          title: "Task 1",
          description: "This is task 1 description.",
          priority: "High",
          status: "In Progress",
          task_assignment: [],
          reminder_time: "2023-09-15 10:00 AM",
          assigned_by: [],
          due_date: "2023-09-20",
          createdAt: "2023-09-10T12:00:00Z",
          updatedAt: "2023-09-12T14:30:00Z",
        },
      ],
    },
    {
      first_name: "Alice",
      last_name: "Johnson",
      role: "Designer",
      email: "alice@example.com",
      tasks: [
        {
          id: 2,
          title: "Task 2",
          description: "This is task 2 description.",
          priority: "Medium",
          status: "Not Started",
          task_assignment: [],
          reminder_time: "2023-09-18 09:30 AM",
          assigned_by: [],
          due_date: "2023-09-25",
          createdAt: "2023-09-11T10:15:00Z",
          updatedAt: "2023-09-12T11:45:00Z",
        },
      ],
    },
    {
      first_name: "Eva",
      last_name: "Smith",
      role: "Tester",
      email: "eva@example.com",
      tasks: [
        {
          id: 3,
          title: "Task 3",
          description: "This is task 3 description.",
          priority: "Low",
          status: "Complete",
          task_assignment: [],
          reminder_time: "2023-09-14 03:45 PM",
          assigned_by: [],
          due_date: "2023-09-15",
          createdAt: "2023-09-09T14:45:00Z",
          updatedAt: "2023-09-10T09:30:00Z",
        },
      ],
    },
  ];
  
  

describe('TaskList', () => {


    beforeEach(()=> {
        (getAllEmployees as jest.Mock).mockResolvedValue(dummyEmployees)//

    })
    describe('reading task', () => {

        it('renders the page', async() => {
    
            render(
                
                <TaskList tasks={dummyTasks} onTaskEdited={handleTaskEdited} onTaskDeleted={handleTaskDeleted}/>
            
            );
        //await
       
        const EditButtonArray = await screen.findAllByTestId('Edit');//waits until the useeffect is done then run this
       const DeleteButtonArray = screen.getAllByTestId('Delete');
       const AssignButtonArray = screen.getAllByTestId('Assign');

        //assertions
        expect(EditButtonArray.length).toEqual(4);//assertion
        expect(DeleteButtonArray.length).toEqual(4);//assertion
        expect(AssignButtonArray.length).toEqual(4);//assertion
        })
    })

   
})






