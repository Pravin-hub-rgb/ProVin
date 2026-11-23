import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { addExpense, deleteExpense, setFilter } from "../rtk/expensesSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema, type ExpenseFormValues } from "../validations/expenseSchema";
import { fetchRate } from "../rtk/rateSlice";


export default function ExpensesPage() {
    const categories = useAppSelector((state) => state.categories)
    const expenses = useAppSelector((state) => state.expenses.items)
    const selectedCategory = useAppSelector((state) => state.expenses.filter)
    const dispatch = useAppDispatch();
    const { rate, status } = useAppSelector((state) => state.rate)

    const filteredExpense = expenses.filter((expense) => (selectedCategory === "All" || expense.category === selectedCategory));

    const totalAmount = filteredExpense.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            title: "",
            amount: "",
            category: "",
        },
    });

    const onSubmit = (data: ExpenseFormValues) => {
        dispatch(
            addExpense({
                id: crypto.randomUUID(),
                date: new Date().toISOString(),
                title: data.title,
                amount: Number(data.amount),
                category: data.category,
            })
        );
        reset();
    };

    let rateText: string;

    if (status === "loading") {
        rateText = "Fetching rate…";
    } else if (status === "failed" || rate === null) {
        rateText = "N/A";
    } else {
        rateText = `1 USD = ₹${rate.toFixed(2)}`;
    }

    const rupeeTotal = rate === null ? "N/A" : `₹${(totalAmount * rate).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

    return (
        <div className="bg-slate-50 min-h-screen p-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 max-w-2xl mx-auto">

                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-slate-500 text-xs mb-1">Total</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-medium">
                                ${totalAmount.toFixed(2)}
                            </span>
                            <span className="text-slate-500 text-sm">{rupeeTotal}</span>
                        </div>
                    </div>
                    <div className="text-right text-xs text-slate-500 flex items-baseline gap-2">{rateText} {status === "failed" && (
                        <button
                            onClick={() => dispatch(fetchRate())}
                            className="px-2 py-1 rounded border border-slate-300 bg-white text-slate-600 text-xs hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer"
                        >
                            Retry
                        </button>
                    )}</div>
                </div>

                <div className="flex gap-2 mb-4 flex-wrap">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            placeholder="Title, e.g. Bus fare"
                            className="flex-1 px-3 py-2 border border-slate-300 rounded bg-white text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            {...register('title')}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                        <input
                            type="number"
                            placeholder="Amount ($)"
                            className="px-3 py-2 border border-slate-300 rounded bg-white text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            {...register('amount')}
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                        )}
                        <select
                            className="px-3 py-2 border border-slate-300 rounded bg-white text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            {...register('category')}
                        >
                            <option value="">Category ▾</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                        )}
                        <button type="submit"
                            className="flex-shrink-0 border border-slate-200 rounded cursor-pointer ml-1 px-4 py-2 text-sm bg-slate-100 text-slate-700 whitespace-nowrap">Add</button>
                    </form>
                </div>

                <p className="text-slate-400 text-xs -mt-2 mb-4">Inline error under form: empty title, or amount not above 0</p>

                <div className="flex gap-2 flex-wrap mb-3">
                    {["All", ...categories].map((cat) => (
                        <button
                            key={cat}
                            className={`px-3 py-1 rounded-full text-xs cursor-pointer ${selectedCategory === cat ? "bg-emerald-600 text-white border-none" : "border border-slate-300 text-slate-500"}`}
                            onClick={() => dispatch(setFilter(cat))}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    {filteredExpense.length === 0 ? (
                        <p>
                            {expenses.length === 0
                                ? "No expenses yet. Add one above."
                                : `No ${selectedCategory} expenses.`}
                        </p>
                    ) : (
                        filteredExpense.map((exp) => (
                            <div key={exp.id} className="flex items-center justify-between gap-3 p-3 border border-slate-200 rounded bg-slate-50 mb-2">
                                <div>
                                    <div className="text-slate-500 text-xs">{exp.category}</div>
                                    <div className="font-medium text-sm">{exp.title}</div>
                                    <div className="text-slate-500 text-xs">{new Date(exp.date).toLocaleString([], { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-sm">${exp.amount}</div>
                                </div>
                                <button className="flex-shrink-0 border border-slate-200 rounded px-4 py-2 text-sm bg-slate-100 text-slate-700 whitespace-nowrap" onClick={() => dispatch(deleteExpense(exp.id))}>Delete</button>
                            </div>
                        ))
                    )}
                </div>
                <p className="text-slate-400 text-xs mt-2">Empty state: "No expenses for Food. Add one above." · Newest first</p>
            </div>
        </div>
    )
}