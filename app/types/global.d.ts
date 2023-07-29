export {}

declare global {
    
    type TodoProps = {
        owner?: string;
        title: string;
        id?: number
    }

    // type InputProps = {
    //     text: string
    // }

    // type IProps = TodoProps & InputProps
}