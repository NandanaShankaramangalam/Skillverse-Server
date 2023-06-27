import { tutor } from '../../../domain/models/tutor';
import { UpdateResult } from '../../../domain/models/update';
import { tutorRepository } from './../../../infra/repositories/tutorRepository';


export const blockTut = (tutorRepository:tutorRepository)=> async (id: string): Promise<tutor | UpdateResult | void> => {
    console.log('usese tut id=', id);

    const blokdTuts = await tutorRepository.blockTutors(id);
    console.log('blkk', blokdTuts);
    return blokdTuts;
}