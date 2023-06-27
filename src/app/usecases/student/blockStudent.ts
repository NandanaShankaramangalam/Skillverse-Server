import { studentRepository } from './../../../infra/repositories/studentRepository';
import { student } from "../../../domain/models/student";
import { UpdateResult } from '../../../domain/models/update';

// import { ObjectId } from 'bson'; 

// interface UpdateResult {
//   acknowledged: boolean;
//   modifiedCount: number;
//   upsertedId: ObjectId | null;
//   upsertedCount: number;
//   matchedCount: number;
// }

export const blockStud = (studentRepository: studentRepository) => async (id: string): Promise<student | UpdateResult | void> => {
  console.log('usecse id=', id);

  const blokdStuds = await studentRepository.blockStudents(id);
  console.log('blkk', blokdStuds);
  return blokdStuds;
}
