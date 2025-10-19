import { Router, Request, Response } from 'express';
import express from 'express';
import { ControllerTryCatch } from '../../../../utils/commomAsuncHandler';
import httpResponseStruct from '../../../../utils/httpResponse';
import { filterProjectsData_Model } from '../model/filterModel';

const router: Router = express.Router();

// {
//     zoneId:"",
//     wardsId:"",
//     prabhagsId:"",
//     projectStatus:""
// }

router.post('/filterProjectsData', 
    ControllerTryCatch(
        async (req: Request, res: Response) => {
            console.log(req)
            const finalResp = await filterProjectsData_Model(req);
            return httpResponseStruct(req, res, true, finalResp.status, finalResp.message,finalResp.data);
        },
        'filterProjectsData'
    )
);

export default router;
