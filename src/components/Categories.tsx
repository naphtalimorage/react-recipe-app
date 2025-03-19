import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import React from 'react';
// import Button from "@mui/material/Button";
import {User, Coffee, Soup, ForkKnife, Salad,IceCream,Cookie} from "lucide-react";
import RecipeCard from "./RecipeCard.tsx";
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

const Categories = () => {
    const API_KEY = "9d3d1523d92141cab18c37ad68fc707a"
    const categoryList = [
        { name: "All", items: 235, icon: User },
        { name: "Main Course", items: 20, icon: User },
        { name: "Breakfast", items: 30, icon: Coffee },
        { name: "Soup", items: 10, icon: Soup },
        { name: "Appetizer", items: 10, icon: ForkKnife },
        { name: "Salad", items: 25, icon: Salad },
        { name: "Dessert", items: 35, icon: IceCream },
        { name: "Snack", items: 16, icon: Cookie },
        // { name: "Beverage", items: 28, icon: Home },
        // { name: "Sauce", items: 31, icon: Plus },
        // { name: "Burger", items: 13, icon: User },
        // { name: "Pasta", items: 19, icon: Bookmark },
    ];
    const [categories, setCategories] = useState<RecipeType []>([]);
    const [selectedCategory, setSelectedCategory] = useState("Breakfast")
    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState<string[]>([]);
    console.log(favorites);

    useEffect(() => {
       const fetchRecipe = async () => {
           if(selectedCategory){
               setLoading(true)
              try{
                  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&type=${selectedCategory}&number=25&addRecipeInformation=true`);
                  const data = await response.json();
                  setCategories(data.results);
              } catch{
                  console.error('Error fetching recipe data');
              } finally {
                   setLoading(false)
              }
           }
       }
       fetchRecipe();
    }, [selectedCategory]);

    const handleBookmarkClick = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((favId) => favId !== id) // Remove if already favorited
                : [...prev, id] // Add if not favorited
        );
    };

    return(
        <div>
            <div className="flex flex-row gap-3 ">
                {categoryList.map((category) => (
                    <NavLink to=""
                         key={category.name}
                         className={`flex  flex-col w-24 space-y-3  rounded-2xl shadow-2xl bg-card gap-2 px-3 py-2 hover:scale-105 active:scale-95 ${selectedCategory === category.name ? "bg-green-200" : ""}`}
                         onClick={() => setSelectedCategory(category.name)}
                    >
                        {React.createElement(category.icon, { size: 30 })}
                        <span>
                            <p className="font-bold text-xs">{category.name}</p>
                            <p className="flex flex-row text-slate-400 text-sm">{category.items} items</p>
                        </span>
                    </NavLink>
                ))}
            </div>
            <div className="mt-10">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3  gap-4">
                        {Array.from({length: 25}).map((_, index) => (
                            <SkeletonCard key={index}/>
                        ))}
                    </div>
                ): (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <div key={category.id}>
                                    <RecipeCard
                                        {...category}
                                        id={category.id}
                                        isFavorited={favorites.includes(category.id)}
                                        handleBookmarkClick={() => handleBookmarkClick(category.id)}
                                        Image={category.image}
                                        Title={category.title}
                                        Time={category.readyInMinutes}
                                        Price={category.pricePerServing}
                                        Ratings={category.spoonacularScore}
                                        vegetarian={category.vagetarian}
                                        glutenFree={category.glutenFree}
                                        dairyFree={category.dairyFree}
                                    />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Categories;