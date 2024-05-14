import { check, validationResult } from 'express-validator';

export const validateBook = [
  check('title').notEmpty().withMessage('Title is required'),
  check('author').notEmpty().withMessage('Author is required'),
  check('publicationYear').isInt({ min: 1000 }).withMessage('Publication year must be a valid year').toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateParams = (req, res, next) => {
  const { name, year } = req.params;

  if (name && typeof name !== 'string') {
    return res.status(400).json({ error: 'Author name must be a string' });
  }

  if (year && isNaN(year)) {
    return res.status(400).json({ error: 'Publication year must be a number' });
  }

  next();
};
