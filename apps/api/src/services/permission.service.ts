import { notFound, forbidden } from "../lib/errors.js";
import { taskRepository } from "../repositories/task.repository.js";
import { membershipRepository } from "../repositories/membership.repository.js";

export const permissionService = {
    async assertCanModifyTask(taskId: string, userId: string) {
        const task = await taskRepository.findAuthorAndWorkspaceId(taskId);

        if(!task) {
            throw notFound(`Task with id ${taskId} not found`);
        }

        if(task.authorId === userId) {
            return;
        }

        const workspaceId = task.board.project.workspaceId
        const membership = await membershipRepository.findByUserAndWorkspace(userId, workspaceId);

        if(membership?.role === "OWNER" || membership?.role === "ADMIN") {
            return
        }

        throw forbidden("You don't have permission to modify this task");
        
    }
}