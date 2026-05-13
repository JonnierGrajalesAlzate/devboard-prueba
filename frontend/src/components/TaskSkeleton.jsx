const TaskSkeleton = () => {

    return (

        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 animate-pulse">

            <div className="flex items-start justify-between mb-6">

                <div className="h-6 w-40 bg-slate-200 rounded-lg"></div>

                <div className="h-6 w-20 bg-slate-200 rounded-full"></div>

            </div>

            <div className="space-y-3 mb-6">

                <div className="h-4 bg-slate-200 rounded"></div>

                <div className="h-4 bg-slate-200 rounded w-5/6"></div>

            </div>

            <div className="mb-6">

                <div className="h-8 w-28 bg-slate-200 rounded-full"></div>

            </div>

            <div className="h-12 bg-slate-200 rounded-xl mb-5"></div>

            <div className="flex gap-3">

                <div className="flex-1 h-10 bg-slate-200 rounded-xl"></div>

                <div className="flex-1 h-10 bg-slate-200 rounded-xl"></div>

            </div>

        </div>

    );

};

export default TaskSkeleton;