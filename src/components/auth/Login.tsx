import backgroundImage from "../../assets/Chef's Fiery Performance.jpeg"
import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";
import { toast } from 'react-toastify';
import {useAuth} from "../AuthContext.tsx";
import LoadingButton from "../LoadingButton.tsx";
import {Eye, EyeOffIcon} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useForm} from "react-hook-form";

const formSchema = z.object({
    email: z.string().trim().nonempty("Email address is required.").email("Please enter a valid email address."),
    password: z.string().trim().nonempty("Password is required.").min(8, "Password must be at least 6 characters long."),
})



export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const {login} = useAuth();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: { errors },} = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try{
            const response = await fetch("https://donate-api-2.onrender.com/login",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(values)
            })
            const data = await response.json();
            if(response.ok){
                toast.success(data.message)
                login(data.token)
                navigate("/")
            } else{
                throw new Error(data.error || "An unexpected error occurred.");
            }

        } catch (error){
            if (error instanceof Error) {
                toast.error(error.message || "Network error");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false)
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-green-50">
            <div className="flex max-w-4xl rounded-lg bg-white shadow-2xl">
                {/* Left Section - Image and Welcome Text */}
                <div className="relative md:w-1/2 w-full">
                    <img
                        src={backgroundImage}
                        alt="Delicious Food"
                        className="h-full w-full rounded-l-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center px-6 text-white">
                        <h1 className="text-5xl font-bold">Welcome Back !</h1>
                        <p className="mt-2 text-lg text-slate-200">
                            Indulge your taste buds at Foodie Delights, where every flavor tells a delicious story.
                        </p>
                    </div>
                </div>

                {/* Right Section - Signup Form */}
                <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-8">
                    <h2 className="text-2xl font-bold">Foodie Delights</h2>
                    <p className="mt-2 text-green-500 text-lg font-semibold">Login</p>

                    <form onSubmit={handleSubmit(onSubmit)}  className="mt-6 w-full">
                        <div className="mb-3">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                className="w-full  rounded-lg border bg-gray-100 p-3 focus:outline-none"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="mb-6  relative">
                            <label htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text": "password"}
                                    {...register("password")}
                                    name="password"
                                    placeholder="Password"
                                    className="w-full  rounded-lg border bg-gray-100 p-3 focus:outline-none"
                                />
                                <button  type="button" onClick={toggleShowPassword} className="absolute  top-1/2 right-3 -translate-y-1/2 transform cursor-pointer">
                                    {showPassword ? <EyeOffIcon/>: <Eye/>}
                                </button>
                            </div>
                            <span>{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}</span>
                        </div>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            variant="contained"
                            color="success"
                            className="w-full rounded-lg bg-green-500 py-3 text-white font-semibold hover:bg-green-600"
                        >
                            {loading? "Logging in..." : "Login"}
                        </LoadingButton>
                            <Link to="/forgot-password"  className="text-sm text-center flex justify-end text-green-700 mt-4 hover:underline">
                                Forgot your password?{" "}
                            </Link>
                        <p className="text-sm text-center flex justify-center text-black mt-4">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-green-700 cursor-pointer" >
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
