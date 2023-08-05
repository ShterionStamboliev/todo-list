import AddTodo from '../components/Navigation/Todos'
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'My todos'
};

const AddTodoPage: React.FC<TodoProps> = () => {

    return (
        <AddTodo />
    )
}

export default AddTodoPage