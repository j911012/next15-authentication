import { Metadata } from "next";
import "../globals.css";
import { logout } from "@/actions/authActions";

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function AuthLayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header id="auth-header">
        <p>Welcome back!</p>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
