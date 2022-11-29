import { UniqueEntityId } from "../value-objects";
import Entity from "./entity";
import { validate as uuidValidate } from "uuid";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity Unit Tests", () => {
    it("should set props and id", async () => {
        const arrange = { prop1: "prop1", prop2: 2 };
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBe(entity.uniqueEntityId.value);
        expect(uuidValidate(entity.id)).toBe(true);
    });

    it("should accept a valid uuid", async () => {
        const arrange = { prop1: "prop1", prop2: 2 };
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.value);
    });

    it("should convert a entity to a Javascript Object", async () => {
        const arrange = { prop1: "prop1", prop2: 2 };
        const entity = new StubEntity(arrange);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange,
        });
    });
});
