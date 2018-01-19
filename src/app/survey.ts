import { User } from './user';
import { PollOption } from './polloption';

export class Survey {
    _id: string;
    question: string;
    pollOptions: any[] = [ 
    {answer: '', vote: 0},
    {answer: '', vote: 0},
    {answer: '', vote: 0},
    {answer: '', vote: 0}];
    user: User;
    isOwnedByUser: boolean;
    constructor(){ }
}
