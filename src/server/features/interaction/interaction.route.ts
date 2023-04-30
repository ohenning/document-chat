import express from 'express';
import { getInteraction } from './interaction.controller';
const router = express.Router();

router.get('/', getInteraction);

module.exports = router;