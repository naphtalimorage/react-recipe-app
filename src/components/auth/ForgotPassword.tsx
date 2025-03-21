import backgroundImage from "../../assets/Chef's Fiery Performance.jpeg"
import {useState} from "react";
import { toast } from 'react-toastify';
import LoadingButton from "../LoadingButton.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useForm} from "react-hook-form";

const formSchema = z.object({
    email: z.string().nonempty("Email address is required").email("Please enter a valid email")
})

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, formState: { errors }} = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try{
            const response = await fetch("https://donate-api-2.onrender.com/forgot-password",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(values)
            })
            const data = await response.json();
            if(response.ok){
                toast.success(data.message)
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
                </div>

                {/* Right Section - Signup Form */}
                <div className="md:w-1/2 w-full flex flex-col p-8">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-bold">Foodie Delights</h2>
                        <p className="mt-2 text-green-500 text-lg font-semibold">Reset Password</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}  className="mt-6 w-full">
                        <div className="mb-6">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                name="email"
                                placeholder="Email your email "
                                className="w-full  rounded-lg border bg-gray-100 p-3 focus:outline-none"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            variant="contained"
                            color="success"
                            className="w-full rounded-lg bg-green-500 py-3 text-white font-semibold hover:bg-green-600"
                        >
                            {loading? "Submitting..." : "Submit"}
                        </LoadingButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
