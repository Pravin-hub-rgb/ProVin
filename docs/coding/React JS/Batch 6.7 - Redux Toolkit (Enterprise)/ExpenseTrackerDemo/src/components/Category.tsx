import { useForm } from "react-hook-form"
import { makeCategorySchema, type CategoryFormValues } from "../validations/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { addCategory } from "../rtk/categoriesSlice";
import { useMemo } from "react";



export default function Category() {
    const categories = useAppSelector((state) => state.categories);
    const schema = useMemo(() => makeCategorySchema(categories), [categories]);
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: ""
        },
    });
    const onSubmit = (data: CategoryFormValues) => {

        dispatch(addCategory(data.name))
        reset();
    }
    return (
        <div className="bg-slate-50 min-h-screen p-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <h2 className="text-xl font-bold text-slate-800">Add Category</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="e.g. Food, Transport"
                        className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400 mb-3"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1 mb-3">{errors.name.message}</p>
                    )}
                    <button type="submit" className="w-full px-4 py-2 border border-emerald-600 bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:bg-emerald-200 disabled:text-slate-400 disabled:cursor-not-allowed">
                        Add Category
                    </button>
                </form>
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Categories ({categories.length})</h3>
                    <ul className="space-y-2">
                        {categories.length === 0 ? (
                            <li className="px-3 py-2 text-slate-400 text-sm italic">No categories yet</li>
                        ) : (
                            categories.map((c) => (
                                <li key={c} className="flex items-center justify-between px-3 py-2 border border-slate-200 rounded bg-slate-50 text-slate-700">
                                    <span>{c}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}