import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ClassValidatorFields } from "../class-validator-fields";

class StubRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    constructor(data: any) {
        Object.assign(this, data);
    }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
    validate(data: any): boolean {
        return super.validate(new StubRules(data));
    }
}

describe("Class Validator Fields Integration Tests", () => {
    it("should validate with errors", async () => {
        const validator = new StubClassValidatorFields();

        expect(validator.validate({})).toBeFalsy();
        expect(validator.validatedData).toBeNull();
        expect(validator.errors).toStrictEqual({
            name: [
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
            price: [
                "price should not be empty",
                "price must be a number conforming to the specified constraints",
            ],
        });
    });

    it("should be valid", async () => {
        const validator = new StubClassValidatorFields();

        expect(validator.validate({ name: "name", price: 1 })).toBeTruthy();
        expect(validator.validatedData).toStrictEqual(
            new StubRules({ name: "name", price: 1 })
        );
        expect(validator.errors).toBeNull();
    });
});
