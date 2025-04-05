"use server";

import { SignupFormState } from "@/types/auth";
import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";
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
