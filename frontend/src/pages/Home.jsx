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

    const [filteredTasks, setFilteredTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingTask, setEditingTask] = useState(null);

    const [filter, setFilter] = useState("all");

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const tasksPerPage = 10;

    const fetchTasks = async () => {

        try {

            const data = await getTasks();

            setTasks(data);

            setFilteredTasks(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTasks();

    }, []);

    useEffect(() => {

        const debounce = setTimeout(() => {

            let updatedTasks = [...tasks];

            if(filter !== "all"){

                updatedTasks = updatedTasks.filter(
                    (task) =>
                        task.status === filter
                );

            }

            if(search.trim()){

                updatedTasks = updatedTasks.filter(
                    (task) =>
                        task.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                );

            }

            setCurrentPage(1);

            setFilteredTasks(updatedTasks);

        }, 300);

        return () => clearTimeout(debounce);

    }, [search, filter, tasks]);

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

    const handleStatusChange = async (
        task,
        newStatus
    ) => {

        try {

            await updateTask(
                task.id,
                {
                    ...task,
                    status: newStatus
                }
            );

            fetchTasks();

        } catch (error) {

            console.log(error);

        }

    };

    const lastTaskIndex =
        currentPage * tasksPerPage;

    const firstTaskIndex =
        lastTaskIndex - tasksPerPage;

    const currentTasks =
        filteredTasks.slice(
            firstTaskIndex,
            lastTaskIndex
        );

    const totalPages = Math.ceil(
        filteredTasks.length / tasksPerPage
    );

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

                    <div>

                        <h2 className="text-4xl font-bold text-slate-800">
                            Bienvenido al miniGestor de proyectos y tareas
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Organiza tu flujo de trabajo de manera eficiente.
                        </p>

                    </div>

                    <div className="bg-white px-6 py-4 rounded-2xl shadow-md border border-slate-200">

                        <p className="text-slate-500 text-sm">
                            #Tareas
                        </p>

                        <h3 className="text-3xl font-bold text-slate-800">
                            {filteredTasks.length}
                        </h3>

                    </div>

                </div>

                <TaskForm
                    onSubmit={handleCreateTask}
                    editingTask={editingTask}
                    cancelEdit={() =>
                        setEditingTask(null)
                    }
                />

                <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 mb-10 flex flex-col md:flex-row gap-4">

                    <input
                        type="text"
                        placeholder="Buscar tarea..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-800"
                    />

                    <select
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value)
                        }
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-800"
                    >

                        <option value="all">
                            todos
                        </option>

                        <option value="pending">
                            Pendiente
                        </option>

                        <option value="in_progress">
                            En proceso
                        </option>

                        <option value="completed">
                            Completado
                        </option>

                    </select>

                </div>

                {
                    loading
                    ? (
                        <div className="flex justify-center py-20">

                            <div className="w-14 h-14 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>

                        </div>
                    )
                    : (
                        <>
                        
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                {
                                    currentTasks.map((task) => (

                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onDelete={handleDeleteTask}
                                            onEdit={setEditingTask}
                                            onStatusChange={handleStatusChange}
                                        />

                                    ))
                                }

                            </div>

                            <div className="flex justify-center items-center gap-4 mt-10">

                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className="bg-slate-900 text-white px-5 py-2 rounded-xl disabled:opacity-50"
                                >
                                    Prev
                                </button>

                                <span className="font-medium text-slate-700">

                                    Page {currentPage} of {totalPages}

                                </span>

                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="bg-slate-900 text-white px-5 py-2 rounded-xl disabled:opacity-50"
                                >
                                    Next
                                </button>

                            </div>

                        </>
                    )
                }

            </main>

        </div>

    );

};


export default Home;