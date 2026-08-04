import { boardRepository } from "../repositories/board.repository.js";


export const boardService = {
    async findAllForUser(userId: string) {
        return boardRepository.findAllForUser(userId);
    }
}