import {useSearchParams} from "react-router-dom";
import RecipeCard from "./RecipeCard.tsx";
import {useState, useEffect} from "react";
import SkeletonCard from "./SkeletonCard.tsx";

interface RecipeType {
    id: string;
    title: string;
    image: string;
    readyInMinutes: number;
    glutenFree: boolean;
    dairyFree: boolean;
    vagetarian: boolean;
    pricePerServing: number;
    spoonacularScore: number;
}

const SearchPage = () => {
    const [useParams] = useSearchParams()
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [loading, setLoading] = useState(true);

    const query = useParams.get("query");
    const API_KEY = "9d3d1523d92141cab18c37ad68fc707a"

    useEffect(() => {
        if (query) {
            const FetchPost = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=25&addRecipeInformation=true`);

                    if (!response.ok) {
                        return;
                    }
                    const data = await response.json();
                    setRecipes(data.results);
                } catch (error) {
                    console.error(
                        "There has been a problem with your fetch operation",
                        error
                    );
                } finally {
                    setLoading(false);
                }
            };
            FetchPost();
        }
    }, [query]);



    return (
        <div className="h-screen bg-green-50 w-full">
            {loading ? (
                <div className="px-10 py-5">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3  gap-4">
                        {Array.from({length: 25}).map((_, index) => (
                            <SkeletonCard key={index}/>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="px-10 py-5">
                    <div>
                        <h1 className="mb-3 text-2xl font-semibold ">Results for
                            <span className="italic text-red-600"> {query}</span></h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <div key={recipe.id}>
                                    <RecipeCard
                                        id={recipe.id}
                                        Image={recipe.image}
                                        Title={recipe.title}
                                        Time={recipe.readyInMinutes}
                                        Price={recipe.pricePerServing}
                                        Ratings={recipe.spoonacularScore}
                                        vegetarian={recipe.vagetarian}
                                        glutenFree={recipe.glutenFree}
                                        dairyFree={recipe.dairyFree}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-lg text-destructive">Oops! No results found.</p>
                        )}
                    </div>
                </div>

            )}
        </div>
    );
};

export default SearchPage;
