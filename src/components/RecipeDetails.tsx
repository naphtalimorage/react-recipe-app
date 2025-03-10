import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import Divider from '@mui/material/Divider';
interface  RecipeType{
    id: string;
    title: string;
    image: string;
    readyInMinutes: number;
    glutenFree: boolean;
    dairyFree: boolean;
    vagetarian: boolean;
    pricePerServing: number;
    spoonacularScore: number;
    extendedIngredients: ingredientsTypes[];
}

interface ingredientsTypes{
    id: string;
    name: string;
}

const RecipeDetails = () => {
    const API_KEY = "9d3d1523d92141cab18c37ad68fc707a"
    const [loading, setLoading] = useState(false)
    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const [ingredients, setIngredients] = useState<ingredientsTypes[]>([]);
    const[useParams]=useSearchParams();
    const recipe_id = useParams.get('id');

    console.log(recipe_id)
    console.log(ingredients)

    useEffect(() => {
        const fetchRecipe = async () => {
                setLoading(true)
                try{
                    const response = await fetch(`https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=${API_KEY}&includeNutrition=true`);
                    const data = await response.json();
                    setRecipe(data);
                    setIngredients(data.extendedIngredients);
                } catch{
                    console.error('Error fetching recipe data');
                } finally {
                    setLoading(false)
                }
        }
        fetchRecipe();
    }, []);
    return(
        <div className="h-[900px] bg-green-50 w-full">
            {loading? (
                <p>Loading...</p>
            ): (
                <div>
                    {recipe && (
                        <div>
                            <div className="relative ">
                                <img src={recipe.image} alt={recipe.title}  className="w-full h-96 object-fill"/>
                                <div className="bg-green-600 h-24 w-64 px-4 py-5 rounded-lg absolute bottom-10 left-14">
                                    <p className=" text-xl text-white">{recipe.title}</p>
                                    <div className="flex  flex-row items-center space-x-1">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                                                <path
                                                    fill="#FFD700"
                                                    stroke="#E5C100"
                                                    stroke-width="1"
                                                    d="M12 2l3.09 7.26 7.94 1.02-5.81 5.45 1.58 8.26-7.26-3.6-7.26 3.6 1.58-8.26-5.81-5.45 7.94-1.02z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-base text-white font-semibold">{(recipe.spoonacularScore / 10).toFixed(1)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" flex justify-center mt-14">
                                <div className="bg-green-600 rounded-3xl w-[500px] h-[200px] flex items-center p-10 ">
                                    <p className="text-lg text-white font-serif">
                                        Rinse the kidney beans and brown rice separately.
                                        Cover the kidney beans with water and soak for 8 hours or overnight.
                                        In a separate bowl, cover the brown rice with water and soak for 8 hours or overnight.
                                    </p>
                                </div>
                            </div>
                            <div className="p-20 relative">
                                    <div className="flex flex-row items-center gap-10">
                                        <Divider variant="middle" sx={{ width: "50%", color: "green" ,height: "10px"}} />
                                        <h1 className="text-7xl font-semibold">INGREDIENTS</h1>
                                    </div>
                                    <div className="rounded-lg w-80 bg-white mt-5 shadow-2xl absolute right-[185px] p-4">
                                        <ul>
                                            {recipe.extendedIngredients.map((ingredient)=>(
                                                <li key={ingredient.id}>
                                                    <p>{ingredient.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default RecipeDetails;

