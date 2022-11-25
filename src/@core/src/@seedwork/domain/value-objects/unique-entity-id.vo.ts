import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { InvalidUuidError } from "../errors";

export class UniqueEntityId {
    constructor(readonly id?: string) {
        this.id = id || uuidv4();
        this.validate();
    }

    private validate() {
        const isValid = uuidValidate(this.id);
        if (!isValid) {
            throw new InvalidUuidError();
        }
    }
}

export default UniqueEntityId;
