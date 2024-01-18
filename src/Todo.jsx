import { useEffect, useState } from "react"
import styled from "styled-components"

import { useTodos } from "./contexts/TodosContext"
import { useDarkMode } from "./contexts/DarkModeContext"

const StyledTodo = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid
    ${({ isDarkMode }) =>
      isDarkMode
        ? "var(--color-very-dark-grayish-blue)"
        : "var(--color-very-light-grayish-blue)"};
  cursor: pointer;

  @media (min-width: 40em) {
    &:hover img {
      display: block;
    }
  }
`

const TodoBox = styled.div`
  display: flex;
  cursor: pointer;
`

const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover input:not(:checked) ~ span {
    border-radius: 50px;
    border: 1px solid transparent;
    background: linear-gradient(135deg, #57ddff, #c058f3) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;

    /* Show the indicator (dot/circle) when checked */
    &:checked ~ span:after {
      display: flex;
    }

    &:disabled ~ span {
      cursor: not-allowed;
    }
  }

  & span::after {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      hsl(192, 100%, 67%),
      hsl(280, 87%, 65%)
    );
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border: 1px solid
      ${({ isDarkMode }) =>
        isDarkMode
          ? "var(--color-very-dark-grayish-blue)"
          : "var(--color-very-light-grayish-blue)"};
    border-radius: 50%;

    &:after {
      content: url("icon-check.svg");
      position: absolute;
      display: none;
      justify-content: center;
      align-items: center;
    }
  }
`

const Text = styled.p`
  font-size: 1.4rem;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  color: ${({ isDarkMode, checked }) =>
    isDarkMode
      ? checked
        ? "var(--color-very-dark-grayish-blue)"
        : "var(--color-light-grayish-blue)"
      : checked
      ? "var(--color-very-light-grayish-blue)"
      : "var(--color-very-dark-grayish-blue)"};
`

const Close = styled.img`
  cursor: pointer;
  width: 15px;

  @media (min-width: 40em) {
    display: none;
  }
`

export default function Todo({
  todo,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
}) {
  const { isDarkMode } = useDarkMode()
  const { dispatch } = useTodos()
  const { text, done, id } = todo
  const [checked, setChecked] = useState(null)

  function handleChange() {
    setChecked((prevChecked) => {
      const updatedChecked = !prevChecked
      const updatedTodo = { ...todo, done: updatedChecked }
      dispatch({ type: "checkTodo", payload: updatedTodo })
      return updatedChecked
    })
  }

  function handleDelete() {
    dispatch({ type: "deleteTodo", payload: id })
  }

  useEffect(() => {
    setChecked(done)
  }, [])

  return (
    <StyledTodo
      isDarkMode={isDarkMode}
      onClick={handleChange}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <TodoBox>
        <CheckboxContainer isDarkMode={isDarkMode}>
          <input
            type="checkbox"
            name="todo"
            id="todo"
            checked={done}
            onChange={handleChange}
          />
          <span></span>
        </CheckboxContainer>
        <Text checked={done} isDarkMode={isDarkMode}>
          {text}
        </Text>
      </TodoBox>
      <Close src="icon-cross.svg" alt="close icon" onClick={handleDelete} />
    </StyledTodo>
  )
}
