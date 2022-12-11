export default {
    displayName: {
        name: "@core",
        color: "blue",
    },
    clearMocks: true,
    coverageDirectory: "../__coverage",
    coverageProvider: "v8",
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
    rootDir: "src",
    setupFilesAfterEnv: [
        "./@core/src/@seedwork/domain/tests/validations.ts",
        // "./@seedwork/domain/tests/jest.ts",
    ],
    testRegex: ".*\\..*spec\\.ts$",
    transform: {
        "^.+\\.ts?$": ["@swc/jest"],
    },
    moduleNameMapper: {
        "source-map-support/register": "identity-obj-proxy",
    },
};
