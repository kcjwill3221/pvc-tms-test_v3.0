import {render,screen} from '@testing-library/react'//commands imported form the testeing library
import CreateEmployee from '@/app/employees/createemployee' //imported from page.tsx
import { getAllEmployees } from "@/lib/employeesHelper";//to mock getAllEmployees
import userEvent from '@testing-library/user-event'
import EmployeesPage from '@/app/employees/page';



//mocked the user button from clerk 
jest.mock('@clerk/nextjs',()=>{
    return{
        UserButton:()=>(
            <button data-testid="user-button"> logout </button>
        )
    
    }
    })

//CREATE EMPLOYEE 
//as I cannot modify current code in createemployee.tsx the below information was pasted from there
interface CreateEmployeeProps {
    onEmployeeCreated: () => Promise<void>;
};

//edit this to handle the extra prop  onEmployeeCreated={handleEmployeeCreated}
//mock Employee created
const createEmployeeProps = jest.fn()
jest.mock('../../app/employees/createemployee', ()=>{
    const MockCreateEmployee= (props:CreateEmployeeProps)=>{
        createEmployeeProps(props)
        return <div data-testid='Create Employee'>
            <button onClick={props.onEmployeeCreated}>Create Employee</button>
        </div>
    }
    return MockCreateEmployee;
})

//EMPLOYEELIST 
//as I cannot modify current code in taskList.tsx the below information was pasted .
interface IEmployeeProps {
    employees: IEmployee[],
    onEmployeeEdited: () => Promise<void>;
    onEmployeeDeleted: () => Promise<void>;
}

const employeeListProps = jest.fn()
//mock task list 
jest.mock('../../app/employees/employeeList',()=>{
    const MockEmployeeList=(props:IEmployeeProps)=>{
        employeeListProps(props)
        return <div data-testid='Employee list'>
            <button onClick={props.onEmployeeEdited} >Edit</button>
            <button onClick={props.onEmployeeDeleted}>Delete</button>
        </div>

    }

        return MockEmployeeList;

})



//mock getAllTEmployees API request
jest.mock('../../lib/employeesHelper')

describe('Employees page test', () => {

    it('renders the page', async() => {
        //arrange
        //act
        //suspense waits for the children components to render first.
        //while doing this , we tell jest not to call the DB, when you detect, just return list string
        //overwritting getallEmployees data.
        const dummyApiResult: IEmployee[] = [
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

        (getAllEmployees as jest.Mock).mockResolvedValue(dummyApiResult)//mockResolvedValue, only works if it has an await like  line 6 from page.tsx : const taskList = await getAllTasks();
        const user=userEvent.setup();
        
    
        render(
            
            <EmployeesPage />
        
        );
        
        //await before screen, will be used because of useEffect and add the find word instead of get
        const headerText = await screen.findByText(/employees/i); //find the text task and storing it into the variblae header text
        //createing variable to get the testId from line 9
        const createEmployeeComponent = screen.getByTestId('Create Employee');
        //creating variable to get the testId from mock task list 
        const employeelistlist = screen.getByTestId('Employee list');



        //assert --expecting the header to be visible
        expect(headerText).toBeInTheDocument();
        //assertion for create task component 
       expect(createEmployeeComponent).toBeInTheDocument();
       
        expect(createEmployeeProps).toHaveBeenCalledWith({
            onEmployeeCreated: expect.any(Function)
        })
        //assertion for Tasklist 
        expect(employeelistlist).toBeInTheDocument();
        //ensure that task list props and its being called (from )
        expect(employeeListProps).toHaveBeenCalledWith({
            employees: dummyApiResult,
            onEmployeeEdited: expect.any(Function),
            onEmployeeDeleted: expect.any(Function),
        });
        /*--------------------------------------------------------------------------------*/
        // User Click Tests!! on create Employee Button.// Title text inside the element 
        const buttonFromCreateEmployee = screen.getByRole('button', {
            name:  'Create Employee'
        } )
        //checking that crate Tasks button is present 
        expect(buttonFromCreateEmployee).toBeInTheDocument();
        //on click test
        user.click(buttonFromCreateEmployee)
        //were expecting getalltask to be called whenever the user calls toget taskbutton.
        expect(getAllEmployees).toHaveBeenCalled();
        /*--------------------------------------------------------------------------------*/



        
        // User Click Tests!! on Edit Button.
        const buttonFromEditEmployees = screen.getByRole('button', {
            name:  'Edit'
        } )
        //checking that Edit  button is present 
        expect(buttonFromEditEmployees).toBeInTheDocument();
        //on click test
        user.click(buttonFromEditEmployees)
        //were expecting getallEmployees to be called whenever the user calls toget Edit button.
        expect(getAllEmployees).toHaveBeenCalled();
        /*--------------------------------------------------------------------------------*/

        // User Click Tests!! on Delete Button.
        const buttonFromDeleteEmployees = screen.getByRole('button', {
            name:  'Delete'
        } )
        //checking that Delete s button is present 
        expect(buttonFromDeleteEmployees).toBeInTheDocument();
        //on click test
        user.click(buttonFromDeleteEmployees)
        //were expecting getalltask to be called whenever the user calls toget taskbutton.
        expect(getAllEmployees).toHaveBeenCalled();
        /*--------------------------------------------------------------------------------*/

        //testing the the userbutton from clerk is in the page itself
        const buttonFromSignOut = screen.getByRole('button', {
            name:  'logout'
        } )
        //checking that crate Tasks button is present 
        expect(buttonFromSignOut).toBeInTheDocument();

    })

})