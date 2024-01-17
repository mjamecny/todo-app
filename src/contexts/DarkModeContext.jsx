import { createContext, useContext, useState } from "react"

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error("DarkModeContext used outside of DarkModeProvider")
  }

  return context
}

export { DarkModeProvider, useDarkMode }
