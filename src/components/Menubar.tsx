import {Home, Info, Heart, User, BookOpen} from "lucide-react";
import {NavLink} from "react-router-dom";
import  Button  from "@mui/material/Button";

interface MenuBarProps {
    className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {

    return (
        <div className={className}>
            <Button
                variant="outlined"
                title="Home"
                className="flex item-center justify-start gap-3"
            >
                <NavLink to="/" className={({isActive}) => isActive ? "text-green-700" : ""}>
                        <Home/>
                        <span className="hidden lg:inline">Home</span>
                </NavLink>
            </Button>
            <Button
                variant="outlined"
                title="bookmarks"
                className="flex item-center justify-start gap-3"
            >
                <NavLink to="/favourites" className={({isActive}) => isActive ? "text-green-700" : ""}>
                        <Heart/>
                        <span className="hidden lg:inline">Favourites</span>
                </NavLink>
            </Button>
            <Button
                variant="outlined"
                title="sell"
                className="flex item-center justify-start gap-3"
            >
                <NavLink to="/blog" className={({isActive}) => isActive ? "text-green-700" : ""}>
                    <BookOpen />
                    <span className="hidden lg:inline">Blog</span>
                </NavLink>
            </Button>
            <Button
                variant="outlined"
                title="bookmarks"
                className="flex item-center justify-start gap-3"
            >
                <NavLink to="/about" className={({isActive}) => isActive ? "text-green-700" : ""}>
                    <Info />
                    <span className="hidden lg:inline">About</span>
                </NavLink>
            </Button>
            <Button
                variant="outlined"
                title="Profile"
                className="flex item-center justify-start gap-3"
            >
                <NavLink to="/profile" className={({isActive}) => isActive ? "text-green-700" : ""}>
                    <User />
                    <span className="hidden lg:inline">Profile</span>
                </NavLink>
            </Button>
        </div>
    );
}