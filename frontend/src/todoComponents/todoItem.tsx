import { useState } from 'react';

type todoItemProps = {
    item: todoItem;
    changeTitle: (value: string) => void;
    onCheck: (checked: boolean) => void;
    onCompletion: () => void;
}

export type todoStatus = "open" | "inProgress" | "done";

export type todoItem = {
    id: number;
    title: string;
    status: todoStatus;
    checked: boolean;
}

export function TodoItem({ item, changeTitle, onCheck, onCompletion }: todoItemProps) {
    const [focused, setFocused] = useState(false);
    const [checked, setChecked] = useState(false);

    function checkBoxChanged(e: React.ChangeEvent<HTMLInputElement>) {
        const newChecked = e.currentTarget.checked;
        setChecked(newChecked);
        item.checked = newChecked;
        onCheck(newChecked);
    }

    return (
        <li className={[
            "w-full",
            "bg-transparent",
            "rounded-md transition-colors",
            "border hover:bg-zinc-900/50",
            focused ? "border-zinc-400" : "border-zinc-600",
        ].join(" ")}>
            <div className="flex items-stretch">
                <section className={[
                    "flex items-center gap-3 flex-1 min-w-0 px-2 sm:px-3",
                ].join(" ")}>
                    <input type="checkbox" id="checkbox" checked={checked} onChange={checkBoxChanged}
                        className={[
                            "sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6",
                            "cursor-pointer",
                        ].join(" ")}
                    />
                    <input
                        className={[
                            "text-left flex-1 min-w-0 bg-transparent",
                            "truncate",
                            "outline-none",
                            "text-sm sm:text-base md:text-lg",
                        ].join(" ")}
                        onChange={(value) => { item.title = value.target.value }}
                        onFocus={() => setFocused(true)}
                        onBlur={() => {
                            setFocused(false);
                            changeTitle(item.title);
                        }}
                        readOnly={false}
                        defaultValue={item.title}
                    ></input>
                </section>
                <button type="button" onClick={onCompletion}
                    className={[
                        "self-stretch px-3 sm:px-4",
                        "text-sm sm:text-base md:text-lg",
                        "flex items-center justify-center",
                        "text-neutral-400",
                        "bg-transparent",
                        "hover:bg-emerald-600 transition",
                        "active:scale-95 transition",
                        "rounded-md",
                        "cursor-pointer",
                    ].join(" ")}
                >✅</button>
            </div>
        </li>
    )
}
