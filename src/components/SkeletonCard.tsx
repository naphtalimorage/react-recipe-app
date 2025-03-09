import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import {CardFooter} from "@material-tailwind/react";
import CardMedia from "@mui/material/CardMedia";

export default function SkeletonCard() {
    return (
        <Card className=" w-[240px] max-h-[250px] border-none shadow-none rounded-none">
            <CardMedia className="h-[140px]">
                <Skeleton variant="rectangular" animation="wave" width={240} height={140} />
            </CardMedia>
            <CardFooter className=" h-10 mb-4 mt-2 border-none shadow-none rounded-none">
                <Skeleton className=" h-4 w-48" />
                <Skeleton className=" h-4 w-48" />
            </CardFooter>
        </Card>
    );
}
