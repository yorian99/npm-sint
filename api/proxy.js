// api/proxy.js
export default async function handler(req, res) {
  // Hanya menerima metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Ganti dengan URL Google Apps Script yang sudah dideploy
  const GAS_URL = 'https://script.google.com/macros/s/AKfycby7F8QU4Xl6T92wd7x2zEJLwIxK864GGU7-DEqTJUQh6XONY9BWW3kat9V80YmO_WY-Ag/exec';

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}