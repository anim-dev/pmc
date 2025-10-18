import { Router, Request, Response } from 'express';
import express from 'express';
import { ControllerTryCatch } from '../../../../utils/commomAsuncHandler';
import httpResponseStruct from '../../../../utils/httpResponse';
import { uploadSingle } from '../../../../services/fileUploadService';
import statusCode from '../../../../constants/statusCode';

const router: Router = express.Router();


router.post('/uploadSingleFile',
    ControllerTryCatch(
        async (req: Request, res: Response) => {
            const info = await uploadSingle(req, res, "file", {
                dest: "public/uploads",
                maxSizeBytes: 10 * 1024 * 1024, // 10MB
                allowedMimeTypes: ["image/jpeg", "image/png", "application/pdf"],
            });
            console.log(info)
            return httpResponseStruct(req, res, true, statusCode.HTTP.OK, "File Uploaded successfully", info.filename);
        },
        "addNewProject"
    )
);

export default router;
