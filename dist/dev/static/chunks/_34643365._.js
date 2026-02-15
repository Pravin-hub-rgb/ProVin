(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/markdown-viewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarkdownViewer",
    ()=>MarkdownViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-gfm/lib/index.js [app-client] (ecmascript)");
"use client";
;
;
;
function MarkdownViewer({ content, theme = 'light' }) {
    // Simple syntax highlighting without external dependencies
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "prose prose-lg dark:prose-invert max-w-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
            remarkPlugins: [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
            ],
            components: {
                code ({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "bg-muted/50 p-4 rounded-lg overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "text-sm",
                            ...props,
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/components/markdown-viewer.tsx",
                            lineNumber: 23,
                            columnNumber: 17
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 22,
                        columnNumber: 15
                    }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        className: "bg-muted/50 px-2 py-1 rounded text-sm",
                        ...props,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 28,
                        columnNumber: 15
                    }, void 0);
                },
                table ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "border border-border/50",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/components/markdown-viewer.tsx",
                            lineNumber: 36,
                            columnNumber: 17
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 35,
                        columnNumber: 15
                    }, void 0);
                },
                th ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                        className: "border-b border-border/50 px-4 py-2 text-left bg-muted/50 font-semibold",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 44,
                        columnNumber: 15
                    }, void 0);
                },
                td ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                        className: "border-b border-border/50 px-4 py-2",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 51,
                        columnNumber: 15
                    }, void 0);
                },
                h1 ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 dark:from-white dark:via-blue-100 dark:to-blue-300 bg-clip-text text-transparent",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 58,
                        columnNumber: 15
                    }, void 0);
                },
                h2 ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-foreground mb-3 mt-8",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 65,
                        columnNumber: 15
                    }, void 0);
                },
                h3 ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-semibold text-foreground mb-2 mt-6",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 72,
                        columnNumber: 15
                    }, void 0);
                },
                h4 ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-xl font-medium text-foreground mb-2 mt-4",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 79,
                        columnNumber: 15
                    }, void 0);
                },
                p ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-foreground/80 leading-relaxed mb-4",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 86,
                        columnNumber: 15
                    }, void 0);
                },
                ul ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "list-disc list-inside text-foreground/80 mb-4 space-y-1",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 93,
                        columnNumber: 15
                    }, void 0);
                },
                ol ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "list-decimal list-inside text-foreground/80 mb-4 space-y-1",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 100,
                        columnNumber: 15
                    }, void 0);
                },
                li ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "text-foreground/80",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 107,
                        columnNumber: 15
                    }, void 0);
                },
                blockquote ({ children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                        className: "border-l-4 border-primary/50 pl-4 py-2 bg-muted/30 rounded-r-lg my-4 italic",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 114,
                        columnNumber: 15
                    }, void 0);
                },
                a ({ href, children }) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: href,
                        className: "text-primary hover:text-primary/80 underline underline-offset-4",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/markdown-viewer.tsx",
                        lineNumber: 121,
                        columnNumber: 15
                    }, void 0);
                }
            },
            children: content
        }, void 0, false, {
            fileName: "[project]/components/markdown-viewer.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/markdown-viewer.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = MarkdownViewer;
var _c;
__turbopack_context__.k.register(_c, "MarkdownViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/lecture-viewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LectureViewer",
    ()=>LectureViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$markdown$2d$viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/markdown-viewer.tsx [app-client] (ecmascript)");
"use client";
;
;
function LectureViewer({ content, theme = 'light' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$markdown$2d$viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkdownViewer"], {
        content: content,
        theme: theme
    }, void 0, false, {
        fileName: "[project]/components/lecture-viewer.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = LectureViewer;
var _c;
__turbopack_context__.k.register(_c, "LectureViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/coding/page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "contentArea": "page-module__3DnRJG__contentArea",
  "isResizing": "page-module__3DnRJG__isResizing",
  "resizeHandle": "page-module__3DnRJG__resizeHandle",
  "resizing": "page-module__3DnRJG__resizing",
  "sidebar": "page-module__3DnRJG__sidebar",
  "transitionSmooth": "page-module__3DnRJG__transitionSmooth",
});
}),
"[project]/app/coding/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CodingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book.js [app-client] (ecmascript) <export default as Book>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$lecture$2d$viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/lecture-viewer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$coding$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/coding/page.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Simple markdown content loader
const loadMarkdownContent = async (filePath)=>{
    try {
        const response = await fetch(`/api/notes?file=${encodeURIComponent(filePath)}`);
        if (response.ok) {
            return await response.text();
        } else {
            return `# Error Loading Notes\n\nFailed to load: ${filePath}`;
        }
    } catch (error) {
        return `# Error Loading Notes\n\n${error instanceof Error ? error.message : 'Unknown error'}`;
    }
};
;
function CodingPage() {
    _s();
    const [sidebarWidth, setSidebarWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(300);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pythonOpen, setPythonOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedLecture, setSelectedLecture] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [markdownContent, setMarkdownContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Refs for performance optimization
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isUpdatingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const sidebarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Lecture data - manually configured
    const lectures = [
        {
            id: "lec1",
            title: "Lec 1 - Variables & Functions",
            path: "docs/coding/python/1 Lec variables & functions/notes.md"
        },
        {
            id: "lec2",
            title: "Lec 2 - Conditionals",
            path: "docs/coding/python/2 Lec/notes.md"
        },
        {
            id: "lec3",
            title: "Lec 3 - Loops",
            path: "docs/coding/python/3 Lec loops/notes.md"
        },
        {
            id: "lec4",
            title: "Lec 4 - Exceptions",
            path: "docs/coding/python/4 Lec Exceptions/notes.md"
        },
        {
            id: "lec5",
            title: "Lec 5 - Modules",
            path: "docs/coding/python/5 Lec Modules/notes.md"
        }
    ];
    // Optimized resize handler with requestAnimationFrame
    const handleResize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CodingPage.useCallback[handleResize]": (e)=>{
            if (!isResizing) return;
            const newWidth = e.clientX;
            const min = 251;
            const max = 600;
            // Clamp width to bounds
            const clampedWidth = Math.max(min, Math.min(max, newWidth));
            // Only update if width actually changed
            if (clampedWidth !== sidebarWidth) {
                // Use requestAnimationFrame for smooth 60fps updates
                if (!isUpdatingRef.current) {
                    isUpdatingRef.current = true;
                    rafRef.current = requestAnimationFrame({
                        "CodingPage.useCallback[handleResize]": ()=>{
                            setSidebarWidth(clampedWidth);
                            isUpdatingRef.current = false;
                        }
                    }["CodingPage.useCallback[handleResize]"]);
                }
            }
        }
    }["CodingPage.useCallback[handleResize]"], [
        isResizing,
        sidebarWidth
    ]);
    // Handle mouse events for resizing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodingPage.useEffect": ()=>{
            const handleMouseUp = {
                "CodingPage.useEffect.handleMouseUp": ()=>{
                    setIsResizing(false);
                    // Cancel any pending animation frame
                    if (rafRef.current) {
                        cancelAnimationFrame(rafRef.current);
                        rafRef.current = null;
                    }
                    isUpdatingRef.current = false;
                    // Remove body classes
                    document.body.classList.remove('resizing');
                }
            }["CodingPage.useEffect.handleMouseUp"];
            if (isResizing) {
                // Use passive: false for mousemove to allow preventDefault if needed
                document.addEventListener('mousemove', handleResize, {
                    passive: false
                });
                document.addEventListener('mouseup', handleMouseUp);
                // Add body classes for styling
                document.body.classList.add('resizing');
            }
            return ({
                "CodingPage.useEffect": ()=>{
                    document.removeEventListener('mousemove', handleResize);
                    document.removeEventListener('mouseup', handleMouseUp);
                    document.body.classList.remove('resizing');
                }
            })["CodingPage.useEffect"];
        }
    }["CodingPage.useEffect"], [
        isResizing,
        handleResize
    ]);
    // Handle keyboard accessibility for resizing
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CodingPage.useCallback[handleKeyDown]": (e)=>{
            if (e.target instanceof HTMLElement && e.target.tagName === 'INPUT') {
                return; // Don't interfere with text input
            }
            const step = e.shiftKey ? 20 : 5 // Shift for larger steps
            ;
            switch(e.key){
                case 'ArrowLeft':
                    e.preventDefault();
                    setSidebarWidth({
                        "CodingPage.useCallback[handleKeyDown]": (prev)=>Math.max(251, prev - step)
                    }["CodingPage.useCallback[handleKeyDown]"]);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    setSidebarWidth({
                        "CodingPage.useCallback[handleKeyDown]": (prev)=>Math.min(600, prev + step)
                    }["CodingPage.useCallback[handleKeyDown]"]);
                    break;
            }
        }
    }["CodingPage.useCallback[handleKeyDown]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodingPage.useEffect": ()=>{
            document.addEventListener('keydown', handleKeyDown);
            return ({
                "CodingPage.useEffect": ()=>document.removeEventListener('keydown', handleKeyDown)
            })["CodingPage.useEffect"];
        }
    }["CodingPage.useEffect"], [
        handleKeyDown
    ]);
    // Load first lecture by default
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodingPage.useEffect": ()=>{
            if (!selectedLecture) {
                setSelectedLecture(lectures[0]);
            }
        }
    }["CodingPage.useEffect"], [
        selectedLecture,
        lectures
    ]);
    // Load markdown content when lecture changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodingPage.useEffect": ()=>{
            if (selectedLecture) {
                const loadContent = {
                    "CodingPage.useEffect.loadContent": async ()=>{
                        setIsLoading(true);
                        try {
                            const content = await loadMarkdownContent(selectedLecture.path);
                            setMarkdownContent(content);
                        } catch (error) {
                            setMarkdownContent(`# Error Loading Notes\n\n${error instanceof Error ? error.message : 'Unknown error'}`);
                        } finally{
                            setIsLoading(false);
                        }
                    }
                }["CodingPage.useEffect.loadContent"];
                loadContent();
            }
        }
    }["CodingPage.useEffect"], [
        selectedLecture
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-[calc(100vh-3.5rem)] bg-background transition-colors duration-500 relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: sidebarRef,
                    className: `border-r border-border/50 bg-background/80 backdrop-blur-xl ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$coding$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar} ${isResizing ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$coding$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].isResizing : ''}`,
                    style: {
                        width: sidebarWidth,
                        willChange: isResizing ? 'width' : 'auto'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-foreground mb-4 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"], {
                                        className: "w-5 h-5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coding/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    "Theory Notes",
                                    isResizing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded",
                                        children: [
                                            sidebarWidth,
                                            "px"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/coding/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coding/page.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border border-border/50 rounded-lg overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setPythonOpen(!pythonOpen),
                                            className: "w-full px-4 py-3 text-left flex items-center justify-between hover:bg-accent/50 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-foreground",
                                                    children: "Python"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/coding/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "5 lectures"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/coding/page.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 21
                                                        }, this),
                                                        pythonOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                            className: "w-4 h-4 text-muted-foreground"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/coding/page.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "w-4 h-4 text-muted-foreground"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/coding/page.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/coding/page.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/coding/page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 17
                                        }, this),
                                        pythonOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-border/50 bg-background/50",
                                            children: lectures.map((lecture)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSelectedLecture(lecture),
                                                    className: `w-full px-6 py-3 text-left text-sm hover:bg-accent/50 transition-colors flex items-center gap-3 ${selectedLecture?.id === lecture.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/coding/page.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 25
                                                        }, this),
                                                        lecture.title
                                                    ]
                                                }, lecture.id, true, {
                                                    fileName: "[project]/app/coding/page.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/coding/page.tsx",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/coding/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/coding/page.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coding/page.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/coding/page.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$coding$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resizeHandle} ${isResizing ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$coding$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].isResizing : ''}`,
                    style: {
                        left: `${sidebarWidth}px`
                    },
                    onMouseDown: ()=>setIsResizing(true),
                    title: "Drag to resize",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: "Resize sidebar"
                        }, void 0, false, {
                            fileName: "[project]/app/coding/page.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none",
                            children: "Drag to resize"
                        }, void 0, false, {
                            fileName: "[project]/app/coding/page.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/coding/page.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex-1 overflow-auto p-8 ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$coding$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentArea}`,
                    children: selectedLecture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-foreground mb-2",
                                        children: selectedLecture.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/coding/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coding/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coding/page.tsx",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this),
                            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coding/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-muted-foreground",
                                        children: "Loading notes..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/coding/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coding/page.tsx",
                                lineNumber: 250,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$lecture$2d$viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LectureViewer"], {
                                content: markdownContent
                            }, void 0, false, {
                                fileName: "[project]/app/coding/page.tsx",
                                lineNumber: 255,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coding/page.tsx",
                        lineNumber: 240,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto text-center py-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4",
                                children: "📖"
                            }, void 0, false, {
                                fileName: "[project]/app/coding/page.tsx",
                                lineNumber: 260,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-foreground mb-4",
                                children: "Select a Lecture"
                            }, void 0, false, {
                                fileName: "[project]/app/coding/page.tsx",
                                lineNumber: 261,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "Choose a lecture from the sidebar to view its notes."
                            }, void 0, false, {
                                fileName: "[project]/app/coding/page.tsx",
                                lineNumber: 262,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coding/page.tsx",
                        lineNumber: 259,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/coding/page.tsx",
                    lineNumber: 238,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/coding/page.tsx",
            lineNumber: 156,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/coding/page.tsx",
        lineNumber: 155,
        columnNumber: 5
    }, this);
}
_s(CodingPage, "mSCow97mSBwvy+hff0PujDG8d0E=");
_c = CodingPage;
var _c;
__turbopack_context__.k.register(_c, "CodingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_34643365._.js.map