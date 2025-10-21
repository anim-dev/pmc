import { z } from "zod";
import { consultant_Field, contractorName_Field, createdBy_Field, deName_Field, description_Field, eeName_Field, fromDate_Field, imagePath_Field, jeName_Field, otherTypeName_Field, outwardDate_Field, outwardNumber_Field, projectCost_Field, qualityAssurance_Field, stageTypeIds_Field, title_Field, toDate_Field, typeOfWork_Field, wardId_Field, zoneId_Field } from "./zodCmnFields";

export const projectCreateForm = z.object({
  title: title_Field,
  projectCost: projectCost_Field,
  fromDate: fromDate_Field,
  toDate: toDate_Field,
  zoneId: zoneId_Field,
  wardId: wardId_Field,
  contractorName: contractorName_Field,
  outwardNumber: outwardNumber_Field,
  typeOfWork: typeOfWork_Field,
  outwardDate: outwardDate_Field,
  imagePath: imagePath_Field,
  jeName: jeName_Field,
  deName: deName_Field,
  eeName: eeName_Field,
  consultant: consultant_Field,
  qualityAssurance: qualityAssurance_Field,
  description: description_Field,
  createdBy: createdBy_Field,
  stageTypeIds: stageTypeIds_Field,
  otherTypeName: otherTypeName_Field,
  // Uncomment and add more as needed
  projectId: z.number().optional(),
  isActive: z.boolean().optional()
})
.refine(
  (data) =>
    !data.stageTypeIds?.includes(12) ||
    (typeof data.otherTypeName === "string" && data.otherTypeName.length > 0),
  {
    message: "otherTypeName is required when stageTypeIds contains 12",
    path: ["otherTypeName"],
  }
);