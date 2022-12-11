import {
    CategoryRules,
    CategoryValidator,
    CategoryValidatorFactory,
} from "../category.validator";

describe("Category Validator Tests", () => {
    let validator: CategoryValidator;

    beforeEach(() => {
        validator = CategoryValidatorFactory.create();
    });

    test("invalidation cases for name field", async () => {
        const EmptyError = "name should not be empty";
        const stringError = "name must be a string";
        const maxLengthError =
            "name must be shorter than or equal to 255 characters";

        const arrange = [
            { data: null, error: [EmptyError, stringError, maxLengthError] },
            { data: "", error: [EmptyError] },
            { data: 5, error: [stringError, maxLengthError] },
            { data: true, error: [stringError, maxLengthError] },
            { data: false, error: [stringError, maxLengthError] },
            { data: "t".repeat(256), error: [maxLengthError] },
        ];

        for (const item of arrange) {
            expect({
                validator,
                data: { name: item.data },
            }).containsErrorMessages({
                name: item.error,
            });
        }
    });

    test("invalidation cases for description field", () => {
        expect({ validator, data: { description: 5 } }).containsErrorMessages({
            description: ["description must be a string"],
        });
    });

    test("invalidation cases for is_active field", () => {
        expect({ validator, data: { is_active: 5 } }).containsErrorMessages({
            is_active: ["is_active must be a boolean value"],
        });

        expect({ validator, data: { is_active: 0 } }).containsErrorMessages({
            is_active: ["is_active must be a boolean value"],
        });

        expect({ validator, data: { is_active: 1 } }).containsErrorMessages({
            is_active: ["is_active must be a boolean value"],
        });
    });

    test("valid cases for fields", async () => {
        const arrange = [
            { name: "test" },
            { name: "test", description: "test" },
            { name: "test", description: "" },
            { name: "test", description: null },
            { name: "test", description: undefined },
            { name: "test", description: "test", is_active: true },
            { name: "test", description: "test", is_active: false },
            { name: "test", description: "test", is_active: null },
            { name: "test", description: "test", is_active: undefined },
            {
                name: "test",
                description: "test",
                is_active: true,
                created_at: new Date(),
            },
            {
                name: "test",
                description: "test",
                is_active: false,
                created_at: new Date(),
            },
            {
                name: "test",
                description: "test",
                is_active: null,
                created_at: new Date(),
            },
            {
                name: "test",
                description: "test",
                is_active: undefined,
                created_at: new Date(),
            },
        ];

        for (const item of arrange) {
            const isValid = validator.validate(item);
            expect(isValid).toBeTruthy();
            expect(validator.validatedData).toStrictEqual(
                new CategoryRules(item)
            );
        }
    });
});
