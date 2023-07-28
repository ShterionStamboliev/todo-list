import { FunctionComponent } from 'react'
import AddTodo from '../components/Navigation/Todos'
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'My todos'
};

const AddTodoPage: FunctionComponent = () => {

    return (
        <AddTodo />
    )
}

export default AddTodoPage