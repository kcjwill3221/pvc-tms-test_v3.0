import {render,screen,within} from '@testing-library/react'//commands imported form the testing library
import EmployeesPage from '@/app/employees/page'
import userEvent from '@testing-library/user-event'
import EmployeeList from '@/app/employees/employeeList'
import { getAllEmployees } from '@/lib/employeesHelper'
import { editTask } from '@/lib/tasksHelper'

//mock function for handleEmployeeEdited
const handleEmployeeEdited = jest.fn()
//mock function for handleEmployeeDeleted
const handleEmployeeDeleted = jest.fn()

//-------------------------------------------

//Can not export the interface button from employeeList.tsx due to no code changes
//this breaks the DRY(dont repeat yourself) concept to mock edit button
interface IEmployeeEditButtonProps {
    editingEmployee: IEmployee,
    onEmployeeEdited: () => Promise<void>;
}

//Created a mock function for editbutton
const EditButtonProps = jest.fn()
//mocking the edit button component using jest.mock
jest.mock('../../app/employees/editbutton', ()=>{
    //defining mock version of the Edit bitton that matches the expected props 
    const MockEditButton= (props:IEmployeeEditButtonProps)=>{
        //call the EditButtonProps mock function with the received props
        EditButtonProps(props)
        //returned a div containing the button that simulates the editbutton component
        return <div data-testid='Edit'>
            <button onClick={props.onEmployeeEdited}>Edit</button>
        </div>
    }
    //returning the mock version of the EdithButton component
    return MockEditButton;
})

//-------------------------------------------------------------------------------------//
//Delete Button

//Interface for props deleting button
interface IEmployeeDeleteButtonProps {
    employeeProp: IEmployee,//object that represent employuee data
    onEmployeeDeleted: () => Promise<void>;//function for handleing employee deletion
}

//Created a mock function for DeleteButton
const DeleteButtonProps = jest.fn()
//mocking the delete button component using jest.mock
jest.mock('../../app/employees/deletebutton', ()=>{
    const MockDeleteButton= (props:IEmployeeDeleteButtonProps)=>{
        DeleteButtonProps(props)
        return <div data-testid='Delete'>
            <button onClick={props.onEmployeeDeleted}>Delete</button>
        </div>
    }
    return MockDeleteButton;
})

//-------------------------------------------------------------------------------------//


interface IEmployeeProps {
    employees: IEmployee[],
    onEmployeeEdited: () => Promise<void>;
    onEmployeeDeleted: () => Promise<void>;
}


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
      first_name: "Lucas",
      last_name: "bravo",
      role: "tester",
      email: "lucas@example.com",
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
      first_name: "Jerin",
      last_name: "williams",
      role: "developer",
      email: "jerin@example.com",
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
      first_name: "Tarell",
      last_name: "M",
      role: "Developer",
      email: "Tarell@example.com",
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
  


    describe('reading Employees', () => {

        it('renders the page', async() => {
    
            render(
                
                <EmployeeList employees={dummyEmployees} onEmployeeEdited={handleEmployeeEdited} onEmployeeDeleted={handleEmployeeDeleted}/>
                
            );
            const user=userEvent.setup();//need this to perform on click tests
        //await
       //saving the HTML names into  each consts 
       const FirstUser= screen.getByText('Lucas bravo');
       const SecondUser= screen.getByText("Jerin williams");
       const ThirdUser = screen.getByText('Tarell M');

       const DeleteButtonArray = screen.getAllByTestId('Delete');
        const EditButtonArray = screen.getAllByTestId('Edit');


        //assertions for reading the 3 Users that I have from 
        expect(FirstUser).toBeInTheDocument();
        expect(SecondUser).toBeInTheDocument();
        expect(ThirdUser).toBeInTheDocument();

        //edit button array should be 3 for 3 users
        expect(EditButtonArray.length).toEqual(3);
        //delete button array should be 3 for 3 users
        expect(DeleteButtonArray.length).toEqual(3);

        

        
        })
    })

   







