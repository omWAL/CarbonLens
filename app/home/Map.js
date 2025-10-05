import fs from 'fs';
import path from 'path';

/**
 * Next.js API handler to securely read data files stored in the project's root 'models' folder.
 * This route accepts a 'date' query parameter (e.g., /api/aqi-data?date=2025-09-30).
 */
export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Missing date parameter.' });
  }

  // Define the path to the models folder, relative to the project root (process.cwd())
  const modelsDir = path.join(process.cwd(), 'models');
  const filePath = path.join(modelsDir, `${date}.json`);

  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found at path: ${filePath}`);
      return res.status(404).json({ message: `Data file not found for date: ${date}` });
    }

    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Send the data back as JSON
    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading or parsing data file:', error);
    res.status(500).json({ message: 'Server error when reading data.', details: error.message });
  }
}
