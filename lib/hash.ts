import crypto from "node:crypto";

/**
 * パスワードをハッシュ化して返す（形式: hashed:salt）
 */
export function hashUserPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto.scryptSync(password, salt, 64);

  return `${hashedPassword.toString("hex")}:${salt}`;
}

/**
 * 入力されたパスワードが保存済みハッシュと一致するかチェック
 */
export function verifyPassword(
  storedPassword: string,
  suppliedPassword: string
): boolean {
  const [hashedPassword, salt] = storedPassword.split(":");

  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);

  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
