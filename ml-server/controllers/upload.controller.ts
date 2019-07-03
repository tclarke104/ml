import { Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import { writeFileSync } from 'fs'

export const upload = (req: Request, res: Response) => {
    const form = new IncomingForm();
    form.on('file', (field, file) => {
        writeFileSync('../../files/test.jpeg', file)
    })
    form.on('end', () => res.json());
    form.parse(req);
}