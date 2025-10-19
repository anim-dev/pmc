import statusCode from "../../../../constants/statusCode";
import prisma from "../../../../prisma";
import { AsyncDaoTryCatch } from "../../../../utils/commomAsuncHandler";
import { createInternalResponse } from "../../../../utils/internalCommRes";

export const addNewProject_Dao = AsyncDaoTryCatch(async (reqBody: any) => {
  const {
    projectId,
    title,
    projectCost,
    fromDate,
    toDate,
    zoneId,
    contractorName,
    outwardNumber,
    typeOfWork,
    outwardDate,
    imagePath,
    jeName,
    deName,
    eeName,
    consultant,
    qualityAssurance,
    description,
    isActive,
    createdBy,
    projectStatusId,
    stageTypeIds,    // Array of stageTypeId's
    otherTypeName    // Only set if type 12 is chosen
  } = reqBody;

  let project:any;

  if (projectId) {
    // --- UPDATE project ---
    project = await prisma.project.update({
      where: { id: Number(projectId) },
      data: {
        title,
        projectCost,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        zoneId,
        contractorName,
        outwardNumber,
        typeOfWork,
        outwardDate: new Date(outwardDate),
        imagePath,
        jeName,
        deName,
        eeName,
        consultant,
        qualityAssurance,
        description,
        updatedBy: createdBy,
        isActive: isActive ?? true,
        projectStatusId: projectStatusId ?? 1
      },
    });

    // --- UPDATE mappings: Remove old + insert new ---
    // 1. Delete all previous mappings for this project
    await prisma.project_stage_type_mapping.deleteMany({
      where: { projectId: Number(projectId) }
    });

    // 2. Insert new mappings
    if (stageTypeIds && Array.isArray(stageTypeIds) && stageTypeIds.length > 0) {
      const stageTypeMappingCreateInputs = stageTypeIds.map((typeId: number) => ({
        projectId: Number(projectId),
        stageTypeId: typeId,
        otherTypeName: typeId === 12 ? otherTypeName : "",
        isActive: true,
      }));
      await prisma.project_stage_type_mapping.createMany({
        data: stageTypeMappingCreateInputs
      });
    }
  } else {
    // --- CREATE project ---
    project = await prisma.project.create({
      data: {
        title,
        projectCost,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        zoneId,
        contractorName,
        outwardNumber,
        typeOfWork,
        outwardDate: new Date(outwardDate),
        imagePath,
        jeName,
        deName,
        eeName,
        consultant,
        qualityAssurance,
        description,
        isActive: isActive ?? true,
        createdBy,
        updatedBy: createdBy,
        projectStatusId: projectStatusId ?? 1
      },
    });

    // --- Add stage type mappings ---
    if (stageTypeIds && Array.isArray(stageTypeIds) && stageTypeIds.length > 0) {
      const stageTypeMappingCreateInputs = stageTypeIds.map((typeId: number) => ({
        projectId: project.id,
        stageTypeId: typeId,
        otherTypeName: typeId === 12 ? otherTypeName : undefined,
        isActive: true,
      }));
      await prisma.project_stage_type_mapping.createMany({
        data: stageTypeMappingCreateInputs
      });
    }
  }

  return createInternalResponse(true, statusCode.HTTP.OK, "", project);
}, "addNewProject_Dao");
