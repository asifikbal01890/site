import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { logIn, signUpWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        logIn(data.email, data.password)
            .then((result) => {
                console.log("Login Successful!", result.user);
                Swal.fire({
                    title: "Login Successful!",
                    text: "Welcome back!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/");
                });
            })
            .catch((error) => {
                console.error("Login Error:", error.message);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            });
    };

    const handleGoogleSignIn = () => {
        signUpWithGoogle()
            .then((result) => {
                console.log("Google Sign-in Success:", result.user);
                Swal.fire({
                    title: "Google Sign-In Successful!",
                    text: "You are now logged in.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/");
                });
            })
            .catch((error) => {
                console.error("Google Sign-in Error:", error);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            });
    };

    return (
        <section className=" min-h-screen flex justify-center items-center px-4 mt-5">
            <div className="bg-blue-50 rounded-2xl flex flex-col max-w-md w-full p-6 items-center shadow-lg">
                <h2 className="font-bold text-3xl text-gray-800 text-center">Login</h2>
                <p className="text-sm mt-2 text-gray-800 text-center">
                    If you already a member, easily log in now.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                  
                    <label className="text-gray-800 font-medium">Email</label>
                    <input
                        className="p-2 rounded-xl border w-full text-center"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="text-red-500 text-xs">Email is required</p>}

                    <label className="text-gray-800 font-medium">Password</label>
                    <div className="relative w-full">
                        <input
                            className="p-2 rounded-xl border w-full text-center"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />
                        {showPassword ? (
                            <FiEyeOff
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                size={20}
                            />
                        ) : (
                            <BsEye
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                size={20}
                            />
                        )}
                    </div>
                    {errors.password && <p className="text-red-500 text-xs">Password is required</p>}

                   
                    <button
                        className="bg-cyan-500 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium w-full"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 w-full">
                    <hr className="border-gray-300" />
                    <p className="text-center text-sm my-2">OR</p>
                    <hr className="border-gray-300" />
                </div>
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center gap-2 p-2 rounded-lg mt-4 hover:bg-gray-200"
                >
                    <FcGoogle size={22} /> Login with Google
                </button>
                <div className="mt-4 text-sm border-b border-gray-500 py-4 text-center cursor-pointer w-full">
                    Forgot password?
                </div>
                <div className="mt-4 text-sm flex flex-col items-center w-full">
                    <p>Don't have an account?</p>
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-cyan-500 text-white px-5 py-2 rounded-xl hover:scale-110 hover:bg-[#206ab1] font-semibold duration-300 mt-2">Register
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Login;
