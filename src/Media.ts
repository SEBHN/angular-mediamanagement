import {Tag} from "./Tag";

export class Media {

    constructor(private id: String, private name: String, private file: String, private fileExtension: String, private filePath: String, private tags : Tag[]) {
    }


}