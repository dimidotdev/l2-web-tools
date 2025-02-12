export interface NAD {
  _id: string;
  ticketId: string;
  customerName: string;
  description: string;
  justification: string;
  technicalDetails: string;
  implementationSteps: string;
  rollbackPlan: string;
  affectedServices: string;
  riskLevel: string;
  isEmergency: boolean;
  requiresDowntime: boolean;
  downtimeEstimate?: string;
  testingDone: boolean;
  testingDetails?: string;
  additionalNotes?: string;
  targetUrl: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt?: string;
  lastModifiedBy?: string;
}