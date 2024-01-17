import styled from "styled-components"
import { useDarkMode } from "./contexts/DarkModeContext"

const StyledFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.4rem;
  background-color: ${({ isDarkMode }) =>
    isDarkMode
      ? "var(--color-very-dark-desaturated-blue)"
      : "var(--color-very-light-gray)"};
  border-radius: var(--sm-radius);
  padding-block: 1.2rem;
  grid-column: 1 / -1;

  @media (min-width: 40em) {
    border-radius: 0;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
`

const FilterButton = styled.button`
  font-size: 1.4rem;
  font-weight: 700;
  background-color: transparent;
  border: none;
  color: ${({ active }) =>
    active === "true"
      ? "var(--color-bright-blue)"
      : "var(--color-dark-grayish-blue)"};
  cursor: pointer;

  &:hover {
    color: ${({ isDarkMode }) =>
      isDarkMode
        ? "var(--color-light-grayish-blue)"
        : "var(--color-very-dark-grayish-blue)"};
  }
`

const filterBtns = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
]

export default function Filter({ filter, handleFilter }) {
  const { isDarkMode } = useDarkMode()
  return (
    <StyledFilter isDarkMode={isDarkMode}>
      {filterBtns.map((btn) => (
        <FilterButton
          key={btn.value}
          value={btn.value}
          active={(filter === btn.value).toString()}
          onClick={() => handleFilter(btn.value)}
          isDarkMode={isDarkMode}
        >
          {btn.label}
        </FilterButton>
      ))}
    </StyledFilter>
  )
}
