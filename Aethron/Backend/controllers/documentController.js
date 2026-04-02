import { error } from 'console';
import Document from '../models/Document.js';
import Quiz from '../models/Quiz.js';
import { extractTextfromPDF } from '../utils/pdfParser.js';
import { chunkText } from '../utils/textChunker.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import Flashcard from '../models/Flashcard.js';

//@desc    Upload PDF document
//@route   POST /api/document/upload
//@access  Private
export const uploadDocument = async (req, res, next) => {
    try {
        if(!req.file){
            return res.status(400).json({
                success: false,
                error: 'Please upload a PDF file',
                statusCode: 400
            });
        }

        const { title } = req.body;

        if(!title){
            //Delete uploaded file if no title provided
            await fs.unlink(req.file.path);
            return res.status(400).json({
                success: false,
                error: 'Please provide a document title',
                statusCode: 400
            });
        }

        //Connect the URL for upload file
        const baseUrl = `http://localhost:${process.env.PORT || 8000}`;
        const fileUrl = `${baseUrl}/uploads/documents/${req.file.filename}`;

        //Create document record
        const document = await Document.create({
            userId: req.user._id,
            title,
            fileName: req.file.originalname,
            filePath: fileUrl,
            fileSize: req.file.size,
            status: 'processing'
        });

        //Process PDF in background (in production, use a queue like bull)
        processPDF(document._id, req.file.path).catch(err => {
            console.error('PDF processing error:', err);
        });

        res.status(201).json({
            success: true,
            data: document,
            message: 'Document uploaded successfully. processing in progress...'
        });
    } catch (error) {
        //Clean up file on error
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }
        next(error);
    }
};

//Helper function to process PDF
const processPDF = async (documentId, filePath) => {
    try{
        const { text } = await extractTextfromPDF(filePath);

        //Create chunks
        const chunks = chunkText(text, 500, 50);

        //Update Document
        await Document.findByIdAndUpdate(documentId, {
            extractedText: text,
            chunks: chunks,
            status: 'ready'
        });
        
        console.log(`Document ${documentId} processed successfully`);
    } catch (error) {
        console.error(`error processing document ${documentId}:`, error);

        await Document.findByIdAndUpdate(documentId, {
            status: 'failed'
        });
    };
}


//@desc     GET all user documents
//@route    GET /api/documents
//@access   Private
export const getDocuments = async (req, res, next) => {
    try {
        const documents = await Document.aggregate([
            { 
                $match: { userId: new mongoose.Types.ObjectId(req.user._id) }
            },
            {
                $lookup: {
                    from: 'flashcards',
                    localField: '_id',
                    foreignField: 'documentId',
                    as: 'flashcards'
                }
            },
            {
                $lookup: {
                    from: 'quizzes',
                    localField: '_id',
                    foreignField: 'documentId',
                    as: 'quizzes'
                }
            },
            {
                $addFields: {
                    flashcardCount: { $size: '$flashcards' },
                    quizCount: { $size: '$quizzes' }
                }
            },
            {
                $project: {
                    extractedText: 0,
                    chunks: 0,
                    flashcards: 0,
                    quizzes: 0
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents
        });
    } catch (error) {
        next(error);
    }
};

//@desc      GET single document with chunks
//@route     GET /api/document/:id
//@access    Private
export const getDocument = async (req, res, next) => {
    try {
        const document =  await Document.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if(!document) {
            return res.status(404).json({
                success: false,
                error: 'Document not found',
                statusCode: 404
            });
        }

        //Get counts of associated flashcards and quizzes
        const flashcardCount = await Flashcard.countDocuments({documentId: document._id, userId: req.user._id});
        const quizCount = await Quiz.countDocuments({documentId: document._id, userId: req.user._id});

        //Update last accessed
        document.lastAccessed = Date.now();
        await document.save();

        //Combine document data with counts
        const documentData = document.toObject();
        documentData.flashcardCount = flashcardCount;
        documentData.quizCount = quizCount;

        res.status(200).json({
            success: true,
            data: documentData
        });
    } catch (error) {
        next(error);
    }
};

//@desc    DELETE document
//@route   DELETE /api/document/:id
//@access  Private
export const deleteDocument = async (req, res, next) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if(!document){
            return res.status(404).json({
                success: false,
                error: 'Document not found',
                statusCode: 404
            });
        }

        //Delete file from filesystem
        await fs.unlink(document.filePath).catch(() => {});

        //Delete document
        await document.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Document deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};