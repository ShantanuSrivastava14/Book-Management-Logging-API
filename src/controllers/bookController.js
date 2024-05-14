import { logger } from "../index.js";
import bookModel from "../models/bookModel.js";

export const createBook = async (req, res) => {
    try {
        const book = new bookModel(req.body);
        logger.info('Creating Book', {
            source: 'createBook',
            userId: req.user._id
        });
        const savedBook = await book.save();
        logger.success('Book created', {
            source : 'createBook', userId: req.user._id
        });
        res.status(200).json(savedBook);
    } catch(error){
        logger.error(error.message, {source: 'createBook', userId: req.user._id});
        res.status(500).json({error: error.message || "An error occurred"});
    }
};

export const getBooks = async (req, res) => {
    try {
        logger.info('Fetching Books', {
            source: 'getBooks',
            userId: req.user._id
        })
        const books = await bookModel.find();
        logger.success('Available Books fetched', {
            source : 'getBooks', userId: req.user._id
        })
        res.status(200).json(books);
    } catch(error){
        logger.error(error.message, {source: 'getBooks', userId: req.user._id});
        res.status(500).json({error: error.message || "An error occurred"});
    }
};

export const updateBooks = async (req, res) => {
    try {
        const {id} = req.params;
        logger.info('Updating Book', {
            source: 'updateBooks',
            userId: req.user._id
        });
        const updatedBook = await bookModel.findByIdAndUpdate(
            id, 
            req.body,
            {new: true}
            );
        if(!updatedBook){
            logger.info('Book Not Found', {
                source: 'updateBooks',
                userId: req.user._id
            });
            return res.status(404).json({message: 'Book not found'});
        }
        logger.success('Book updated', {
            source: 'updateBooks',
            userId: req.user._id
        });
        res.status(200).json(updatedBook);
    } catch(error){
        logger.error(error.message, {
            source: 'updateBooks',
            userId: req.user._id
        });
        res.status(500).json({error: error.message || "An error occurred"});
    }
};

export const deleteBooks = async (req, res) => {
    try {
        const {id} = req.params;
        logger.info('Deleting Book', {
            source: 'deleteBooks',
            userId: req.user._id
        });
        const deletedBook = await bookModel.findByIdAndDelete(id);
        if(!deletedBook){
            logger.info('Book Not Found', {
                source: 'deleteBooks',
                userId: req.user._id
            });
            return res.status(404).json({message: "Book not found"});
        }
        logger.success('Book deleted', {
            source: 'deleteBooks',
            userId: req.user._id
        });
        res.status(200).json({message: "Book deleted successfully"}); 
    } catch(error){
        logger.error(error.message, {
            source: 'updateBooks',
            userId: req.user._id
        });
        res.status(500).json({error: error.message || "An error occurred"});
    }
}

export const getBookByAuthor = async (req, res) => {
    try {
        const {name} = req.params;
        logger.info(`Fetching Books by Author's name`, {
            source: 'getBookByAuthor',
            userId: req.user._id
        });
        if(!name){
            logger.info(`Author name missing from params`, {
                source: 'getBookByAuthor',
                userId: req.user._id
            });
            return res.status(400).json("Author name missing from params");
        }
        const books = await bookModel.find({author: name});
        if(!books.length>0){
            logger.info(`No books found written by ${name}`, {
                source: 'getBookByAuthor',
                userId: req.user._id
            });
            return res.status(404).json({message:`No books found written by ${name}`});
        }
        logger.success(`Fetching Books by Author's name`, {
            source: 'getBookByAuthor',
            userId: req.user._id
        });
        res.status(200).json(books);
    } catch(error){
        logger.error(error.message, {
            source: 'getBookByAuthor',
            userId: req.user._id
        });
        res.status(500).json({error: error.message || "An error occurred"});
    }
}

export const getBookByPublicationYear = async (req, res) => {
    try {
        const {year} = req.params;
        logger.info(`Fetching Books by Publication year`, {
            source: 'getBookByPublicationYear',
            userId: req.user._id
        });
        if(!year){
            logger.info(`Publication Year missing from params`, {
                source: 'getBookByPublicationYear',
                userId: req.user._id
            });
            return res.status(400).json("Publication Year missing from params");
        }
        const books = await bookModel.find({publicationYear: year});
        if(!books.length>0){
            logger.info(`No books found published in ${year}`, {
                source: 'getBookByPublicationYear',
                userId: req.user._id
            });
            return res.status(404).json({message:`No books found published in ${year} `});
        }
        logger.success(`Fetching Books by Publication Year`, {
            source: 'getBookByPublicationYear',
            userId: req.user._id
        });
        res.status(200).json(books);
    } catch(error){
        logger.error(error.message, {
            source: 'getBookByPublicationYear',
            userId: req.user._id
        });
        res.status(500).json({error: error.message || "An error occurred"});
    }
}