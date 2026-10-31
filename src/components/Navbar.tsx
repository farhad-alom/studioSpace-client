
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, Moon, Sun, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useTheme } from "@/lib/theme-provider"
import { useAuth } from "@/lib/auth-provider"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about-us", label: "About Us" },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Keep the first server and client render consistent.
  const logoSrc =
    mounted && theme === "dark"
      ? "/nav-logo.png"
      : "/nav-logo-light.png"

  const themeButton = (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {mounted && theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  )

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">

        {/* Logo */}
        <Link href="/" className="shrink-0 mx-2 px-3 py-2">
          <Image
            src={logoSrc}
            alt="StudioSpace Logo"
            width={200}
            height={65}
            priority
            className="h-12 w-auto object-contain transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base font-semibold transition-colors",
                pathname === link.href
                  ? "text-primary"
                  : "text-foreground/75 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}

          {themeButton}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">
                {user?.name}
              </span>
              <Button variant="outline" onClick={logout}>
                <LogOut className="mr-2 size-4" />
                Log out
              </Button>
            </div>
          ) : (
            <Button asChild>
              <Link href="/login">Log in</Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          {themeButton}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetContent side="right" className="w-[300px]">
              <div className="mb-8 flex justify-between">
                <Image
                  src={logoSrc}
                  alt="StudioSpace Logo"
                  width={160}
                  height={55}
                  className="h-10 w-auto object-contain"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "rounded-lg px-4 py-3 text-base font-semibold",
                      pathname === link.href
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 border-t pt-4">
                  {isAuthenticated ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        logout()
                        setMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 size-4" />
                      Log out
                    </Button>
                  ) : (
                    <Button asChild className="w-full">
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                      >
                        Log in
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
