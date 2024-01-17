import { createContext, useContext, useReducer } from "react"

const TodosContext = createContext()

const initialState = {
  todos: [
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
  ],
}

function reducer(state, action) {
  switch (action.type) {
    case "addTask":
      return {
        todos: [action.payload, ...state.todos],
      }
    case "checkTodo":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      }
    case "deleteTodo":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    case "deleteCompleted":
      return {
        todos: state.todos.filter((todo) => !todo.done),
      }
    case "setTodos":
      return {
        todos: action.payload,
      }
    default:
      throw new Error("Unknown action")
  }
}

function TodosProvider({ children }) {
  const [{ todos }, dispatch] = useReducer(reducer, initialState)

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
