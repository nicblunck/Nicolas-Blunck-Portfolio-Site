import { type SchemaTypeDefinition } from 'sanity'
import { caseType } from "./case";
import { clientLogoType } from "./clientLogo";
import { contactLinkType } from "./contactLink";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseType, contactLinkType, clientLogoType],
};
