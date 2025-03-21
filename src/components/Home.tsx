import Categories from "./Categories.tsx";
import SearchBar from "./SearchBar.tsx"

const Home = () => {
    return(
        <div className="h-screen overflow-hidden overflow-y-auto bg-green-50 w-full p-8 space-y-4">
            <SearchBar/>
            <Categories/>
        </div>
    )
}

export default Home;