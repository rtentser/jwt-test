import File from '../models/File.js';
import fs from 'fs';
import path from 'path';

export const uploadFile = async (req, res) => {
  const file = req.file;
  await File.create({
    name: file.originalname,
    ext: path.extname(file.originalname),
    mime: file.mimetype,
    size: file.size,
    stored_name: file.filename
  });
  res.json({ message: 'Uploaded' });
};

export const listFiles = async (req, res) => {
  const list_size = parseInt(req.query.list_size) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * list_size;
  const rows = await File.findAll({ limit: list_size, offset });
  res.json(rows);
};

export const deleteFile = async (req, res) => {
  const { id } = req.params;
  const row = await File.findByPk(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  try { fs.unlinkSync(path.join('uploads', row.stored_name)); } catch (e) { }
  await row.destroy();
  res.json({ message: 'Deleted' });
};

export const getFile = async (req, res) => {
  const { id } = req.params;
  const row = await File.findByPk(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
};

export const downloadFile = async (req, res) => {
  const { id } = req.params;
  const row = await File.findByPk(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.download(path.join('uploads', row.stored_name), row.name);
};

export const updateFile = async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  const row = await File.findByPk(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  try { fs.unlinkSync(path.join('uploads', row.stored_name)); } catch (e) { }
  row.name = file.originalname;
  row.ext = path.extname(file.originalname);
  row.mime = file.mimetype;
  row.size = file.size;
  row.stored_name = file.filename;
  await row.save();
  res.json({ message: 'Updated' });
};
