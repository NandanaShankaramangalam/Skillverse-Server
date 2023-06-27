import { student } from "../../../domain/models/student";
import { UpdateResult } from "../../../domain/models/update";
import { studentRepository } from "../../../infra/repositories/studentRepository";

export const unblockStud = (studentRepository: studentRepository) => async (id: string): Promise<student | UpdateResult | void> => {
    console.log('blkid',id);
    const unblockStuds = await studentRepository.unblockStudents(id);
    console.log('unblkk', unblockStuds);
    return unblockStuds;
}