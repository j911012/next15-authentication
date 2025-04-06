"use server";

import { LoginFormState, SignupFormState } from "@/types/auth";
import { createUser, getUserByEmail } from "@/lib/user";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { redirect } from "next/navigation";
import { createAuthSession } from "@/lib/auth";

export async function signup(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: { email?: string; password?: string } = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect("/training");
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "Email already exists",
        },
      };
    }
    throw error; // その他のエラーはそのままスロー
  }
}

export async function login(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // ユーザーが存在するか確認
  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user, please check your credentials",
      },
    };
  }

  // パスワードを検証
  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate user, please check your credentials",
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}
