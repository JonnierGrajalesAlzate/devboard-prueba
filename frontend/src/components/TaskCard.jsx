const TaskCard = ({
    task,
    onDelete,
    onEdit
}) => {

    const statusColors = {
        pending: "bg-yellow-500",
        in_progress: "bg-blue-500",
        completed: "bg-green-500"
    };

    return (

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200">

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

            <div className="flex gap-3 mt-5">

                <button
                    onClick={() => onEdit(task)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                >
                    Delete
                </button>

            </div>

        </div>

    );

};

export default TaskCard;