import {Home, Info, Heart, User, BookOpen} from "lucide-react";
import { NavLink } from "react-router-dom";

interface MenuItem {
    to: string;
    icon: React.ReactNode;
    label: string;
}

const menuItems: MenuItem[] = [
    { to: "/", icon: <Home size={18} />, label: "Home" },
    { to: "/favourites", icon: <Heart size={18} />, label: "Favourites" },
    { to: "/blog", icon: <BookOpen size={18} />, label: "Blog" },
    { to: "/about", icon: <Info size={18} />, label: "About" },
    { to: "/profile", icon: <User size={18} />, label: "Profile" },
];

interface MenuBarProps {
    className?: string;
}

export default function Navbar({ className }: MenuBarProps) {
    return (
        <nav className={`flex gap-2 ${className}`}>
            {menuItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `flex items-center font-bold gap-3 px-2 py-1.5 border-none rounded-full w-40 ${
                            isActive ? "bg-green-600 font-normal text-white" : ""
                        }`
                    }
                >
                    {item.icon}
                    <span className="hidden lg:inline">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}