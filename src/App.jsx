import { useState } from "react"
import styled from "styled-components"

import Todo from "./Todo"
import Form from "./Form"
import Filter from "./Filter"

import { useTodos } from "./contexts/TodosContext"
import { useDarkMode } from "./contexts/DarkModeContext"

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: 40vh 1fr;
`

const HeroImage = styled.picture`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Bg = styled.div`
  background-color: ${({ isDarkMode }) =>
    isDarkMode
      ? "var(--color-very-dark-blue)"
      : "var(--color-very-light-grayish-blue)"};
`

const Container = styled.div`
  padding-inline: 2rem;
  margin-top: -17rem;
  max-width: 64rem;
  margin-inline: auto;
  height: 100vh;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.p`
  font-size: 2.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 12px;
  color: #fff;
`

const Toggle = styled.img`
  cursor: pointer;
`

const Todos = styled.ul`
  margin-top: 1.6rem;
  background-color: ${({ isDarkMode }) =>
    isDarkMode
      ? "var(--color-very-dark-desaturated-blue)"
      : "var(--color-very-light-gray)"};
  border-top-left-radius: var(--sm-radius);
  border-top-right-radius: var(--sm-radius);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  row-gap: 1.6rem;
`

const LeftTodos = styled.p`
  font-size: 1.4rem;
  color: var(--color-dark-grayish-blue);
  background-color: ${({ isDarkMode }) =>
    isDarkMode
      ? "var(--color-very-dark-desaturated-blue)"
      : "var(--color-very-light-gray)"};
  grid-column: 1/2;
  padding: 1.2rem 1.6rem;
  border-bottom-left-radius: var(--sm-radius);
`

const Fill = styled.div`
  background-color: ${({ isDarkMode }) =>
    isDarkMode
      ? "var(--color-very-dark-desaturated-blue)"
      : "var(--color-very-light-gray)"};

  @media (min-width: 40em) {
    display: none;
  }
`

const ClearButton = styled.button`
  font-size: 1.4rem;
  background-color: ${({ isDarkMode }) =>
    isDarkMode
      ? "var(--color-very-dark-desaturated-blue)"
      : "var(--color-very-light-gray)"};
  border: none;
  color: var(--color-dark-grayish-blue);
  grid-column: 3/4;
  padding: 1.2rem 1.6rem;
  border-bottom-right-radius: var(--sm-radius);
`

const NoTasks = styled.p`
  padding-block: 1.6rem;
  text-align: center;
  color: ${({ isDarkMode }) =>
    isDarkMode
      ? "var(--color-light-grayish-blue)"
      : "var(--color-very-dark-grayish-blue)"};
`

export default function App() {
  const { todos, dispatch } = useTodos()
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const [filter, setFilter] = useState("all")
  const [dragItem, setDragItem] = useState()

  const uncompletedTodosNum = todos?.filter((todo) => !todo.done).length

  function handleDeleteCompleted() {
    dispatch({ type: "deleteCompleted" })
  }

  function handleFilter(value) {
    setFilter(value)
  }

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "all") return true
    if (filter === "active") return !todo.done
    if (filter === "completed") return todo.done
  })

  function handleDragStart(index) {
    setDragItem(index)
  }

  function handleDragEnter(e, index) {
    const newList = [...todos]
    const item = newList[dragItem]
    newList.splice(dragItem, 1)
    newList.splice(index, 0, item)
    setDragItem(index)
    dispatch({ type: "setTodos", payload: newList })
  }

  const handleDragLeave = (e) => {}
  const handleDrop = (e) => {}

  return (
    <StyledApp>
      <HeroImage>
        <source
          srcSet={isDarkMode ? "bg-desktop-dark.jpg" : "bg-desktop-light.jpg"}
          media="(min-width: 40em)"
        />
        <img
          src={isDarkMode ? "bg-mobile-dark.jpg" : "bg-mobile-light.jpg"}
          alt="mountains"
        />
      </HeroImage>
      <Bg isDarkMode={isDarkMode}>
        <Container>
          <Header>
            <Logo>todo</Logo>
            <Toggle
              onClick={toggleDarkMode}
              src={isDarkMode ? "icon-sun.svg" : "icon-moon.svg"}
              alt="moon icon"
            />
          </Header>
          <Form />
          <Todos isDarkMode={isDarkMode}>
            {filteredTodos?.length > 0 ? (
              filteredTodos?.map((todo, index) => (
                <Todo
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleDrop(e)}
                  onDragOver={(e) => e.preventDefault()}
                  key={todo.id}
                  todo={todo}
                />
              ))
            ) : (
              <NoTasks isDarkMode={isDarkMode}>No tasks in this list</NoTasks>
            )}
          </Todos>
          <Grid>
            <LeftTodos isDarkMode={isDarkMode}>
              {uncompletedTodosNum} items left
            </LeftTodos>
            <Fill isDarkMode={isDarkMode} />
            <ClearButton
              isDarkMode={isDarkMode}
              onClick={handleDeleteCompleted}
            >
              Clear completed
            </ClearButton>
            <Filter filter={filter} handleFilter={handleFilter} />
          </Grid>
        </Container>
      </Bg>
    </StyledApp>
  )
}
