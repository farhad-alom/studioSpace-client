import { CalendarCheck, LayoutDashboard, List, PlusCircle } from "lucide-react"

export const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/studios", label: "Explore Studios" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/about-us", label: "About Us" },
]

export const USER_LINKS = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/add-studio", label: "Add New Studio", icon: PlusCircle },
    { href: "/my-listings", label: "My Studio Listings", icon: List },
    { href: "/my-bookings", label: "My Bookings", icon: CalendarCheck },
]