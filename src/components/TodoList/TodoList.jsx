"use client";

import styles from "./TodoList.module.css"

import { useEffect, useState } from "react";

export default function TodoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Kör denna kod när komponenten laddas
    useEffect(() => {
        const savedTasksJson = localStorage.getItem("tasks");

        if (savedTasksJson) {
            const savedTasks = JSON.parse(savedTasksJson);
            setTasks(savedTasks);
        }
    }, [])

    const addTask = () => {
        if (newTask) {
            const taskToAdd = { id: Date.now(), text: newTask, completed: false }
            const updatedTasks = [...tasks];
            updatedTasks.push(taskToAdd);
            saveTasks(updatedTasks)
            setNewTask("")
        }
    }

    const saveTasks = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setTasks(tasks);
    }

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(t => t.id !== id);
        saveTasks(updatedTasks)
    }

    const completeTask = (id) => {
        const updatedTasks = tasks.map(t => {
            if (t.id === id) {
                return { ...t, completed: true }
            }
            return t;
        });

        saveTasks(updatedTasks)
    }

    return (<>

        <ul className={styles.todoList}>
            {tasks.map(t => (
                <li key={t.id}>
                    {t.completed === true ? "✅" : ""}

                    {t.text}

                    <button
                        type="button"
                        onClick={() => deleteTask(t.id)}
                        className={styles.taskButton}>🗑</button>


                    {t.completed === false ? <button
                        type="button"
                        onClick={() => completeTask(t.id)}
                        className={styles.taskButton}>✔</button> : ""}

                </li>
            ))}
        </ul>


        <h3>Add task</h3>

        <p>
            <label htmlFor="taskText">Add task: </label>
            <input
                type="text"
                name="taskText"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)} />
            <button type="button" onClick={addTask}>Save task</button>
        </p>
    </>)
}