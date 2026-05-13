import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../services/taskService";

const Home = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {

        try {

            const data = await getTasks();

            setTasks(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTasks();

    }, []);

    const handleCreateTask = async (taskData) => {

        try {

            if(editingTask){

                await updateTask(
                    editingTask.id,
                    taskData
                );

                setEditingTask(null);

            } else {

                await createTask(taskData);

            }

            fetchTasks();

        } catch (error) {

            console.log(error);

        }

    };

    const handleDeleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if(!confirmDelete){

            return;

        }

        try {

            await deleteTask(id);

            fetchTasks();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="mb-10">

                    <h2 className="text-4xl font-bold text-slate-800">
                        Tasks Dashboard
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Manage your development workflow
                    </p>

                </div>

                <TaskForm
                    onSubmit={handleCreateTask}
                    editingTask={editingTask}
                    cancelEdit={() => setEditingTask(null)}
                />

                {
                    loading
                    ? (
                        <div className="flex justify-center py-20">

                            <div className="w-14 h-14 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>

                        </div>
                    )
                    : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {
                                tasks.map((task) => (

                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onDelete={handleDeleteTask}
                                        onEdit={setEditingTask}
                                    />

                                ))
                            }

                        </div>
                    )
                }

            </main>

        </div>

    );

};

export default Home;