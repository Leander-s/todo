import { type todoItem } from "./todoComponents/todoItem.tsx";

const API = import.meta.env.VITE_API_URL;

export async function listItems(): Promise<todoItem[]> {
    console.log("Fetching items from API:", API);
    const r = await fetch(API);
    if (!r.ok) throw new Error("Fetching items failed");
    return r.json();
}

export async function getItem(id: number): Promise<todoItem> {
    const r = await fetch(API + id + '/', {
        method: "GET",
    });
    if (!r.ok) throw new Error("Fetching item failed");
    return r.json();
}

export async function createItem(item: todoItem): Promise<void> {
    const r = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });
    if (!r.ok) throw new Error("Creating data failed");
}

export async function update(item: todoItem): Promise<void> {
    const r = await fetch(API + item.id + '/', {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });
    if (!r.ok) throw new Error("Update failed");
}

export async function removeItem(id: number): Promise<todoItem> {
    const itemResponse = await getItem(id);
    const r = await fetch(API + id + '/', {
        method: "DELETE"
    });
    if (!r.ok) throw new Error("Deleting item failed");
    return itemResponse;
}
