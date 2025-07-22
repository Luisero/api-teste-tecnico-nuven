import { Request, Response } from 'express';
import recordsService from './records.service';

const listFromDataset = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const datasetId = req.params.id;
    const records = await recordsService.listByDatasetId(datasetId, userId);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while listing records.' });
  }
};

const searchRecords = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required.' });
        }
        const records = await recordsService.searchByKeyword(query as string, userId);
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during search.' });
    }
};

export default { listFromDataset, searchRecords };