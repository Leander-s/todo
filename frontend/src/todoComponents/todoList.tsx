import { useState, useEffect } from 'react';
import { TodoItem, type todoItem } from './todoItem.tsx';
import { createItem, removeItem, listItems, update } from '../api.tsx';

export default function TodoList() {
    const [itemList, setItems] = useState<todoItem[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const [IDs, setIDs] = useState<Set<number>>(new Set());

    useEffect(() => {
        (async () => {
            const data = await listItems();
            setItems(data);
            data.forEach(item => { setIDs(prev => prev.add(item.id)) })
        })();
    }, []);

    function getNextID() {
        let id = 0;
        while (IDs.has(id)) {
            id++;
        }
        setIDs(ids => {
            const next = new Set(ids);
            next.add(id);
            return next;
        });
        return id;
    }

    function addTodo() {
        if (inputText.length == 0) return;

        const newTodo: todoItem = { id: getNextID(), title: inputText, status: "open", checked: false };
        setItems(items => [...items, newTodo]);
        setInputText("");
        createItem(newTodo);
    }

    function deleteTodo(id: number) {
        setItems(items => items.filter(item => item.id != id));
        removeItem(id);
    }

    function completeTodo(id: number) {
        const foundItems = itemList.filter(item => item.id == id);
        if (foundItems.length != 1) return;
        const newItem = foundItems[0];
        setItems(items => items.filter(item => item.id != id));
        newItem.status = "done";
        update(newItem);
    }

    function updateTitle(newTitle: string, id: number) {
        const foundItems = itemList.filter(item => item.id == id);
        if (foundItems.length != 1) return;
        const newItem = foundItems[0];
        newItem.title = newTitle;
        update(newItem);
    }

    function deleteCheckedTodos() {
        const checkedItems = itemList.filter(item => item.checked);
        checkedItems.forEach(item => deleteTodo(item.id));
    }

    function checkItem(id: number, checked: boolean) {
        setItems(items => items.map(item => item.id == id ? { ...item, checked: checked } : item));
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key == 'Enter') {
            addTodo();
        }
    }

    const checkedCount = itemList.reduce((count, item) => item.checked ? count + 1 : count, 0);
    const anyChecked = checkedCount > 0;

    return (
        <section className="py-10 block w-full mx-auto box-border min-h-screen max-w-none align-content-center">
            <div className="px-10 w-screen mx-[calc(50%-50vw)]">
                <ul className="divide-y space-y-1 overflow-auto">
                    {itemList.map((item) => (
                        <TodoItem key={item.id} item={item}
                        changeTitle={(newTitle) => updateTitle(newTitle, item.id)}
                        onCheck={(checked) => checkItem(item.id, checked)}
                        onCompletion={() => completeTodo(item.id)} />
                    ))}
                </ul>
                <div className={["sticky bottom-0 flex gap-2 py-2 bg-transparent"
                ].join(" ")}>
                    <input
                        id="newItem"
                        type="text"
                        placeholder="Add a task…"
                        className={[
                            "flex-1 rounded-xs border p-2",
                            "shadow-sm outline-none",
                            "border-neutral-700",
                            "bg-neutral-800",
                            "focus:bg-neutral-700"
                        ].join(" ")}
                        value={inputText}
                        onKeyDown={handleKeyDown}
                        onChange={(input) => setInputText(input.target.value)} />
                    <button
                        className={[
                            "rounded-xs p-2 border font-medium text-neutral-400",
                            "shadow-sm",
                            "border-neutral-700",
                            "bg-neutral-800",
                            "hover:text-neutral-200",
                            "active:scale-95 transition",
                            "cursor-pointer",
                        ].join(" ")}
                        onClick={addTodo} >Add item</button>
                </div>
            </div>
            <div className={[
                "fixed left-1/2 bottom-10"
            ].join(" ")}>
                <button
                    onClick={deleteCheckedTodos}
                    className={[
                        "rounded-xl p-2",
                        "transition-all",
                        "bg-zinc-900",
                        "border border-zinc-900",
                        "text-s",
                        "text-rose-900",
                        "hover:border-rose-700 hover:text-rose-700",
                        "active:scale-95",
                        anyChecked ? "opacity-100" : "opacity-0",
                    ].join(" ")}>
                    Delete
                </button>
            </div>
        </section>
    )
}
