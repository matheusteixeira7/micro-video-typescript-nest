import {
    MaxLength,
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsDate,
} from "class-validator";
import { ClassValidatorFields } from "#seedwork/domain/validators/class-validator-fields";
import { CategoryProperties } from "#modules/category/domain/entities/category.entity";

export class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsDate()
    @IsOptional()
    created_at: Date;

    constructor({
        name,
        description,
        is_active,
        created_at,
    }: CategoryProperties) {
        Object.assign(this, {
            name,
            description,
            is_active,
            created_at,
        });
    }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
    validate(data: CategoryProperties): boolean {
        return super.validate(new CategoryRules(data ?? ({} as any)));
    }
}

export class CategoryValidatorFactory {
    static create(): CategoryValidator {
        return new CategoryValidator();
    }
}
