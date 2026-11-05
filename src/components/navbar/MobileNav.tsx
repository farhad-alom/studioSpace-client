"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth-provider"
import { cn } from "@/lib/utils"
import UserAvatar from "./UserAvatar"
import ThemeToggle from "./ThemeToggle"
import { NAV_LINKS, USER_LINKS } from "./config"
import { getLogoSrc, isActiveLink, useIsDark } from "./helpers"

export default function MobileNav() {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname()
    const { user, logout, isAuthenticated } = useAuth()
    const logoSrc = getLogoSrc(useIsDark())

    const close = () => setOpen(false)

    const linkClass = (href: string) =>
        cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActiveLink(pathname, href)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
        )

    return (
        <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <Button variant="outline" size="icon" onClick={() => setOpen(true)} aria-label="Open menu">
                <Menu className="size-5" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right" className="w-70 overflow-y-auto p-5">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                    <div className="mb-6 flex items-center justify-between">
                        <Image
                            src={logoSrc}
                            alt="StudioSpace Logo"
                            width={140}
                            height={40}
                            className="h-8 w-auto object-contain"
                        />
                        <Button variant="ghost" size="icon" onClick={close} aria-label="Close menu">
                            <X className="size-5" />
                        </Button>
                    </div>

                    {isAuthenticated && (
                        <div className="mb-4 flex items-center gap-3 rounded-lg bg-muted p-3">
                            <UserAvatar user={user} className="size-10" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">{user?.name}</p>
                                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.href} href={link.href} onClick={close} className={linkClass(link.href)}>
                                {link.label}
                            </Link>
                        ))}

                        {isAuthenticated && (
                            <div className="mt-3 flex flex-col gap-1 border-t pt-3">
                                {USER_LINKS.map(({ href, label, icon: Icon }) => (
                                    <Link key={href} href={href} onClick={close} className={linkClass(href)}>
                                        <Icon className="size-4" /> {label}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 border-t pt-4">
                            {isAuthenticated ? (
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => {
                                        logout()
                                        close()
                                    }}
                                >
                                    <LogOut className="mr-2 size-4" /> Logout
                                </Button>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link href="/login" onClick={close}>
                                        <Button variant="outline" className="w-full">Login</Button>
                                    </Link>
                                    <Link href="/register" onClick={close}>
                                        <Button className="w-full">Register</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}