import imagen from "../assets/logo.png";

const Navbar = () => {
    return (
        <header className="bg-slate-950 text-white shadow-lg border-b border-slate-800">

            <div className="w-full px-6 py-5 flex items-center justify-between">
 
                <div className="flex items-center gap-3">

                    <img
                        src={imagen}
                        alt="logo"
                        className="w-60 h-25 rounded-xl object-cover"
                    />

               

                </div>

                {/* STATUS */}
                <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-300">Live</span>
                </div>

            </div>

        </header>
    );
};

export default Navbar;