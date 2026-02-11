import { type SchemaTypeDefinition } from "sanity";
import { caseType } from "./case";
import { caseMedia } from "./caseMedia";
import { clientLogo } from "./clientLogo";
import { contactLink } from "./contactLink";
import { competency } from "./competency";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseType, caseMedia, clientLogo, contactLink, competency],
};
