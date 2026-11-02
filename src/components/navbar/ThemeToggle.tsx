"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-provider"
import { useIsDark } from "./helpers"

export default function ThemeToggle() {
    const { toggleTheme } = useTheme()
    const isDark = useIsDark()

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
    )
}