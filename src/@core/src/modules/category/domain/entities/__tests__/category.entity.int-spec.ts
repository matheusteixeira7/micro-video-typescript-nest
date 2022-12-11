import { Category } from "../category.entity";

describe("Category Integration Tests", () => {
    describe("create method", () => {
        it("should throw error if name prop is invalid", () => {
            expect(() => new Category({ name: null })).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => new Category({ name: "" })).containsErrorMessages({
                name: ["name should not be empty"],
            });

            expect(
                () => new Category({ name: 5 as any })
            ).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(
                () => new Category({ name: "t".repeat(256) })
            ).containsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"],
            });
        });

        it("should throw error if description prop is invalid", () => {
            expect(
                () => new Category({ description: 5 } as any)
            ).containsErrorMessages({
                description: ["description must be a string"],
            });
        });

        it("should throw error if is_active prop is invalid", () => {
            expect(
                () => new Category({ is_active: 5 } as any)
            ).containsErrorMessages({
                is_active: ["is_active must be a boolean value"],
            });
        });

        it("should be a valid category", () => {
            expect(
                () =>
                    new Category({
                        name: "Movie",
                        description: "Movie category",
                    })
            ).not.toThrowError();

            expect(
                () =>
                    new Category({
                        name: "Movie",
                        description: null,
                        is_active: true,
                    })
            ).not.toThrowError();

            expect(
                () =>
                    new Category({
                        name: "Movie",
                        description: null,
                        is_active: false,
                    })
            ).not.toThrowError();

            expect(
                () =>
                    new Category({
                        name: "Movie",
                    })
            ).not.toThrowError();
        });
    });

    describe("category update method", () => {
        it("should throw error if name is invalid", () => {
            const category = new Category({ name: "Movie" });

            expect(() => category.update(null, null)).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.update("", null)).containsErrorMessages({
                name: ["name should not be empty"],
            });

            expect(() => category.update(5 as any, null)).containsErrorMessages(
                {
                    name: [
                        "name must be a string",
                        "name must be shorter than or equal to 255 characters",
                    ],
                }
            );

            expect(() =>
                category.update(true as any, null)
            ).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() =>
                category.update("t".repeat(256), null)
            ).containsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"],
            });
        });

        it("should NOT throw error if name is correct", async () => {
            const category = new Category({ name: "category name" });

            expect(() =>
                category.update("new category name", null)
            ).not.toThrowError();
        });

        it("should throw error if description is invalid", async () => {
            const category = new Category({ name: "category name" });

            expect(() =>
                category.update("new category name", 5 as any)
            ).containsErrorMessages({
                description: ["description must be a string"],
            });

            expect(() =>
                category.update("new category name", false as any)
            ).containsErrorMessages({
                description: ["description must be a string"],
            });

            expect(() =>
                category.update("new category name", true as any)
            ).containsErrorMessages({
                description: ["description must be a string"],
            });
        });

        it("should NOT throw error if description is correct", async () => {
            const category = new Category({ name: "category name" });

            expect(() =>
                category.update("new category name", "new category description")
            ).not.toThrowError();
        });
    });
});
