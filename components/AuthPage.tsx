import React, { useState } from 'react';

interface AuthPageProps {
  onNavigate: (page: 'home') => void; // Or to a profile page after login
}

const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true); // true for login, false for register

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for actual authentication logic
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    console.log(`${isLogin ? 'Login' : 'Register'} attempt with email: ${email}`);
    alert(`Simulated ${isLogin ? 'Login' : 'Registration'} successful!`);
    onNavigate('home'); // Navigate home after "successful" auth
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-white dark:bg-slate-800 shadow-2xl rounded-xl">
        <div>
          <div className="flex justify-center">
             <span role="img" aria-label="medical symbol" className="text-5xl text-primary-DEFAULT">⚕️</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            Or{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-primary-DEFAULT hover:text-primary-dark dark:text-primary-light dark:hover:text-primary-DEFAULT focus:outline-none focus:underline"
            >
              {isLogin ? 'create an account' : 'sign in instead'}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <label htmlFor="fullName" className="sr-only">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required={!isLogin}
                  className="input-field rounded-t-md"
                  placeholder="Full Name"
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`input-field ${isLogin ? 'rounded-t-md' : ''}`}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="input-field rounded-b-md"
                placeholder="Password"
              />
            </div>
            {!isLogin && (
                 <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required={!isLogin}
                  className="input-field rounded-b-md" // This might need adjustment if it's not the last field
                  placeholder="Confirm Password"
                />
              </div>
            )}
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-DEFAULT focus:ring-primary-light border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900 dark:text-slate-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-DEFAULT hover:text-primary-dark dark:text-primary-light dark:hover:text-primary-DEFAULT">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center btn btn-primary"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-300 dark:border-slate-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          {/* Placeholder for social logins */}
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-sm font-medium text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            aria-label="Sign in with Google"
          >
            {/* Replace with actual Google SVG icon */}
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M47.5201 24.5599C47.5201 22.9099 47.3801 21.3499 47.0901 19.8699H24.2001V28.6599H37.4801C36.9201 31.3799 35.3301 33.6699 33.0101 35.1299V40.5099H40.2001C44.7801 36.3499 47.5201 30.9699 47.5201 24.5599Z" fill="#4285F4"/><path fillRule="evenodd" clipRule="evenodd" d="M24.2001 48.0001C30.8301 48.0001 36.3801 45.8301 40.2001 42.5101L33.0101 37.1301C30.9101 38.5101 27.8901 39.4001 24.2001 39.4001C17.8801 39.4001 12.5201 35.0601 10.6301 29.3001H3.22012V34.7901C7.01012 42.4401 15.0401 48.0001 24.2001 48.0001Z" fill="#34A853"/><path fillRule="evenodd" clipRule="evenodd" d="M10.63 29.3001C10.19 27.9801 9.94998 26.5701 9.94998 25.0001C9.94998 23.4301 10.19 22.0201 10.63 20.7001V15.2101H3.22002C1.74002 18.0801 0.879974 21.4001 0.879974 25.0001C0.879974 28.6001 1.74002 31.9201 3.22002 34.7901L10.63 29.3001Z" fill="#FBBC05"/><path fillRule="evenodd" clipRule="evenodd" d="M24.2001 10.6001C28.3601 10.6001 31.2401 12.1101 32.7901 13.5801L40.3901 6.21012C36.3801 2.66012 30.8301 0.00012207 24.2001 0.00012207C15.0401 0.00012207 7.01012 5.56012 3.22012 13.2101L10.6301 18.7001C12.5201 12.9401 17.8801 10.6001 24.2001 10.6001Z" fill="#EA4335"/></svg>
            Google
          </button>
          {/* Add more social login buttons as needed */}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
