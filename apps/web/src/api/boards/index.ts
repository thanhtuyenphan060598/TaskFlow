import { request } from "../http";
import type { Board } from "@/types/task";

export async function fetchBoards(): Promise<Board[]> {
  return request<Board[]>("/api/boards", { method: "GET" });
}
