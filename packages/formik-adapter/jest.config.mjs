import config from "../../jest.config.mjs";

export default {
    ...config,
    collectCoverage: true,
    collectCoverageFrom: ["./src/lib/**/*"],
    coverageReporters: ["lcov"],
};
  