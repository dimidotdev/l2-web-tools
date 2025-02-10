/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('l2tools');

// Insert a few documents into the sales collection.
db.getCollection('quicknads').insertMany([
  {
    ticketId: 'BRADES12345',
    customerName: 'Bradesco',
    targetUrl: 'https://banco.bradesco',
    creationDate: '2021-07-01',
  },
  {
    ticketId: 'BANNER12345',
    customerName: 'Banner Bank',
    targetUrl: 'https://bannerbank.com',
    creationDate: '2023-12-03',
  },
  {
    ticketId: 'BPAAR12345',
    customerName: 'Banco de la Provincia de Buenos Aires',
    targetUrl: 'https://bancoprovincia.ar',
    creationDate: '2025-02-11',
  },
  {
    ticketId: 'BANGAL12345',
    customerName: 'Banco Galicia',
    targetUrl: 'https://bancogalicia.ar',
    creationDate: '2023-07-01',
  },
  {
    ticketId: 'TESTE12345',
    customerName: 'Banco Teste',
    targetUrl: 'https://banco.teste',
    creationDate: '2021-07-01',
  },
]);

console.log(db.getCollection('nads').find({}));