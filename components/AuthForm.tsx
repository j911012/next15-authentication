"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import AuthIcon from "@/public/images/auth-icon.jpg";
import { signup } from "@/actions/authActions";
import { SignupFormState } from "@/types/auth";

export default function AuthForm() {
  const [formState, formAction] = useActionState<SignupFormState, FormData>(
    signup,
    {}
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
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors ?? {}).map((key) => (
            <li key={key}>{formState.errors?.[key]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
