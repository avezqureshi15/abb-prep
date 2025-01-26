import React, { useState } from 'react'

const Todo = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [id, setId] = useState('');
    const [edit, setEdit] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            setTasks((prev) =>
                prev.map((item, index) =>
                    item.id === id ? { ...item, task } : item
                )
            )
        } else {
            setTasks((prev) => [...prev, { id: Date.now(), task }]);
            setTask('')
        }
    }
    const handleEdit = (item) => {
        setEdit(true);
        setTask(item.task)
        setId(item.id);
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type='submit' >Submit</button>
            </form>
            <ul>
                {
                    tasks.map((item, index) => {
                        return (
                            <>
                                <li key={index} >{item.task}</li>
                                <button onClick={() => handleEdit(item)} >Edit</button>
                            </>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Todo