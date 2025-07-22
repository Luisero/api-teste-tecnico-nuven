import { Request, Response } from 'express';
import datasetService from './datasets.service';

const uploadDataset = async (req: Request, res: Response) => {
  if (!req.file || !req.user) {
    return res.status(400).json({ error: 'File or user information is missing.' });
  }

  try {
    const newDataset = await datasetService.uploadAndProcessFile({
      fileBuffer: req.file.buffer, // <--- Passando o conteúdo do arquivo
      originalName: req.file.originalname,
      userId: req.user.id,
    });

    res.status(201).json({
      message: 'File uploaded and records processed successfully.', // Mensagem atualizada
      dataset: newDataset
    });

  } catch (error) {
    console.error(error); // Log para nos ajudar a depurar
    res.status(500).json({ error: 'An error occurred while processing the file.' });
  }
};

const listUserDatasets = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; 
    const datasets = await datasetService.listByUserId(userId);
    res.status(200).json(datasets);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while listing datasets.' });
  }
};

export default { uploadDataset, listUserDatasets }; // <-- Adicionar à exportação

