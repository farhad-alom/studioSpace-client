"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, Moon, Sun, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useTheme } from "@/lib/theme-provider"
import { useAuth } from "@/lib/auth-provider"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/about-us", label: "About Us" },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = React.useState(false);
  const mounted = React.useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  // লাইট থিমে Dark Text Logo এবং ডার্ক থিমে Light Text Logo লোড হবে
  const isDark = mounted && theme === "dark"
  const logoSrc = isDark ? "/nav-logo.png" : "/nav-logo-light.png"

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">

        {/* Logo Section */}
        <Link href="/" className="shrink-0 p-1">
          <Image
            src={logoSrc}
            alt="StudioSpace Logo"
            width={180}
            height={50}
            priority
            className="h-10 w-auto object-contain transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Switcher Button */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>

          {/* Auth Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{user?.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 size-4" /> Log out
              </Button>
            </div>
          ) : (
            <Button size="sm">
              <Link href="/login">Log in</Link>
            </Button>
          )}
        </div>

        {/* Mobile Nav Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>

          <Button variant="outline" size="icon" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>

          {/* Mobile Sheet Menu */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetContent side="right" className="w-[280px] p-5">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <div className="mb-6 flex items-center justify-between">
                <Image
                  src={logoSrc}
                  alt="StudioSpace Logo"
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
                <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X className="size-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 border-t pt-4">
                  {isAuthenticated ? (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        logout()
                        setMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 size-4" /> Log out
                    </Button>
                  ) : (
                    <Button className="w-full">
                      <Link href="/login" onClick={() => setMenuOpen(false)}>
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