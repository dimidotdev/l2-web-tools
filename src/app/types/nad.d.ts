export interface NAD {
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt?: string;
  lastModifiedBy?: string;

  ticketId: string;
  targetUrl: string;
  ipAddress?: string;
  htmlCaptured: 'Yes' | 'No';
  basicObservations?: string;
  attackType: 'Malicious Similar Domain' | 'Hacked Website' | 'Free Hosting' | 'Shortener' | 'Redirect';
  isActiveIncident: 'Yes' | 'No';
  endingUrl: string;
  endsAtClientPage: 'Yes' | 'No';

  detectedByDMS: 'Yes' | 'No' | 'NA';
  dmsInSourceCode: 'Yes' | 'No' | 'NA';
  hasThreadAlerts: 'Yes' | 'No' | 'NA';
  threadAlertsDate?: string;
  customerCreationDate: string;

  foundInDNPedia: 'Yes' | 'No';
  dnpediaDate?: string;
  foundInDBISuspiciousDomain: 'Yes' | 'No' | 'NA';
  foundInURLScan: 'Yes' | 'No';
  urlscanDate?: string;
  scanLink?: string;
  foundInVirusTotal: 'Yes' | 'No' | 'NA';
  foundInFinsin: 'Yes' | 'No' | 'NA';
  reportedToPhishTank: 'Yes' | 'No' | 'NA';
  phishTankUser?: string;
  phishTankReportLink?: string;
  foundInMetaAds: 'Yes' | 'No' | 'NA';
  foundInGoogleAds: 'Yes' | 'No' | 'NA';
  foundInTwitter: 'Yes' | 'No' | 'NA';
  twitterUser?: string;
  twitterTags?: string;
  detectedByWeblogs: 'Yes' | 'No' | 'NA';
  phishingObservations?: string;

  keywordsInDomain?: string;
  keywordsInSubdomain?: string;
  keywordsConfigured: 'Yes' | 'No';
  keywordsObservations?: string;

  manualSearches: {
    dnpedia: boolean;
    urlscan: boolean;
    finsin: boolean;
    miarroba: boolean;
    advancedSearch: boolean;
    metaAds: boolean;
  };

  nadSolved: 'Yes' | 'No';
  finalObservations?: string;
  qa?: string;
  actionsToTake?: string;
}