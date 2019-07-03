import { Request, Response } from 'express';
import { IncomingForm } from 'formidable';

export const upload = (req: Request, res: Response) => {
    try{
        const form = new IncomingForm();
        form.parse(req);
        form.on('fileBegin', (name, file) => {
            file.path = '/home/travis/uploads/' + file.name;
        });
        form.on('file', (field, file) => {
            console.log(`uploaded ${file.name}`)
        })
        form.on('end', () => res.json());
    } catch (error){
        console.warn(error);
    }
}