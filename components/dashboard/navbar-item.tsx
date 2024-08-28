
import useUIEventStore from "@/stores/ui-event.store";
import Link from "next/link";
type NavbarItemProps = {
    name: string;
    title: string;
}

export default function NavbarItem({ name, title }: NavbarItemProps) {
    const { setDashboardPage, event } = useUIEventStore();
    const isActive = event.dashboardPage === name;

    return (
        <div className={`relative px-4 py-2 ${isActive ? 'bg-gray-100 backdrop-blur-sm rounded-md shadow-md' : ''}`}>
            <Link
                href="#"
                className="flex items-center text-sm font-medium transition-colors hover:underline"
                prefetch={false}
                onClick={() => setDashboardPage(name)}
            >
                {title}
            </Link>
        </div>
    )
};
