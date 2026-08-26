import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { instructorType } from "./instructorType";
import { lessonType } from "./lessonType";
import { courseType } from "./courseType";
import { moduleType } from "./objects/moduleType";
import { learningOutcomeType } from "./objects/learningOutcomeType";
import { resourceType } from "./objects/resourceType";
import { blockContentType } from "./objects/blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    courseType,
    lessonType,
    instructorType,
    categoryType,
    // Objects
    moduleType,
    learningOutcomeType,
    resourceType,
    blockContentType,
  ],
};
