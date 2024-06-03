import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "../components/TextField";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useSignInMutation } from "../api/auth/authApi";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
  login: z.string().min(1, "Login is required"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormFeilds = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState<string>("");

  const { authenticate } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFeilds>({
    resolver: zodResolver(signInSchema),
  });

  const [triggerSignIn, { isLoading }] = useSignInMutation();

  const submitHandler = (data: SignInFormFeilds) => {
    triggerSignIn(data)
      .unwrap()
      .then((data) => {
        authenticate(data.token);
        navigate("/");
      })
      .catch((err) => setRequestError(err.data.message));
  };

  return (
    <form
      className="w-full max-w-auth-form p-8 border-2 rounded-xl"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="mb-7 text-center text-2xl text-chat-gray-strength font-semibold">
        Sign In
      </h2>
      <div className="mb-6 flex flex-col gap-3">
        <TextField
          {...register("login")}
          label="Login"
          error={errors.login?.message}
        />
        <TextField
          {...register("password")}
          type="password"
          label="Password"
          error={errors.password?.message}
        />
      </div>
      <p className="my-7 text-center text-red-400 text-sm">{requestError}</p>
      <p className="mb-7 text-center text-chat-gray-strength">
        Don't have an account?{" "}
        <Link
          to="/auth/sign-up"
          className="text-chat-blue-normal font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : "Sign In"}
      </Button>
    </form>
  );
};

export default SignInPage;
