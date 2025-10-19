
export const validationMsg = Object.freeze({
   project: {
    title: { REQUIRED: "Title is required" },
    projectCost: { REQUIRED: "Cost is required", INVALID: "Cost must be a number" },
    fromDate: { REQUIRED: "Start date is required" },
    toDate: { REQUIRED: "End date is required" },
    zoneId: { REQUIRED: "Zone is required" },
    wardId: { REQUIRED: "Ward is required" },
    contractorName: { REQUIRED: "Contractor name is required" },
    outwardNumber: { REQUIRED: "Outward number is required" },
    typeOfWork: { REQUIRED: "Type of work is required" },
    outwardDate: { REQUIRED: "Outward date is required" },
    imagePath: { REQUIRED: "Image path is required" },
    jeName: { REQUIRED: "JE name is required" },
    deName: { REQUIRED: "DE name is required" },
    eeName: { REQUIRED: "EE name is required" },
    consultant: { REQUIRED: "Consultant is required" },
    qualityAssurance: { REQUIRED: "Quality assurance is required" },
    description: { REQUIRED: "Description is required" },
    createdBy: { REQUIRED: "Created By is required" },
    stageTypeIds: { REQUIRED: "Stage Type Ids is required", INVALID: "Stage Type Ids must be array of numbers" },
    otherTypeName: { INVALID: "Other Type Name must be a string" }
  }
})