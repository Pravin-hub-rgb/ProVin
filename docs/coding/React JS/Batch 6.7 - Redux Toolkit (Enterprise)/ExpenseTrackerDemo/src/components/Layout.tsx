import { useEffect } from "react";
import { NavLink, Outlet } from "react-router";
import { fetchRate } from "../rtk/rateSlice";
import { useAppDispatch } from "../rtk/hooks";

export default function Layout() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchRate());
    }, []);
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg min-h-screen">
            <nav className="flex gap-3 border-b border-slate-200 pb-4 mb-6">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "text-emerald-600 border-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md text-xs font-medium border block"
                            : "text-slate-500 border-transparent hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium border block transition-colors"
                    }
                    to="/"
                >
                    Expenses
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "text-emerald-600 border-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md text-xs font-medium border block"
                            : "text-slate-500 border-transparent hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium border block transition-colors"
                    }
                    to="/category"
                >
                    Categories
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "text-emerald-600 border-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md text-xs font-medium border block"
                            : "text-slate-500 border-transparent hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium border block transition-colors"
                    }
                    to="/summary"
                >
                    Summary
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}