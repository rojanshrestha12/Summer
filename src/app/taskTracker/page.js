"use client";
import { useState } from 'react';

export default function TaskTracker() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const createTask = () => {
        console.log("Task created");
        const newTaskObj = {
            id: tasks.length + 1,
            title: newTask,
        };
        setTasks([...tasks, newTaskObj]);
        setNewTask('');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-4">Task Tracker</h1>
    
            <input
                type="text"
                placeholder="Add a new task"
                className="mt-4 p-2 border border-gray-300 rounded w-full max-w-md"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={createTask}
            >
                Add Task
            </button>
            
            <ul className="mt-4 w-full max-w-md">
                {tasks.map((task) => (
                    <li key={task.id} className="p-2 border-b">{task.title}</li>
                ))}
            </ul>
        </div>
    );
}
