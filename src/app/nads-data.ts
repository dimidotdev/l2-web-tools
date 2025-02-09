export interface Nad {
  ticketId: string,
  customerName: string,
  targetUrl: string,
  creationDate: string,
}

export const nads: Nad[] = [
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
];