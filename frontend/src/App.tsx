import './App.css'
import TodoList from './todoComponents/todoList.tsx'

function App() {
    return (
        <>
            <h1 className="text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)] font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50"
            >TODO</h1>
            <TodoList />
        </>
    )
}

export default App
