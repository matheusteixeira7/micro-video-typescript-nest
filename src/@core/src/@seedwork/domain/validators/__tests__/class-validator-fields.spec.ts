import { ClassValidatorFields } from "../class-validator-fields";
import * as libClassValidator from "class-validator";

class StubClassValidatorFields extends ClassValidatorFields<{
    field: string;
}> {}

describe("Class Validator Fields Unit Tests", () => {
    it("should initialize errors and validatedData as null", async () => {
        const validator = new StubClassValidatorFields();

        expect(validator.errors).toBeNull();
        expect(validator.validatedData).toBeNull();
    });

    it("should validate with errors", async () => {
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
        spyValidateSync.mockReturnValue([
            {
                property: "field",
                constraints: {
                    isNotEmpty: "field should not be empty",
                },
            },
        ]);

        const validator = new StubClassValidatorFields();

        expect(validator.validate(null)).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toBeNull();
        expect(validator.errors).toStrictEqual({
            field: ["field should not be empty"],
        });
    });

    it("should validate without errors", async () => {
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
        spyValidateSync.mockReturnValue([]);

        const validator = new StubClassValidatorFields();

        expect(validator.validate({ field: "value" })).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toStrictEqual({ field: "value" });
        expect(validator.errors).toBeNull();
    });
});
