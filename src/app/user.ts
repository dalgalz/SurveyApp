import { Survey } from './survey';

export class User {
    _id: string;
    name: string;
    email: string;
    password: string;
    surveys: Survey[];
    constructor(){ }
}
