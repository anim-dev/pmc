import { z } from "zod";
import { validationMsg } from "../../constants/cmnSchemaValidationMsg";

// Single-field reusable definitions
export const title_Field = z.string().nonempty({ message: validationMsg.project.title.REQUIRED });
export const projectCost_Field = z.number({ invalid_type_error: validationMsg.project.projectCost.INVALID });
export const fromDate_Field = z.string().nonempty({ message: validationMsg.project.fromDate.REQUIRED });
export const toDate_Field = z.string().nonempty({ message: validationMsg.project.toDate.REQUIRED });
export const zoneId_Field = z.number({ invalid_type_error: validationMsg.project.zoneId.REQUIRED });
export const wardId_Field = z.number({ invalid_type_error: validationMsg.project.wardId.REQUIRED });
export const contractorName_Field = z.string().nonempty({ message: validationMsg.project.contractorName.REQUIRED });
export const outwardNumber_Field = z.string().nonempty({ message: validationMsg.project.outwardNumber.REQUIRED });
export const typeOfWork_Field = z.string().nonempty({ message: validationMsg.project.typeOfWork.REQUIRED });
export const outwardDate_Field = z.string().nonempty({ message: validationMsg.project.outwardDate.REQUIRED });
export const imagePath_Field = z.string().nonempty({ message: validationMsg.project.imagePath.REQUIRED });
export const jeName_Field = z.string().nonempty({ message: validationMsg.project.jeName.REQUIRED });
export const deName_Field = z.string().nonempty({ message: validationMsg.project.deName.REQUIRED });
export const eeName_Field = z.string().nonempty({ message: validationMsg.project.eeName.REQUIRED });
export const consultant_Field = z.string().nonempty({ message: validationMsg.project.consultant.REQUIRED });
export const qualityAssurance_Field = z.string().nonempty({ message: validationMsg.project.qualityAssurance.REQUIRED });
export const description_Field = z.string().nonempty({ message: validationMsg.project.description.REQUIRED });
export const createdBy_Field = z.number({ invalid_type_error: validationMsg.project.createdBy.REQUIRED });
export const stageTypeIds_Field = z.array(z.number(), { invalid_type_error: validationMsg.project.stageTypeIds.INVALID })
  .nonempty({ message: validationMsg.project.stageTypeIds.REQUIRED });
export const otherTypeName_Field = z.string().optional(); // Only required if stageTypeIds includes 12
