import { Moon, Sun } from "lucide-react"
import { useTheme } from "../hooks/useTheme"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="neo-btn bg-neo-yellow dark:bg-zinc-800 px-3 py-2"
    >
      <Sun className="h-5 w-5 dark:hidden block text-black" />
      <Moon className="h-5 w-5 hidden dark:block text-white" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
