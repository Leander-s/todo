type todoItemProps = {
    item: todoItem;
    onDelete: () => void;
    onCompletion: () => void;
}

export type todoItem = {
    id: number;
    title: string;
}

export function TodoItem({ item, onDelete, onCompletion }: todoItemProps) {
    return (
        <li className={[
            // container
            "relative flex items-center p-1 sm:py-3.5",
            "pl-12 pr-12",
            "border-zinc-300 dark:bg-zinc-800/60 dark:border-zinc-600",
            "rounded-xs transition-colors",
            "border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700",
            " ",
        ].join(" ")}>
            <button type="button" onClick={onCompletion}
                className={[
                    "absolute grid left-1 top-1 bottom-1 place-items-center rounded-xs w-1/4",
                    "text-neutral-400",
                    "shadow-sm",
                    "bg-white/80 dark:bg-zinc-900",
                    "hover:text-emerald-800",
                    "active:scale-95 transition",
                ].join(" ")}
            >Done</button>
            <label
                className={[
                    "mx-auto text-center",
                    "truncate sm:line-clamp-2",          // 1 line on mobile, up to 2 on sm+
                    "px-12",
                ].join(" ")}
            >{item.title}</label>
            <button onClick={onDelete}
                className={[
                    "absolute grid right-1 top-1 bottom-1 place-items-center rounded-xs w-1/4",
                    "shadow-sm",
                    "text-neutral-400",
                    "bg-white/80 dark:bg-zinc-900",
                    "hover:text-rose-800",
                    "active:scale-95 transition",
                ].join(" ")}
            >Delete</button>
        </li>
    )
}
