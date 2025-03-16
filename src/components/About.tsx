import ChefImage from "../assets/Chef's Fiery Performance.jpeg"
const AboutUs = () => {
    return (
        <div className="h-200vh bg-green-50 w-full p-4">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto my-10">
                {/* Left Side - Image */}
                <div className="md:w-1/2">
                    <img
                        src={ChefImage}
                        alt="Chefs cooking"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side - Text */}
                <div className="md:w-1/2 p-6 flex flex-col border">
                    <h2 className="text-5xl font-semibold font-sans mb-8">About us</h2>
                    <p className="text-gray-700 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    </p>
                    <p className="text-gray-700 mb-4">
                        Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-gray-700 mb-10">
                        Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300">
                        Learn more
                    </button>
                </div>
            </div>
        </div>

    );
};

export default AboutUs;
