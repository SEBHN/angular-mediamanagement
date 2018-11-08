import {Tag} from "./Tag";

export class Media {

    constructor(public id: String, public name: String, public file: String, public fileExtension: String, public filePath: String, public tags : Tag[]) {
    }


}