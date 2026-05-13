import { useEffect, useState } from "react";

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

        <div>

            <Navbar />

            <main className="container">

                <h2>Task List</h2>

                {
                    loading
                    ? (
                        <p>Loading tasks...</p>
                    )
                    : (
                        <div className="task-container">

                            {
                                tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
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