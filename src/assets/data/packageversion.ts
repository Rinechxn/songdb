// packageVersion.ts
import * as packageJson from "../../../package.json";

export const AboutVersion = {
    nextVersion: packageJson.dependencies.next,
    webversion: packageJson.version
};
