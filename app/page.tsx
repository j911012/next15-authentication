import AuthForm from "@/components/AuthForm";

type AuthFormMode = "login" | "signup";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const modeParam = (await searchParams).mode;
  const formMode: AuthFormMode = modeParam === "signup" ? "signup" : "login";

  return <AuthForm mode={formMode} />;
}
