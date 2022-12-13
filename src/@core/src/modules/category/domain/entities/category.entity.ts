import { EntityValidationError } from "#seedwork/domain/errors";
import { Entity } from "#seedwork/domain/entity/entity";
import { UniqueEntityId } from "#seedwork/domain/value-objects";
import { CategoryValidatorFactory } from "../validators/category.validator";

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {
    constructor(readonly props: CategoryProperties, id?: UniqueEntityId) {
        Category.validate(props);
        super(props, id);
        this.description = props.description;
        this.props.is_active = props.is_active ?? true;
        this.props.created_at = props.created_at ?? new Date();
    }

    activate() {
        this.props.is_active = true;
    }

    deactivate() {
        this.props.is_active = false;
    }

    toJSON(): Required<{ id: string } & CategoryProperties> {
        return {
            id: this.id.toString(),
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            created_at: this.created_at,
        };
    }

    update(name: string, description: string): void {
        Category.validate({
            name,
            description,
        });
        this.name = name;
        this.description = description;
    }

    static validate(props: CategoryProperties) {
        const validator = CategoryValidatorFactory.create();
        const isValid = validator.validate(props);
        if (!isValid) {
            throw new EntityValidationError(validator.errors);
        }
    }

    get name(): string {
        return this.props.name;
    }

    private set name(value) {
        this.props.name = value;
    }

    get description(): string {
        return this.props.description;
    }

    private set description(value: string) {
        this.props.description = value ?? null;
    }

    get is_active(): boolean {
        return this.props.is_active;
    }

    private set is_active(value: boolean) {
        this.props.is_active = value ?? true;
    }

    get created_at(): Date {
        return this.props.created_at;
    }
}
