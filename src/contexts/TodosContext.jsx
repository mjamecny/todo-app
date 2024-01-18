import { createContext, useContext, useEffect, useReducer } from "react"

const TodosContext = createContext()

const initialTodos = [
  {
    id: 1,
    text: "Complete online JavaScript course",
    done: true,
  },
  {
    id: 2,
    text: "Jog around the park 3x",
    done: false,
  },
  {
    id: 3,
    text: "10 minutes meditation",
    done: false,
  },
]

function reducer(state, action) {
  switch (action.type) {
    case "addTask":
      return [action.payload, ...state]

    case "checkTodo":
      return [
        ...state.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      ]
    case "deleteTodo":
      return [...state.filter((todo) => todo.id !== action.payload)]

    case "deleteCompleted":
      return [...state.filter((todo) => !todo.done)]

    case "setTodos":
      return [action.payload]

    default:
      throw new Error("Unknown action")
  }
}

function TodosProvider({ children }) {
  // Check if there is a stored state in localStorage
  const storedState = JSON.parse(localStorage.getItem("todos"))

  // Use the stored state if available, otherwise use the initial state
  const [todos, dispatch] = useReducer(reducer, storedState || initialTodos)

  // Update localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  )
}

function useTodos() {
  const context = useContext(TodosContext)

  if (context === undefined) {
    throw new Error("")
  }

  return context
}

export { useTodos, TodosProvider }
