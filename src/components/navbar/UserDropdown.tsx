"use client"

import Link from "next/link"
import { ChevronDown, LogOut } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-provider"
import UserAvatar from "./UserAvatar"
import { USER_LINKS } from "./config"

export default function UserDropdown() {
    const { user, logout } = useAuth()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="group flex cursor-pointer items-center gap-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <UserAvatar user={user} />
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <p className="truncate text-sm font-semibold">{user?.name}</p>
                        <p className="truncate text-xs font-normal text-muted-foreground">
                            {user?.email}
                        </p>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {USER_LINKS.map(({ href, label, icon: Icon }) => (
                        <DropdownMenuItem
                            key={href}
                            render={<Link href={href} />}
                            className="cursor-pointer gap-3 py-2"
                        >
                            <Icon className="size-4 shrink-0 text-primary" />
                            <span>{label}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer gap-3 py-2 text-destructive focus:text-destructive"
                >
                    <LogOut className="size-4 shrink-0" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}