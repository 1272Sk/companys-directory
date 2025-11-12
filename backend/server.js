// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database
let companies = [
  { id: 1, name: "Tech Innovations Inc", location: "San Francisco, CA", industry: "Technology", employees: 500, founded: 2015 },
  { id: 2, name: "Global Finance Corp", location: "New York, NY", industry: "Finance", employees: 1200, founded: 2008 },
  { id: 3, name: "Healthcare Solutions", location: "Boston, MA", industry: "Healthcare", employees: 800, founded: 2012 },
  { id: 4, name: "Green Energy Systems", location: "Austin, TX", industry: "Energy", employees: 350, founded: 2018 },
  { id: 5, name: "Retail Masters LLC", location: "Chicago, IL", industry: "Retail", employees: 2500, founded: 2005 },
  { id: 6, name: "CloudTech Solutions", location: "Seattle, WA", industry: "Technology", employees: 650, founded: 2016 },
  { id: 7, name: "Investment Partners", location: "New York, NY", industry: "Finance", employees: 450, founded: 2010 },
  { id: 8, name: "MediCare Plus", location: "Los Angeles, CA", industry: "Healthcare", employees: 1500, founded: 2009 },
  { id: 9, name: "Solar Power Co", location: "Phoenix, AZ", industry: "Energy", employees: 280, founded: 2019 },
  { id: 10, name: "Fashion Retail Group", location: "Miami, FL", industry: "Retail", employees: 1800, founded: 2013 },
  { id: 11, name: "AI Research Labs", location: "San Francisco, CA", industry: "Technology", employees: 320, founded: 2020 },
  { id: 12, name: "Banking Services Inc", location: "Boston, MA", industry: "Finance", employees: 900, founded: 2007 },
  { id: 13, name: "PharmaTech Corp", location: "Seattle, WA", industry: "Healthcare", employees: 720, founded: 2014 },
  { id: 14, name: "Wind Energy Solutions", location: "Denver, CO", industry: "Energy", employees: 410, founded: 2017 },
  { id: 15, name: "E-Commerce Giants", location: "Austin, TX", industry: "Retail", employees: 3200, founded: 2011 },
];

// Routes

// Get all companies
app.get('/api/companies', (req, res) => {
  res.json({
    success: true,
    data: companies,
    count: companies.length
  });
});

// Get single company by ID
app.get('/api/companies/:id', (req, res) => {
  const company = companies.find(c => c.id === parseInt(req.params.id));
  if (!company) {
    return res.status(404).json({ success: false, message: 'Company not found' });
  }
  res.json({ success: true, data: company });
});

// Create new company
app.post('/api/companies', (req, res) => {
  const newCompany = {
    id: companies.length + 1,
    ...req.body
  };
  companies.push(newCompany);
  res.status(201).json({ success: true, data: newCompany });
});

// Update company
app.put('/api/companies/:id', (req, res) => {
  const index = companies.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Company not found' });
  }
  companies[index] = { ...companies[index], ...req.body };
  res.json({ success: true, data: companies[index] });
});

// Delete company
app.delete('/api/companies/:id', (req, res) => {
  const index = companies.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Company not found' });
  }
  companies.splice(index, 1);
  res.json({ success: true, message: 'Company deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});