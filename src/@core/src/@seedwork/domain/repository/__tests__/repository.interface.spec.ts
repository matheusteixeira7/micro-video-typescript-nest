import { SearchParams, SearchResult } from "../repository.interface";

describe("Search Unit Tests", () => {
    describe("SearchParams Unit Tests", () => {
        test("page prop", async () => {
            let params = new SearchParams();
            expect(params.page).toBe(1);

            const arrange = [
                { value: null, expected: 1 },
                { value: undefined, expected: 1 },
                { value: "", expected: 1 },
                { value: "invalid value", expected: 1 },
                { value: 0, expected: 1 },
                { value: -1, expected: 1 },
                { value: 5.5, expected: 1 },
                { value: true, expected: 1 },
                { value: false, expected: 1 },
                { value: {}, expected: 1 },
                { value: 1, expected: 1 },
                { value: 2, expected: 2 },
            ];

            for (const { value, expected } of arrange) {
                params = new SearchParams({ page: value as any });
                expect(params.page).toBe(expected);
            }
        });

        test("per_page prop", async () => {
            let params = new SearchParams();
            expect(params.per_page).toBe(15);

            const arrange = [
                { value: null, expected: 15 },
                { value: undefined, expected: 15 },
                { value: "", expected: 15 },
                { value: "invalid value", expected: 15 },
                { value: 0, expected: 15 },
                { value: -1, expected: 15 },
                { value: 5.5, expected: 15 },
                { value: true, expected: 15 },
                { value: false, expected: 15 },
                { value: {}, expected: 15 },
                { value: 1, expected: 1 },
                { value: 10, expected: 10 },
            ];

            for (const { value, expected } of arrange) {
                params = new SearchParams({ per_page: value as any });
                expect(params.per_page).toBe(expected);
            }
        });

        test("sort prop", async () => {
            let params = new SearchParams();
            expect(params.sort).toBeNull();

            const arrange = [
                { value: null, expected: null },
                { value: undefined, expected: null },
                { value: "", expected: null },
                { value: "value", expected: "value" },
                { value: 0, expected: "0" },
                { value: -1, expected: "-1" },
                { value: 5.5, expected: "5.5" },
                { value: true, expected: "true" },
                { value: false, expected: "false" },
                { value: {}, expected: "[object Object]" },
                { value: 1, expected: "1" },
                { value: 10, expected: "10" },
            ];

            for (const { value, expected } of arrange) {
                params = new SearchParams({ sort: value as any });
                expect(params.sort).toBe(expected);
            }
        });

        test("sort_dir prop", async () => {
            let params = new SearchParams();
            expect(params.sort_dir).toBeNull();

            params = new SearchParams({ sort: null });
            expect(params.sort_dir).toBeNull();

            params = new SearchParams({ sort: undefined });
            expect(params.sort_dir).toBeNull();

            params = new SearchParams({ sort: "" });
            expect(params.sort_dir).toBeNull();

            const arrange = [
                { value: null, expected: "asc" },
                { value: undefined, expected: "asc" },
                { value: "", expected: "asc" },
                { value: "invalid value", expected: "asc" },
                { value: 0, expected: "asc" },
                { value: -1, expected: "asc" },
                { value: 5.5, expected: "asc" },
                { value: true, expected: "asc" },
                { value: false, expected: "asc" },
                { value: {}, expected: "asc" },
                { value: 1, expected: "asc" },
                { value: 10, expected: "asc" },

                { value: "asc", expected: "asc" },
                { value: "desc", expected: "desc" },

                { value: "ASC", expected: "asc" },
                { value: "DESC", expected: "desc" },
            ];

            for (const { value, expected } of arrange) {
                params = new SearchParams({
                    sort: "field",
                    sort_dir: value as any,
                });
                expect(params.sort_dir).toBe(expected);
            }
        });

        test("filter prop", async () => {
            let params = new SearchParams();
            expect(params.filter).toBeNull();

            const arrange = [
                { value: null, expected: null },
                { value: undefined, expected: null },
                { value: "", expected: null },
                { value: "invalid value", expected: "invalid value" },
                { value: 0, expected: "0" },
                { value: -1, expected: "-1" },
                { value: 5.5, expected: "5.5" },
                { value: true, expected: "true" },
                { value: false, expected: "false" },
                { value: {}, expected: "[object Object]" },
                { value: 1, expected: "1" },
                { value: 10, expected: "10" },
            ];

            for (const { value, expected } of arrange) {
                params = new SearchParams({ filter: value as any });
                expect(params.filter).toBe(expected);
            }
        });
    });

    describe("SearchResult Unit Tests", () => {
        test("constructor props", () => {
            let result = new SearchResult({
                items: ["entity1", "entity2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: null,
            });

            expect(result.toJSON()).toStrictEqual({
                items: ["entity1", "entity2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                last_page: 2,
                sort: null,
                sort_dir: null,
                filter: null,
            });

            result = new SearchResult({
                items: ["entity1", "entity2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: "name",
                sort_dir: "asc",
                filter: "test",
            });

            expect(result.toJSON()).toStrictEqual({
                items: ["entity1", "entity2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                last_page: 2,
                sort: "name",
                sort_dir: "asc",
                filter: "test",
            });
        });

        it("should set last_page = 1 when per_page field is greater than total field", () => {
            const result = new SearchResult({
                items: [] as any,
                total: 4,
                current_page: 1,
                per_page: 15,
                sort: "name",
                sort_dir: "asc",
                filter: "test",
            });

            expect(result.last_page).toBe(1);
        });

        test("last_page prop when total is not a multiple of per_page", () => {
            const result = new SearchResult({
                items: [] as any,
                total: 101,
                current_page: 1,
                per_page: 20,
                sort: "name",
                sort_dir: "asc",
                filter: "test",
            });

            expect(result.last_page).toBe(6);
        });
    });
});
