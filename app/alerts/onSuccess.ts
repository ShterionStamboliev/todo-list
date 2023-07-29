import { toast } from 'react-toastify'

export const runSuccessfulRegistration = () => {
    toast('Registration successful', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
        position: 'top-center'
    })
}

export const runPasswordError = () => {
    toast('Passwords don\'t match', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'top-center'
    })
}

export const runEmptyFieldError = () => {
    toast('Input fields should not be empty', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'top-center'
    })
}

export const runSuccessfulLogin = () => {
    toast('Login successful', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
        position: 'top-center'
    })
}

export const runInvalidInputData = () => {
    toast('Invalid email or password', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'top-center'
    })
}

export const runSignOutAlert = () => {
    toast('Logout successful', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
        position: 'top-center'
    })
}

export const runTodoDeleteSuccess = () => {
    toast('Todo deleted successfully', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
        position: 'top-center'
    })
}