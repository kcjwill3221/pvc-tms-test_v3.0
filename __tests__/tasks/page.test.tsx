
import {render,screen} from '@testing-library/react'//commands imported form the testeing library
import TasksPage from '@/app/tasks/page' //imported from page.tsx
import { getAllTasks } from "@/lib/tasksHelper";//to mock getAllTasks
import userEvent from '@testing-library/user-event'


//as I cannot modify current code in createtask.tsx the below information was pasted from there
interface CreateTaskProps  {
    onTaskCreated: () => Promise<void>;
};

//edit this to handle the extra prop onTaskCreated={handleTaskCreated}!!!!!!!!!!!!!
//mock create task _cloning
const createTaskProps = jest.fn()//new variable create task props
jest.mock('../../app/tasks/createtask', ()=>{
    const MockCreateTask= (props:CreateTaskProps)=>{
        createTaskProps(props)
        return <div data-testid='Create-Task'>
            <button onClick={props.onTaskCreated}>Create Task</button>
        </div>
    }
    return MockCreateTask;
})


//as I cannot modify current code in taskList.tsx the below information was pasted .
interface ITaskProps {
    tasks: ITask[],
    onTaskEdited: () => Promise<void>;
    onTaskDeleted: () => Promise<void>;
}

const taskListProps = jest.fn()
//mock task list 
jest.mock('../../app/tasks/taskList',()=>{
    const MockTaskList=(props:ITaskProps)=>{
        taskListProps(props)
        return <div data-testid='task-List'>
            <button onClick={props.onTaskEdited} >Edit</button>
            <button onClick={props.onTaskDeleted}>Delete</button>
        </div>

    }

        return MockTaskList;

})

//mocked the user button from clerk 
jest.mock('@clerk/nextjs',()=>{
return{
    UserButton:()=>(
        <button data-testid="user-button"> logout </button>
    )

}
})


//mock getAllTasks API request
jest.mock('../../lib/tasksHelper')

describe('task page test', () => {

    it('renders the page', async() => {
        //arrange
        //act
        //suspense waits for the children components to render first.
        //while doing this , we tell jest not to call the DB, when you detect, just return list string
        const apiResult = {//overwritting getalltasks data.
            data: 'listssss',
        };

        (getAllTasks as jest.Mock).mockResolvedValue(apiResult)//mockResolvedValue, only works if it has an await like  line 6 from page.tsx : const taskList = await getAllTasks();
        const user=userEvent.setup();
        
        //component needs to be encapsulted into a clerk provider
       /* render(
            <ClerkProvider>
            <TasksPage />
            </ClerkProvider>
        );
        */
        render(
            
            <TasksPage />
        
        );
        
        //await before screen, will be used because of useEffect and add the find word instead of get
        const headerText = await screen.findByText(/tasks/i); //find the text task and storing it into the variblae header text
        //createing variable to get the testId from line 9
        const createTaskComponent = screen.getByTestId('Create-Task');
        //creating variable to get the testId from mock task list 
        const tasklistlist = screen.getByTestId('task-List');
        //assert --expecting the header to be visible
        expect(headerText).toBeInTheDocument();
        //assertion for create task component 
       expect(createTaskComponent).toBeInTheDocument();
        expect(createTaskProps).toHaveBeenCalledWith({
            onTaskCreated: expect.any(Function)
        })
        //assertion for Tasklist 
        expect(tasklistlist).toBeInTheDocument();
        //ensure that task list props and its being called (from )
        expect(taskListProps).toHaveBeenCalledWith({
            tasks: apiResult,
            onTaskEdited: expect.any(Function),
            onTaskDeleted: expect.any(Function),
        });
        /*--------------------------------------------------------------------------------*/
        // User Click Tests!! on create Task Button.
        const buttonFromCreateTask = screen.getByRole('button', {
            name:  'Create Task'
        } )
        //checking that crate Tasks button is present 
        expect(buttonFromCreateTask).toBeInTheDocument();
        //on click test
        user.click(buttonFromCreateTask)
        //were expecting getalltask to be called whenever the user calls toget taskbutton.
        expect(getAllTasks).toHaveBeenCalled();
        /*--------------------------------------------------------------------------------*/

        // User Click Tests!! on Edit Button.
        const buttonFromEditTaks = screen.getByRole('button', {
            name:  'Edit'
        } )
        //checking that Edit  button is present 
        expect(buttonFromEditTaks).toBeInTheDocument();
        //on click test
        user.click(buttonFromEditTaks)
        //were expecting getalltask to be called whenever the user calls toget taskbutton.
        expect(getAllTasks).toHaveBeenCalled();
        /*--------------------------------------------------------------------------------*/

        // User Click Tests!! on Delete Button.
        const buttonFromDeleteTasks = screen.getByRole('button', {
            name:  'Delete'
        } )
        //checking that Delete s button is present 
        expect(buttonFromDeleteTasks).toBeInTheDocument();
        //on click test
        user.click(buttonFromDeleteTasks)
        //were expecting getalltask to be called whenever the user calls toget taskbutton.
        expect(getAllTasks).toHaveBeenCalled();
        /*--------------------------------------------------------------------------------*/

        //testing the the userbutton from clerk is in the page itself
        const buttonFromSignOut = screen.getByRole('button', {
            name:  'logout'
        } )
        //checking that crate Tasks button is present 
        expect(buttonFromSignOut).toBeInTheDocument();

    })

})