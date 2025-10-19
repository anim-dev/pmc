import { Router, Request, Response } from 'express';
import express from 'express';
import { ControllerTryCatch } from '../../../../utils/commomAsuncHandler';
import httpResponseStruct from '../../../../utils/httpResponse';
import { addNewProject_Model } from '../model/addProjectModel';
import { reqSchemaValidator_M } from '../../../../utils/zodReqValidation/reqValidatorSchema';
import { projectCreateForm } from '../../../../utils/zodReqValidation/commonSchemaFrmObject';

const router: Router = express.Router();


router.post('/addNewProject', reqSchemaValidator_M(projectCreateForm),
    ControllerTryCatch(
        async (req: Request, res: Response) => {
            const finalResp = await addNewProject_Model(req);
            return httpResponseStruct(req, res, true, finalResp.status, finalResp.message, null);
        },
        "addNewProject"
    )
);

export default router;
