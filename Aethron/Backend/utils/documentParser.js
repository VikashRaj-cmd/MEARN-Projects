import fs from "fs/promises";
import { extractTextfromPDF } from "./pdfParser.js";
export const extractTextFromDocument = async (filePath) => {
    const ext = filePath.split('.').pop().toLowerCase();
    
    try {
        if (ext === 'pdf') {
            return await extractTextfromPDF(filePath);
        } else {
            console.warn(`Text extraction not implemented for .${ext} files. Returning empty text.`);
            return { text: '' };
        }
    } catch (error) {
        console.error('Document parsing error:', error);
        throw new Error('Failed to extract text from document');
    }
};
