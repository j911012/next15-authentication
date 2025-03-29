import db from "@/lib/db";

export type Training = {
  id: number;
  title: string;
  image: string;
  description: string;
};

export function getTrainings() {
  const stmt = db.prepare<[], Training>("SELECT * FROM trainings"); // prepare<[], Training>() の Training は1行あたりの型
  const trainings = stmt.all(); //.all() は Training[] を返すと型推論される

  return trainings;
}
