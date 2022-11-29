import { InvalidUuidError } from "./../../errors";
import UniqueEntityId from "./../unique-entity-id.vo";
import { validate } from "uuid";

const spyValidateMethod = jest.spyOn(
    UniqueEntityId.prototype as any,
    "validate"
);

describe("UniqueEntityId Unit Tests", () => {
    it("should throw error when uuid is invalid", () => {
        expect(() => new UniqueEntityId("invalid-uuid")).toThrowError(
            new InvalidUuidError()
        );
        expect(spyValidateMethod).toHaveBeenCalledTimes(1);
    });

    it("should accept a uuid passed in constructor", async () => {
        const uuid = "c0a80121-7ac2-4fd6-8c9a-86f8025400e0";
        const valueObject = new UniqueEntityId(uuid);
        expect(valueObject.value).toBe(uuid);
        expect(spyValidateMethod).toHaveBeenCalledTimes(1);
    });

    it("should create a uuid if no uuid passed in constructor", async () => {
        const valueObject = new UniqueEntityId();
        expect(validate(valueObject.value)).toBeTruthy();
        expect(spyValidateMethod).toHaveBeenCalledTimes(1);
    });
});
