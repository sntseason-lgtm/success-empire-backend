const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let transactions = [];

app.get('/', (req, res) => {
  res.json({ status: 'SUCCESS-EMPIRE backend running' });
});

app.post('/api/transaction', (req, res) => {
  const tx = { ...req.body, date: new Date().toISOString() };
  transactions.push(tx);
  res.json({ success: true, tx });
});

app.get('/api/admin/transactions', (req, res) => {
  res.json(transactions);
});

app.get('/api/receipt/pdf/:ref', (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);
  doc.fontSize(20).text('SUCCESS-EMPIRE Receipt', { align: 'center' });
  doc.moveDown();
  doc.text('Reference: ' + req.params.ref);
  doc.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on ' + PORT));
