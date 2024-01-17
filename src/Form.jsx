import { useState } from "react"
import styled from "styled-components"

import { useTodos } from "./contexts/TodosContext"
import { useDarkMode } from "./contexts/DarkModeContext"

const StyledForm = styled.form`
  display: flex;
  position: relative;
  margin-top: 1.6rem;
`

const Circle = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid
    ${({ isDarkMode }) =>
      isDarkMode
        ? "var(--color-very-dark-grayish-blue)"
        : "var(--color-very-light-grayish-blue)"};
  top: 50%;
  transform: translateY(-50%);
  left: 1.6rem;
`

const Input = styled.input`
  width: 100%;
  padding-block: 0.8rem;
  padding-left: 4.8rem;
  border: none;
  border-radius: var(--sm-radius);
  color: ${({ isDarkMode }) =>
    isDarkMode
      ? "var(--color-light-grayish-blue)"
      : "var(--color-very-dark-grayish-blue)"};
  background-color: ${({ isDarkMode }) =>
    isDarkMode
      ? "var(--color-very-dark-desaturated-blue)"
      : "var(--color-very-light-gray)"};

  &::placeholder {
    font-size: 1.2rem;
  }

  &:focus {
    outline: none;
  }
`

export default function Form() {
  const { isDarkMode } = useDarkMode()
  const { dispatch } = useTodos()
  const [task, setTask] = useState("")

  function handleAddTodo(e) {
    e.preventDefault()
    if (!task) return

    const newTodo = {
      id: crypto.randomUUID(),
      text: task,
      done: false,
    }

    dispatch({ type: "addTask", payload: newTodo })
    setTask("")
  }

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <Circle isDarkMode={isDarkMode} />
      <Input
        type="text"
        placeholder="Create a new todo..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        isDarkMode={isDarkMode}
      />
    </StyledForm>
  )
}
