export interface NAD {
  ticketId: string;
  customerName: string;
  targetUrl: string;
  creationTime: string | Date;
}

export interface QuickNAD {
  finishInformation: string;
}