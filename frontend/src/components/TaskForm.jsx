import { useEffect, useState } from "react";

import {
    getCategories
} from "../services/categoryService";

const TaskForm = ({
    onSubmit,
    editingTask,
    cancelEdit
}) => {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [status, setStatus] = useState("pending");

    const [categoryId, setCategoryId] = useState("");

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const data = await getCategories();

                setCategories(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchCategories();

    }, []);

    useEffect(() => {

        if(editingTask){

            setTitle(editingTask.title);

            setDescription(
                editingTask.description || ""
            );

            setStatus(editingTask.status);

            setCategoryId(
                editingTask.category_id || ""
            );

        }

    }, [editingTask]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if(!title.trim()){

            return alert("Title is required");

        }

        onSubmit({
            title,
            description,
            status,
            category_id: categoryId || null
        });

        setTitle("");

        setDescription("");

        setStatus("pending");

        setCategoryId("");

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 mb-10"
        >

            <div className="flex items-center justify-between mb-5">

                <h2 className="text-2xl font-bold text-slate-800">

                    {
                        editingTask
                        ? "Editar Tarea"
                        : "Crear Tarea"
                    }

                </h2>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                <input
                    type="text"
                    placeholder="Titulo tarea"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-800"
                />

                <input
                    type="text"
                    placeholder="Descripcion"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-800"
                />

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                    className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-800"
                >

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

                <select
                    value={categoryId}
                    onChange={(e) =>
                        setCategoryId(e.target.value)
                    }
                    className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-800"
                >

                    <option value="">
                        Seleccionar Categoria
                    </option>

                    {
                        categories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))
                    }

                </select>

            </div>

            <div className="flex gap-3 mt-5">

                <button
                    className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl transition"
                >

                    {
                        editingTask
                        ? "Actualizar Tarea"
                        : "Crear Tarea"
                    }

                </button>

                {
                    editingTask && (

                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="bg-slate-300 hover:bg-slate-400 px-6 py-3 rounded-xl transition"
                        >
                            Cancel
                        </button>

                    )
                }

            </div>

        </form>

    );

};

export default TaskForm;