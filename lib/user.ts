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
