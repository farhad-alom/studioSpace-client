import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { StudioUser } from "@/lib/auth-provider"
import { cn } from "@/lib/utils"

export default function UserAvatar({
    user,
    className,
}: {
    user: StudioUser | null
    className?: string
}) {
    const initial = user?.name?.charAt(0)?.toUpperCase() || "U"

    return (
        <Avatar className={cn("size-9 border", className)}>
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
    )
}