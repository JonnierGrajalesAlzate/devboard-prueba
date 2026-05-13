const TaskCard = ({
    task,
    onDelete,
    onEdit,
    onStatusChange
}) => {

    const statusColors = {
        pending: "bg-yellow-500",
        in_progress: "bg-blue-500",
        completed: "bg-green-500"
    };

    return (

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:-translate-y-1">

            <div className="flex items-start justify-between mb-4">

                <h3 className="text-xl font-semibold text-slate-800">
                    {task.title}
                </h3>

                <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-medium ${statusColors[task.status]}`}
                >
                    {task.status}
                </span>

            </div>

            <p className="text-slate-600 mb-5">
                {task.description}
            </p>

            {
                task.category_name && (

                    <div className="mb-5">

                        <span
                            className="px-3 py-1 rounded-full text-white text-xs font-medium"
                            style={{
                                backgroundColor: task.category_color
                            }}
                        >
                            {task.category_name}
                        </span>

                    </div>

                )
            }

            <div className="mb-5">

                <select
                    value={task.status}
                    onChange={(e) =>
                        onStatusChange(
                            task,
                            e.target.value
                        )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-800"
                >

                    <option value="pending">
                        Pendiente
                    </option>

                    <option value="in_progress">
                        En Proceso
                    </option>

                    <option value="completed">
                        Completado
                    </option>

                </select>

            </div>

            <div className="flex gap-3">

                <button
                    onClick={() => onEdit(task)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
                >
                    Editar
                </button>

                <button
                    onClick={() => onDelete(task.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
                >
                    Eliminar
                </button>

            </div>

        </div>

    );

};

export default TaskCard;