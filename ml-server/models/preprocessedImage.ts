import { Schema, model } from 'mongoose';

const PreprocessedImageSchema = new Schema({
    diagnosis: String,
    patient_id : String,
    path: String,
})

export const PreprocessedImageModel = model('preprocessed_imgs', PreprocessedImageSchema);