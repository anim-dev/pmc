import { Router, Request, Response } from 'express';
import express from 'express';
import { ControllerTryCatch } from '../../../../utils/commomAsuncHandler';
import httpResponseStruct from '../../../../utils/httpResponse';
import { filterProjectsData_Model, projectDetailsInfoById_Model } from '../model/filterModel';

const router: Router = express.Router();

router.post('/filterProjectsData',
    ControllerTryCatch(
        async (req: Request, res: Response) => {
            const finalResp = await filterProjectsData_Model(req);
            return httpResponseStruct(req, res, true, finalResp.status, finalResp.message, finalResp.data);
        },
        'filterProjectsData'
    )
);



router.post('/projectDetailsInfoById',
    ControllerTryCatch(
        async (req: Request, res: Response) => {
            const finalResp = await projectDetailsInfoById_Model(req);
            return httpResponseStruct(req, res, true, finalResp.status, finalResp.message, finalResp.data);
        },
        'projectDetailsInfoById'
    )
)

export default router;
