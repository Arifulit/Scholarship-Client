

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { saveUser } from "../../api/utils";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace />;
  if (loading) return <LoadingSpinner />;

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">Sign in to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="bg-lime-500 w-full rounded-md py-3 text-white"
          >
            {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Continue"}
          </button>
        </form>
        
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-lime-500 text-gray-400">Forgot password?</button>
        </div>
        
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">Login with social accounts</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer hover:bg-gray-200 transition"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{' '}
          <Link to="/signup" className="hover:underline hover:text-lime-500 text-gray-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;