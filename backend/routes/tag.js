const express = require('express');
const router = express.Router();

// controllers
const { requireSignin, adminMiddleware } = require('../contollers/auth');
const { create, list, read, remove } = require('../contollers/tag');

// validators
const { runValidation } = require('../validators');
const { createTagValidator } = require('../validators/tag');

router.post('/tag', createTagValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router; 
