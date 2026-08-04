import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, fetchTasks, updateTask } from "@/api/tasks";
import { taskKeys } from "@/api/query-keys";

type UseTasksOptions = {
  onCreateSuccess?: () => void;
  onUpdateSuccess?: () => void;
  onDeleteSuccess?: () => void;
};

export function useTasks(options?: UseTasksOptions) {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: taskKeys.all,
    queryFn: fetchTasks
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.all });
      options?.onCreateSuccess?.();
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.all });
      options?.onUpdateSuccess?.();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.all });
      options?.onDeleteSuccess?.();
    }
  });

  return {
    tasks: tasksQuery.data,
    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,
    createTask: createMutation,
    updateTask: updateMutation,
    deleteTask: deleteMutation
  };
}
