import { Router, Request, Response } from 'express';
import express from 'express';
import { ControllerTryCatch } from '../../../../utils/commomAsuncHandler';
import httpResponseStruct from '../../../../utils/httpResponse';
import { addNewProject_Model } from '../model/addProjectModel';

const router: Router = express.Router();


router.get('/addNewProject', 
    ControllerTryCatch(
        async (req: Request, res: Response) => {
            const finalResp = await addNewProject_Model(req);
            return httpResponseStruct(req, res, true, 200, "Test", null);
        },
        "addNewProject"
    )
);

export default router;
