import { Router, Request, Response } from 'express';
import express from 'express';
import { ControllerTryCatch } from '../../../../utils/commomAsuncHandler';
import httpResponseStruct from '../../../../utils/httpResponse';
import statusCode from '../../../../constants/statusCode';
import {  getLocation_Model, getMasterData_Model } from '../model/utilsModel';

const router: Router = express.Router();


router.post('/getMasterData',
    ControllerTryCatch(
        async (req: Request, res: Response) => {
            const finalRes = await getMasterData_Model(req);
            return httpResponseStruct(req, res, true, statusCode.HTTP.OK, finalRes.message, finalRes.data);
        },
        "getAllZones"
    )
);

router.get('/getLocation',
    ControllerTryCatch(
        async (req: Request, res: Response) => {
            const finalRes = await getLocation_Model(req);
            return httpResponseStruct(req, res, true, statusCode.HTTP.OK, finalRes.message, finalRes.data);
        },
        "getLocation"
    )
);


export default router;
