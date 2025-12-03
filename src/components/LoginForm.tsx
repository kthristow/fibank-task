import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues, loginSchema } from "../lib/validation";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
    login(data.username);
    const from =
      (location.state as { from?: { pathname: string } })?.from?.pathname ||
      "/table";
    navigate(from, { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md rounded-xl bg-white p-8 shadow-md"
    >
      <h1 className="mb-6 text-center text-2xl font-semibold">
        Fibank Demo Login
      </h1>

      <div className="mb-4">
        <label
          htmlFor="username"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          {...register("username")}
          ref={(e) => {
            register("username").ref(e);
            usernameInputRef.current = e;
          }}
          className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 ${
            errors.username ? "border-red-400" : "border-slate-300"
          }`}
          placeholder="Enter username"
        />
        {errors.username && (
          <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 ${
            errors.password ? "border-red-400" : "border-slate-300"
          }`}
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={`flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${
          !isValid || isSubmitting
            ? "cursor-not-allowed bg-slate-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">
        Username &amp; password must be between 4 and 30 characters.
      </p>
    </form>
  );
};

export default LoginForm;
