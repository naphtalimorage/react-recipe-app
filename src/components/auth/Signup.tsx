import backgroundImage from "../../assets/Chef's Fiery Performance.jpeg"
import {Link, useNavigate} from "react-router-dom";
import {EyeOffIcon, Eye} from "lucide-react";
import {useState} from "react";
import {toast} from "react-toastify";
import {useAuth} from "../AuthContext.tsx";
import LoadingButton from "../LoadingButton.tsx";

export default function Signup() {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {login} = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try{
            const response = await fetch("https://donate-api-2.onrender.com/signup",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    fullname: formData.fullName,
                    email: formData.email,
                    phone_number: formData.phoneNumber,
                    password: formData.password,
                    confirm_password: formData.confirmPassword,
                })
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
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
                <div className="w-1/2 flex flex-col items-center justify-center p-8">
                    <h2 className="text-2xl font-bold">Foodie Delights</h2>
                    <p className="mt-2 text-green-500 text-lg font-semibold">Create Account</p>

                    <form onSubmit={handleSubmit} className="mt-6 w-full">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="full name"
                            className="w-full mb-4 rounded-lg border bg-gray-100 p-3 focus:outline-none"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full mb-4 rounded-lg border bg-gray-100 p-3 focus:outline-none"
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone number"
                            className="w-full mb-4 rounded-lg border bg-gray-100 p-3 focus:outline-none"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text": "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full mb-6 rounded-lg border bg-gray-100 p-3 focus:outline-none"
                            />
                            <button  type="button" className="absolute cursor-pointer top-1/3 right-3 -translate-y-1/2 transform cursor-pointer">
                                {showPassword ? <EyeOffIcon onClick={() => setShowPassword(false)}/>: <Eye onClick={() => setShowPassword(true)}/>}
                            </button>
                          </div>
                           <div className="relative">
                               <input
                                   type={showConfirmPassword ? "text": "password"}
                                   name="confirmPassword"
                                   value={formData.confirmPassword}
                                   onChange={handleChange}
                                   placeholder="Confirm Password"
                                   className=" w-full mb-4 rounded-lg border bg-gray-100 p-3 focus:outline-none"
                               />
                               <button type="button" className="absolute cursor-pointer top-1/3 right-3 transform -translate-y-1/2 ">
                                   {showConfirmPassword?<EyeOffIcon onClick={()=>setShowConfirmPassword(false)}/>:<Eye onClick={()=>setShowConfirmPassword(true)}/>}
                               </button>
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
