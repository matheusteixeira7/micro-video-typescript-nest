import { UniqueEntityId } from "../value-objects";

export default abstract class Entity<Props> {
    public readonly uniqueEntityId: UniqueEntityId;

    constructor(readonly props: Props, id?: UniqueEntityId) {
        this.uniqueEntityId = id || new UniqueEntityId();
    }

    get id(): string {
        return this.uniqueEntityId.value;
    }

    toJSON(): Required<{ id: string } & Props> {
        return {
            id: this.id,
            ...this.props,
        } as Required<{ id: string } & Props>;
    }
}
