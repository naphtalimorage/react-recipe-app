import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Clock, Heart} from "lucide-react";

interface PropType {
    Image: string;
    Title: string;
    Time: number;
    Price: number;
    Ratings: number;
    vegetarian: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    isLiked?: boolean;
}

export default function RecipeCard({Image, Title, Time, Price,Ratings,vegetarian, glutenFree, dairyFree, isLiked}: PropType) {
    const formatTime = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours > 0 ? `${hours}hr ` : ""}${minutes}min`;
    };
    return (
        <Card className="w-[240px] h-[250px] ">
            <CardMedia
                sx={{ height: 140 }}
                image={Image}
                title={Title}
                className="relative transform  hover:scale-105 transition-transform duration-300 ease-in"
            >
                <div className="absolute cursor-pointer active:scale-90 w-7 h-7 rounded-full flex justify-center items-center  top-1  left-5/6 bg-white  z-10">
                    {!isLiked? (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="#4CAF50"
                                className="absolute"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </>
                    ):(<Heart size={18}/>)}
                </div>
                <div className="absolute  space-x-2  bg-white w-fit h-5 p-1 rounded-full flex items-center top-4/5 left-2.5  z-10">
                    <Clock size={16}/>
                   <p className="text-sm"> {formatTime(Time)}</p>
                </div>
            </CardMedia>
            <CardContent>
                <Typography  className="flex flex-row items-center justify-between ">
                    <p className="text-base font-semibold max-w-[160px]  overflow-hidden whitespace-nowrap text-ellipsis">{Title}</p>
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
                            <p className="text-sm font-semibold">{(Ratings / 10).toFixed(1)}</p>
                        </div>
                    </div>
                </Typography>
                <Typography>
                    <div className="flex  justify-between mt-1">
                        <p className='text-sm text-green-600 font-semibold'>${Price}</p>
                        <h1 className="text-sm text-slate-500">{vegetarian ? "🥬 Veg": "🥩 Non Veg"}</h1>
                    </div>
                    <div className="mt-2 flex flex-row space-x-2">
                        {glutenFree ? (
                            <p className=" text-sm px-2 w-24 h-6 bg-green-600 flex items-center  text-white rounded-full">{glutenFree? "Gluten free" : null}</p>
                        ): null}
                        {dairyFree ? (
                            <p className=" text-sm px-2 w-24 h-6 bg-green-600 flex items-center  text-white rounded-full">{dairyFree? "Dairy free" : null}</p>
                        ): null}
                    </div>
                </Typography>
            </CardContent>
        </Card>
    );
}