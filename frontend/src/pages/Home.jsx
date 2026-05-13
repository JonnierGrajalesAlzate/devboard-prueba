import { useEffect, useState } from "react";
import "../index.css";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { getTasks } from "../services/taskService";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <main className="w-full px-6 py-10">

                {/* HEADER */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">
                        MiniGestor de proyectos y tareas
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Manage your tasks in real time
                    </p>
                </div>

                {/* LOADING */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    /* TASKS CENTRADAS */
                    <div className="flex flex-col w-full items-center">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="w-full flex justify-center mb-6"
                            >
                                <TaskCard task={task} />
                            </div>
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
};

export default Home;