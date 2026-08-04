import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "@/api/boards";
import { boardKeys } from "@/api/query-keys";

export function useBoards() {
  return useQuery({
    queryKey: boardKeys.all,
    queryFn: fetchBoards
  });
}
