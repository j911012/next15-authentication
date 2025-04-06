"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import AuthIcon from "@/public/images/auth-icon.jpg";
import { signup } from "@/actions/authActions";
import { SignupFormState } from "@/types/auth";

export type AuthFormProps = "login" | "signup";

export default function AuthForm({ mode }: { mode: AuthFormProps }) {
  const [formState, formAction] = useActionState<SignupFormState, FormData>(
    signup,
    undefined
  );

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image src={AuthIcon} alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((key) => (
            <li key={key}>
              {formState.errors?.[key as keyof typeof formState.errors]}
            </li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an account.</Link>
        )}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
