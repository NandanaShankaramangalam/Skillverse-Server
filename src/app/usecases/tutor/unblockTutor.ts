import { tutor } from '../../../domain/models/tutor';
import { UpdateResult } from '../../../domain/models/update';
import { tutorRepository } from './../../../infra/repositories/tutorRepository';
export const unblockTut = (tutorRepository:tutorRepository)=> async (id: string): Promise<tutor | UpdateResult | void> => {
    console.log('unblkid',id);
    const unblockTuts = await tutorRepository.unblockTutors(id);
    console.log('unblkk', unblockTuts);
    return unblockTuts;
}