import React, { useState } from "react";
import TextField from "../components/TextField";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "../api/auth/authApi";
import Loader from "../components/Loader";
import FileSelect from "../components/FileSelect";
import { useAuth } from "../hooks/useAuth";

const signUpSchema = z
  .object({
    login: z.string().min(3, "Login must have at least 3 symbols"),
    password: z.string().min(8, "Password must have at least 8 symbols"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is requiered"),
    secondName: z.string().min(1, "Second name is required"),
    avatarFile: z
      .any()
      .refine(
        (files: FileList) => {
          return (
            !files[0] ||
            files[0].type === "image/jpeg" ||
            files[0].type === "image/jpg"
          );
        },
        {
          message: "Only .jpeg format is supported",
        }
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormFields = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState<string>("");

  const { authenticate } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpSchema),
  });

  const [triggerSignUp, { isLoading }] = useSignUpMutation();

  const submitHandler = (data: SignUpFormFields) => {
    console.log(data);

    const { avatarFile, ...requestData } = data;
    const file = avatarFile && avatarFile[0];

    triggerSignUp({ ...requestData, avatarFile: file })
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
        Sign Up
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
        <TextField
          {...register("confirmPassword")}
          type="password"
          label="Confirm Password"
          error={errors.confirmPassword?.message}
        />
        <div className="flex gap-3">
          <TextField
            {...register("firstName")}
            label="First Name"
            error={errors.firstName?.message}
          />
          <TextField
            {...register("secondName")}
            label="Second Name"
            error={errors.secondName?.message}
          />
        </div>
        <FileSelect
          {...register("avatarFile")}
          label="Avatar"
          error={errors.avatarFile?.message as string}
        />
      </div>
      <p className="my-7 text-center text-red-400 text-sm">{requestError}</p>
      <p className="mb-7 text-center text-chat-gray-strength">
        Have an account?{" "}
        <Link
          to="/auth/sign-in"
          className="text-chat-blue-normal font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpPage;
