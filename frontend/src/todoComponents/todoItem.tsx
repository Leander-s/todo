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
            "relative flex justify-between p-1",
            "bg-transparent",
            "rounded-md transition-colors",
            "border hover:bg-zinc-900/50",
            focused ? "border-zinc-400" : "border-zinc-600",
        ].join(" ")}>
            <section className={[
                "relative flex px-10"
            ].join(" ")}>
                <input type="checkbox" id="checkbox" checked={checked} onChange={checkBoxChanged}
                    className={[
                        "absolute left-0 top-0 bottom-0 mx-5 my-auto h-5 w-5",
                        "cursor-pointer",
                    ].join(" ")}
                />
                <input
                    className={[
                        "text-left px-10 top-1 bottom-1",
                        "sm:line-clamp-2",          // 1 line on mobile, up to 2 on sm+
                        "outline-none",
                        "text-xl"
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
                    "absolute top-0 bottom-0 right-0 px-10",
                    "place-items-center",
                    "text-neutral-400",
                    "bg-transparent",
                    "text-xl",
                    "hover:bg-emerald-600 transition",
                    "active:scale-95 transition",
                    "rounded-md",
                    "cursor-pointer",
                ].join(" ")}
            >✅</button>
        </li>
    )
}
