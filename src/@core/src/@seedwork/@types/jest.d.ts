import { FieldErrors } from "../domain/validators";

declare global {
    namespace jest {
        interface Matchers<R> {
            containsErrorMessages: (expected: FieldErrors) => R;
        }
    }
}

export {};
