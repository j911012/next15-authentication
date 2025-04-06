import { UserRecord } from "@/types/auth";
import db from "./db";
import crypto from "node:crypto";

export function createUser(email: string, password: string) {
  // Lucia の User["id"] はデフォルトで string 型 を期待しているため、
  const id = crypto.randomUUID(); // ここでstring型のIDを生成

  db.prepare("INSERT INTO users (id, email, password) VALUES (?, ?, ?)").run(
    id,
    email,
    password
  );

  return id; // 追加されたユーザーのIDを返す
}

export function getUserByEmail(email: string): UserRecord | undefined {
  return (
    db
      .prepare("SELECT * FROM users WHERE email = ?")
      // better-sqlite3 の .get() メソッドの戻り値が unknown 型となっているため、適切に型アサーション
      .get(email) as UserRecord | undefined
  );
}
