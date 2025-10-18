import statusCode from "../../../../constants/statusCode";
import prisma from "../../../../prisma";
import { AsyncDaoTryCatch } from "../../../../utils/commomAsuncHandler";
import { createInternalResponse } from "../../../../utils/internalCommRes";

export const addNewProject_Dao = AsyncDaoTryCatch(
    async (reqBody: any) => {
        const {
            project_id,
            title,
            projectcost,
            fromdate,
            todate,
            zoneid,
            contractorname,
            outwardnumber,
            type_of_work,
            outwarddate,
            imagepath,
            je_name,
            de_name,
            ee_name,
            consultant,
            qualityassurance,
            description,
            isactive,
            project_status_id // for update scenario
        } = reqBody;

        let project;
        if (project_id) {
            // UPDATE project
            project = await prisma.project.update({
                where: { id: Number(project_id) },
                data: {
                    title,
                    projectcost,
                    fromdate: new Date(fromdate),
                    todate: new Date(todate),
                    zoneid,
                    contractorname,
                    outwardnumber,
                    type_of_work,
                    outwarddate: new Date(outwarddate),
                    imagepath,
                    je_name,
                    de_name,
                    ee_name,
                    consultant,
                    qualityassurance,
                    description,
                    isactive: isactive ?? true
                }
            });

            // If a status is provided, insert mapping
            if (project_status_id) {
                await prisma.project_status_mapping.create({
                    data: {
                        project_id: project.id,
                        status_id: project_status_id, // should be integer
                        // changedat will default to now()
                    }
                });
            }

        } else {
            // CREATE project
            project = await prisma.project.create({
                data: {
                    title,
                    projectcost,
                    fromdate: new Date(fromdate),
                    todate: new Date(todate),
                    zoneid,
                    contractorname,
                    outwardnumber,
                    type_of_work,
                    outwarddate: new Date(outwarddate),
                    imagepath,
                    je_name,
                    de_name,
                    ee_name,
                    consultant,
                    qualityassurance,
                    description,
                    isactive: isactive ?? true
                }
            });

            // Get the "Pending" status_id from project_status table
            const pendingStatus = await prisma.project_status.findFirst({
                where: { code: 'PENDING', isactive: true }
            });

            // Insert mapping for Pending status
            await prisma.project_status_mapping.create({
                data: {
                    project_id: project.id,
                    status_id: pendingStatus?.id || 1 // fallback to 1 if not found
                }
            });
        }

        return createInternalResponse(
            true,
            statusCode.HTTP.OK,
            "",
            project
        );
    },
    'addNewProject_Dao'
);
