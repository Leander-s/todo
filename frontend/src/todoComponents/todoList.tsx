import { useState, useEffect } from 'react';
import { TodoItem, type todoItem } from './todoItem.tsx';
import { createItem, removeItem, listItems } from '../api.tsx';

export default function TodoList() {
    const [itemList, setItems] = useState<todoItem[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const [IDs, setIDs] = useState<Set<number>>(new Set());

    useEffect(() => {
        (async () => {
            const data = await listItems();
            setItems(data);
            data.forEach(item => {setIDs(prev => prev.add(item.id))})
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

    async function addTodo() {
        if (inputText.length == 0) return;

        const newTodo: todoItem = { id: getNextID(), title: inputText };
        setItems(items => [...items, newTodo]);
        setInputText("");
        await createItem(newTodo);
    }

    async function deleteTodo(id: number) {
        setItems(items => items.filter(item => item.id != id));
        await removeItem(id);
    }

    async function completeTodo(id: number) {
        deleteTodo(id);
        await removeItem(id);
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key == 'Enter') {
            addTodo();
        }
    }

    return (
        <section className="py-10 block w-full mx-auto box-border min-h-screen max-w-none">
            <div className="px-10 w-screen mx-[calc(50%-50vw)]">
                <ul className="divide-y space-y-1 overflow-auto">
                    {itemList.map((item) => (
                        <TodoItem key={item.id} item={item} onDelete={() => deleteTodo(item.id)} onCompletion={() => completeTodo(item.id)} />
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
                        ].join(" ")}
                        onClick={addTodo} >Add item</button>
                </div>
            </div>
        </section>
    )
}
