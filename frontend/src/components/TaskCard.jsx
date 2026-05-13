import "../index.css";

const TaskCard = ({ task }) => {

    const statusColors = {
        pending: "bg-yellow-500/10 text-yellow-600 border-yellow-300",
        in_progress: "bg-blue-500/10 text-blue-600 border-blue-300",
        completed: "bg-green-500/10 text-green-600 border-green-300"
    };

    return (
        <div className="w-full max-w-5xl bg-white rounded-2xl p-6 shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300">

            <div className="flex items-start justify-between mb-4">

                <h3 className="text-xl font-bold text-slate-800">
                    {task.title}
                </h3>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[task.status]}`}>
                    {task.status.replace("_", " ")}
                </span>

            </div>

            <p className="text-slate-600 mb-6">
                {task.description}
            </p>

            <div className="flex justify-between text-sm text-slate-400 border-t pt-4 border-slate-100">

                <span>#{task.id}</span>
                <span>{new Date(task.created_at).toLocaleDateString()}</span>

            </div>

        </div>
    );
};

export default TaskCard;