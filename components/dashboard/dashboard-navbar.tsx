/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardPage } from "@/defines/dashboard-page"
import { useLogout } from "@/features/use-logout"
import { CustomSession } from "@/features/use-session"
import useUIEventStore from "@/stores/ui-event.store"
import { LogOut, Settings } from "lucide-react"
import Link from "next/link"
import NavbarItem from "./navbar-item"

type SiteIconProps = {
    session?: CustomSession
}

export default function DashboardNavbar({ session }: SiteIconProps) {
    const { setShowLogin, setDashboardPage, setShowSettings } = useUIEventStore();
    const logout = useLogout();

    const onSettingsClicked = () => {
        console.log("settings clicked:");
        setShowSettings(true);
    }

    const onLogoutClicked = () => {
        console.log("logout clicked:");
        // * 调用 useLogout
        logout.mutateAsync();
    }

    console.log('navbar, session:', session);
    console.log('navbar, image:', session?.user?.image);
    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
            <div className="w-full px-4 mx-auto max-w-7xl">
                <div className="flex items-center justify-between h-14">

                    <Link href="#" className="flex items-center" prefetch={false}>
                        <SiteIcon className="w-6 h-6" />
                        <span className="sr-only">Hub</span>
                    </Link>
                    <nav className="hidden gap-4 md:flex">
                        <NavbarItem name={DashboardPage.Home} title="Home" />
                    </nav>
                    {
                        session?.user?.name ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                                        <Avatar>
                                            <AvatarImage src={session?.user?.image ?? ""} alt="@shadcn" />
                                            <AvatarFallback>{session?.user?.name.charAt(0) ?? ""}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuItem onClick={() => onSettingsClicked()}>
                                        <Settings className="w-4 h-4 mr-2" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onLogoutClicked()}>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>
                                    Sign in
                                </Button>
                                <Button size="sm">Sign up</Button>
                            </div>
                        )
                    }
                </div>
            </div >
        </nav >
    )
}

function SiteIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <div>
        </div>
    )
}