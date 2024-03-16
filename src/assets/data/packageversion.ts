// packageVersion.ts
import * as packageJson from "../../../package.json";

export const AboutVersion = {
    nextVersion: packageJson.dependencies.next,
    version: packageJson.version
};
