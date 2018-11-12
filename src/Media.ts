import {Tag} from "./Tag";

export class Media {

    constructor(public id: string, public name: string, public fileId: string, public fileExtension: string, public filePath: string, public tags : Tag[]) {
    }


}