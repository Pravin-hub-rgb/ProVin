import { useAppSelector } from "../rtk/hooks";

export default function Summary() {
    const expenses = useAppSelector((state) => state.expenses.items);
    const categories = useAppSelector((state) => state.categories);
    const { rate } = useAppSelector((state) => state.rate);
    const rows = categories.map((name) => {
        const total = expenses
            .filter((e) => e.category.toLowerCase() === name.toLowerCase())
            .reduce((sum, e) => sum + e.amount, 0);
        return { name, total };
    });
    const visibleRows = rows.filter((row) => row.total > 0);
    const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);
    return (
        <div className="bg-slate-50 min-h-screen p-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold text-slate-800 mb-4">Summary</h1>
                <ul className="divide-y divide-slate-200">
                    {visibleRows.length === 0 && (
                        <li className="py-3 text-sm text-slate-400 italic">
                            No expenses yet.
                        </li>
                    )}
                    {visibleRows.map((row) => (
                        <li key={row.name} className="py-3 flex justify-between text-sm">
                            <span className="text-slate-700">{row.name}</span>
                            <span className="font-medium text-slate-900">${row.total.toFixed(2)}</span>
                            <span className="text-slate-500">
                                {rate === null
                                    ? "N/A"
                                    : `₹${(row.total * rate).toLocaleString("en-IN", {
                                        maximumFractionDigits: 0,
                                    })}`}
                            </span>
                        </li>
                    ))}
                    <li className="py-3 flex justify-between text-sm font-bold border-t border-slate-200 mt-2 pt-3">
                        <span className="text-slate-700">Total</span>
                        <span className="font-medium text-slate-900">${grandTotal.toFixed(2)}</span>
                        <span className="text-slate-500">
                            {rate === null
                                ? "N/A"
                                : `₹${(grandTotal * rate).toLocaleString("en-IN", {
                                    maximumFractionDigits: 0,
                                })}`}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}