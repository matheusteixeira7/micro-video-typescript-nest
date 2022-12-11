import { validateSync } from "class-validator";
import {
    ValidatorFieldsInterface,
    FieldErrors,
} from "./validator-fields.interface";

export abstract class ClassValidatorFields<PropsValidated>
    implements ValidatorFieldsInterface<PropsValidated>
{
    errors: FieldErrors = null;
    validatedData: PropsValidated = null;

    validate(data: any): boolean {
        const errors = validateSync(data);

        if (errors.length > 0) {
            this.errors = {};
            for (const error of errors) {
                const { property, constraints } = error;
                this.errors[property] = Object.values(constraints);
            }
        } else {
            this.validatedData = data;
        }

        return !errors.length;
    }
}
