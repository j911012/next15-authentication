import { Lucia, Session, User } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

import db from "@/lib/db";
import { cookies } from "next/headers";

type AuthResult = {
  user: User | null;
  session: Session | null;
};

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export type Auth = typeof lucia;

export async function createAuthSession(userId: User["id"]): Promise<void> {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth(): Promise<AuthResult> {
  // CookieからセッションIDを取得
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
  if (!sessionCookie || !sessionCookie.value)
    return { user: null, session: null };

  // セッションを検証
  const result = await lucia.validateSession(sessionCookie.value);

  try {
    // セッションが "fresh"（新規 or 延長対象）ならCookieを更新
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    // セッションが存在しない場合、Cookieを削除
    if (!result.session) {
      const blankSessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes
      );
    }
  } catch {
    // Next.js の SSR中に Cookie を set するとエラーになることがあるので無視
  }

  return result;
}
