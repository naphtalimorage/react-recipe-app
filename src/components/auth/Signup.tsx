import backgroundImage from "../../assets/Chef's Fiery Performance.jpeg"
import {Link, useNavigate} from "react-router-dom";
import {EyeOffIcon, Eye} from "lucide-react";
import {useState} from "react";
import {toast} from "react-toastify";
import {useAuth} from "../AuthContext.tsx";
import LoadingButton from "../LoadingButton.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const formSchema = z.object({
    fullName: z.string().nonempty("Full name is required."),
    email: z.string().nonempty("Email is required.").email("Please enter a valid email address."),
    phoneNumber: z.string().nonempty("Phone number is required."),
    password: z.string().nonempty("Password is required.").min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string().nonempty("Confirm password is required.").min(8, "Password must be at least 8 characters long."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})

export default function Signup() {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const {login} = useAuth();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try{
            const response = await fetch("https://donate-api-2.onrender.com/signup",{
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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-green-50">
            <div className="flex max-w-4xl rounded-lg bg-white shadow-2xl">
                {/* Left Section - Image and Welcome Text */}
                <div className="relative w-1/2">
                    <img
                        src={backgroundImage}
                        alt="Delicious Food"
                        className="h-full w-full rounded-l-lg object-cover"
                    />

                </div>

                {/* Right Section - Signup Form */}
                <div className="w-1/2 flex flex-col items-center justify-center px-8 py-2">
                    <h2 className="text-2xl font-bold">Foodie Delights</h2>
                    <p className="text-green-500 text-lg font-semibold">Create Account</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full">
                       <div className="mb-3">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                 type="text"
                                 placeholder="Full Name"
                                 {...register("fullName")}
                                 name="fullName"
                                 className="w-full  rounded-lg border bg-gray-100 p-3 focus:outline-none"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                       </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                name="email"
                                className="w-full  rounded-lg border bg-gray-100 p-3 focus:outline-none"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber">Phone</label>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                {...register("phoneNumber")}
                                name="phoneNumber"
                                className="w-full  rounded-lg border bg-gray-100 p-3 focus:outline-none"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                        </div>
                        <div className="relative mb-3">
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
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                          </div>
                           <div className="relative mb-3">
                               <label htmlFor="confirmPassword">Confirm Password</label>
                               <div className="relative">
                                   <input
                                       type={showPassword ? "text": "password"}
                                       {...register("confirmPassword")}
                                       name="confirmPassword"
                                       placeholder="confirmPassword"
                                       className="w-full  rounded-lg border bg-gray-100 p-3 focus:outline-none"
                                   />
                                   <button  type="button" onClick={toggleShowPassword} className="absolute  top-1/2 right-3 -translate-y-1/2 transform cursor-pointer">
                                       {showPassword ? <EyeOffIcon/>: <Eye/>}
                                   </button>
                               </div>
                                 {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                           </div>

                        <LoadingButton
                            type="submit"
                            loading={loading}
                            variant="contained"
                            color="success"
                            className="w-full rounded-lg bg-green-500 py-3 text-white font-semibold hover:bg-green-600"
                        >
                            {loading? "Creating Account..." : "Create Account"}
                        </LoadingButton>
                        <p className="text-sm text-center flex justify-center text-black mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-green-700 cursor-pointer" >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
