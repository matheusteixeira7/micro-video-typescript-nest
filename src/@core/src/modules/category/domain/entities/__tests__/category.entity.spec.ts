import { omit } from "lodash";
import { UniqueEntityId } from "#seedwork/domain/value-objects";
import { Category, CategoryProperties } from "../category.entity";

describe("Category Unit Tests", () => {
    beforeEach(() => {
        Category.validate = jest.fn();
    });

    test("constructor of category", async () => {
        let category = new Category({ name: "Movie" });
        let props = omit(category.props, "created_at");
        expect(Category.validate).toHaveBeenCalled();
        expect(props).toStrictEqual({
            name: "Movie",
            description: null,
            is_active: true,
        });
        expect(category.props.created_at).toBeInstanceOf(Date);

        const created_at = new Date();

        category = new Category({
            name: "Movie",
            description: "Movie category",
            is_active: false,
            created_at,
        });
        expect(category.props).toStrictEqual({
            name: "Movie",
            description: "Movie category",
            is_active: false,
            created_at,
        });

        category = new Category({
            name: "Movie",
            description: "Movie category",
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            description: "Movie category",
        });

        category = new Category({
            name: "Movie",
            is_active: true,
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            is_active: true,
        });

        category = new Category({
            name: "Movie",
            created_at,
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            created_at,
        });
    });

    test("id field", async () => {
        type CategoryData = {
            props: CategoryProperties;
            id?: UniqueEntityId;
        };

        const data: CategoryData[] = [
            { props: { name: "Movie" } },
            { props: { name: "Movie" }, id: null },
            { props: { name: "Movie" }, id: undefined },
            {
                props: { name: "Movie" },
                id: new UniqueEntityId(),
            },
        ];

        data.forEach((item) => {
            const category = new Category(item.props, item.id);
            expect(category.id).not.toBeNull();
            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        });
    });

    test("getter of name props", async () => {
        const category = new Category({ name: "Movie" });
        expect(category.name).toBe("Movie");
    });

    test("getter and setter of description props", async () => {
        let category = new Category({
            name: "Movie",
            description: "Movie category",
        });
        expect(category.description).toBe("Movie category");

        category = new Category({
            name: "Movie",
        });
        expect(category.description).toBeNull();

        category = new Category({
            name: "Movie",
        });
        category["description"] = "Movie category";
        expect(category.description).toBe("Movie category");

        category = new Category({
            name: "Movie",
        });
        category["description"] = undefined;
        expect(category.description).toBeNull();

        category = new Category({
            name: "Movie",
        });
        category["description"] = null;
        expect(category.description).toBeNull();
    });

    test("getter and setter of is_active props", async () => {
        let category = new Category({
            name: "Movie",
            is_active: true,
        });
        expect(category.is_active).toBeTruthy();

        category = new Category({
            name: "Movie",
        });
        expect(category.is_active).toBeTruthy();

        category = new Category({
            name: "Movie",
        });
        category["is_active"] = false;
        expect(category.is_active).toBeFalsy();

        category = new Category({
            name: "Movie",
        });
        category["is_active"] = undefined;
        expect(category.is_active).toBeTruthy();

        category = new Category({
            name: "Movie",
        });
        category["is_active"] = null;
        expect(category.is_active).toBeTruthy();
    });

    test("getter of created_at", async () => {
        let category = new Category({
            name: "Movie",
        });

        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({
            name: "Movie",
            created_at,
        });
        expect(category.created_at).toBe(created_at);
    });

    it("should update name and description", async () => {
        const category = new Category({
            name: "Movie",
        });
        category.update("Movie 2", "Movie 2 category");
        expect(Category.validate).toHaveBeenCalledTimes(2);
        expect(category.name).toBe("Movie 2");
        expect(category.description).toBe("Movie 2 category");
    });

    it("should deactivate a category", async () => {
        const category = new Category({
            name: "Movie",
        });
        category.deactivate();
        expect(category.is_active).toBeFalsy();
    });

    it("should activate a category", async () => {
        const category = new Category({
            name: "Movie",
        });
        category.deactivate();
        category.activate();
        expect(category.is_active).toBeTruthy();
    });
});
