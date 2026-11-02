"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-provider"
import { cn } from "@/lib/utils"
import MobileNav from "./navbar/MobileNav"
import ThemeToggle from "./navbar/ThemeToggle"
import UserDropdown from "./navbar/UserDropdown"
import { NAV_LINKS } from "./navbar/config"
import { getLogoSrc, isActiveLink, useIsDark } from "./navbar/helpers"

export default function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const logoSrc = getLogoSrc(useIsDark())

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
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

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 text-sm font-semibold transition-colors hover:text-primary",
                isActiveLink(pathname, link.href)
                  ? "text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />

          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>

        <MobileNav />
      </div>
    </nav>
  )
}