import * as React from "react"
import { useTheme } from "@/lib/theme-provider"

export function useIsDark() {
    const { theme } = useTheme()
    const mounted = React.useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    )
    return mounted && theme === "dark"
}


export function isActiveLink(pathname: string, href: string) {
    if (href.includes("#")) return false
    return href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(href + "/")
}