import React, { useState } from "react"
import useValidations from "../hooks/useValidation";
interface Todo {
    id: string,
    todo: string,
    user: string
}
const intialState = {
    id: '',
    todo: '',
    user: ''
}

const validationRules = {
    todo: [
        { test: (value: string) => value.trim() != '', message: 'Todo is required' }
    ],
    user: [
        { test: (value: string) => value.trim() != '', message: 'User is required' }
    ]
}
const Todo = () => {
    const [formData, setFormData] = useState<Todo>(intialState);
    const [todo, setTodo] = useState<Todo[]>([]);
    const { setFieldRef, validateField, validateForm, errors } = useValidations(validationRules);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        validateField(name, value);
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValid = validateForm({
            todo: formData.todo,
            user: formData.user
        });
        if (!isValid) {
            return;
        }
        let updatedTodo = [...todo];
        updatedTodo.push(formData)
        setTodo(updatedTodo)
    }
    return (
        <>
            <form onSubmit={handleSubmit} >
                <input
                    placeholder="Enter Todo..."
                    name='todo'
                    value={formData.todo}
                    ref={(el) => setFieldRef("country", el)}
                    onChange={(event) => handleChange(event)}
                />
                {errors.todo && <p>{errors.todo}</p>}
                <input
                    placeholder="Enter Assignee..."
                    name='user'
                    value={formData.user}
                    ref={(el) => setFieldRef("user", el)}
                    onChange={(event) => handleChange(event)}
                />
                {errors.user && <p>{errors.user}</p>}
                <button>Add</button>
            </form>
            <div>
                <ul>
                    {
                        todo.map((item) => {
                            return (
                                <>
                                    <li>{item.todo}</li>
                                    <li>{item.user}</li>
                                    <hr />
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Todo