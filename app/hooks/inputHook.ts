import { useState } from "react";

export const inputData = () => {
    const [value, setValue] = useState({
        initialValue: ''
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    return [value];
};