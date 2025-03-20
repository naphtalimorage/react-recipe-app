import backgroundImage from "../../assets/Chef's Fiery Performance.jpeg"
import {useState} from "react";
import { toast } from 'react-toastify';
import LoadingButton from "../LoadingButton.tsx";
import {useSearchParams, useNavigate}   from "react-router-dom";
import {Eye, EyeOffIcon} from "lucide-react";


export default function ResetPassword() {
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [useParams] = useSearchParams()
    const navigate = useNavigate()

    const token = useParams.get("token");
    console.log(password);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try{
            const response = await fetch("https://donate-api-2.onrender.com/reset-password",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    newPassword: password,
                    token: token
                })
            })
            const data = await response.json();
            if(response.ok){
                toast.success(data.message)
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

                    <form onSubmit={handleSubmit}  className="mt-6 w-full">
                        <div className="relative">
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? "text": "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full mb-6 rounded-lg border bg-gray-100 p-3 focus:outline-none"
                            />
                            <button  type="button" className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 transform cursor-pointer">
                                {showPassword ? <EyeOffIcon onClick={() => setShowPassword(false)}/>: <Eye onClick={() => setShowPassword(true)}/>}
                            </button>
                        </div>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            variant="contained"
                            color="primary"
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
