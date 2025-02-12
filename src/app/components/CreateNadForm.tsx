'use client';

import { useState } from 'react';
import { NAD } from '../types/nad';
import { toast } from 'react-hot-toast';

export default function CreateNadForm() {
  const [formData, setFormData] = useState<Partial<NAD>>({
    createdAt: "2025-02-12 03:48:25",
    createdBy: "dimidotdev",
    manualSearches: {
      dnpedia: false,
      urlscan: false,
      finsin: false,
      miarroba: false,
      advancedSearch: false,
      metaAds: false,
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/nad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create NAD');

      const data = await response.json();
      toast.success('NAD created successfully');
      window.location.href = `/nad/${data.nad.id}`;
    } catch (error) {
      console.error('Error creating NAD:', error);
      toast.error('Failed to create NAD');
    }
  };
  

  return (
    <div className="min-h-screen bg-primary-100 pt-20">
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Create New NAD</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Attack Basic Information */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-accent-800 mb-6">Attack Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Ticket <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ticketId"
                  required
                  value={formData.ticketId || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="targetUrl"
                  required
                  value={formData.targetUrl || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  IP Address
                </label>
                <input
                  type="text"
                  name="ipAddress"
                  value={formData.ipAddress || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  HTML Captured? <span className="text-red-500">*</span>
                </label>
                <select
                  name="htmlCaptured"
                  required
                  value={formData.htmlCaptured || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Observations
                </label>
                <textarea
                  name="basicObservations"
                  rows={4}
                  value={formData.basicObservations || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="attackType"
                  required
                  value={formData.attackType || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Malicious Similar Domain">Malicious Similar Domain</option>
                  <option value="Hacked Website">Hacked Website</option>
                  <option value="Free Hosting">Free Hosting</option>
                  <option value="Shortener">Shortener</option>
                  <option value="Redirect">Redirect</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Active incident? <span className="text-red-500">*</span>
                </label>
                <select
                  name="isActiveIncident"
                  required
                  value={formData.isActiveIncident || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Ending url/webpage <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="endingUrl"
                  required
                  value={formData.endingUrl || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Attack ends at client page? <span className="text-red-500">*</span>
                </label>
                <select
                  name="endsAtClientPage"
                  required
                  value={formData.endsAtClientPage || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </section>

          {/* Detection Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-accent-800 mb-6">Detection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Could be detected by DMS Script? <span className="text-red-500">*</span>
                </label>
                <select
                  name="detectedByDMS"
                  required
                  value={formData.detectedByDMS || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  DMS Script is in source code? <span className="text-red-500">*</span>
                </label>
                <select
                  name="dmsInSourceCode"
                  required
                  value={formData.dmsInSourceCode || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Thread Alerts? <span className="text-red-500">*</span>
                </label>
                <select
                  name="hasThreadAlerts"
                  required
                  value={formData.hasThreadAlerts || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              {formData.hasThreadAlerts === 'Yes' && (
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-1">
                    If yes, when?
                  </label>
                  <input
                    type="datetime-local"
                    name="threadAlertsDate"
                    value={formData.threadAlertsDate || ''}
                    onChange={handleChange}
                    className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    step="1" 
                  />
                  <p className="mt-1 text-sm text-accent-500">UTC time</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Customer creation <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="customerCreationDate"
                  required
                  value={formData.customerCreationDate || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  step="1" 
                />
                <p className="mt-1 text-sm text-accent-500">UTC time</p>
              </div>
            </div>
          </section>
          {/* Phishing Resources Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-accent-800 mb-6">Phishing Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in DNPedia? <span className="text-red-500">*</span>
                </label>
                <select
                  name="foundInDNPedia"
                  required
                  value={formData.foundInDNPedia || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.foundInDNPedia === 'Yes' && (
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-1">
                    If yes, when?
                  </label>
                  <input
                    type="datetime-local"
                    name="dnpediaDate"
                    value={formData.dnpediaDate || ''}
                    onChange={handleChange}
                    className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    step="1"
                  />
                  <p className="mt-1 text-sm text-accent-500">UTC time</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in DBI Suspicious Domain?
                </label>
                <select
                  name="foundInDBISuspiciousDomain"
                  value={formData.foundInDBISuspiciousDomain || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in URLScan?
                </label>
                <select
                  name="foundInURLScan"
                  value={formData.foundInURLScan || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.foundInURLScan === 'Yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-1">
                      When?
                    </label>
                    <input
                      type="datetime-local"
                      name="urlscanDate"
                      value={formData.urlscanDate || ''}
                      onChange={handleChange}
                      className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                      step="1"
                    />
                    <p className="mt-1 text-sm text-accent-500">UTC time</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-1">
                      Scan link?
                    </label>
                    <input
                      type="url"
                      name="scanLink"
                      value={formData.scanLink || ''}
                      onChange={handleChange}
                      className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in Virus Total relations? <span className="text-red-500">*</span>
                </label>
                <select
                  name="foundInVirusTotal"
                  required
                  value={formData.foundInVirusTotal || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in Finsin? <span className="text-red-500">*</span>
                </label>
                <select
                  name="foundInFinsin"
                  required
                  value={formData.foundInFinsin || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Reported to PhishTank? <span className="text-red-500">*</span>
                </label>
                <select
                  name="reportedToPhishTank"
                  required
                  value={formData.reportedToPhishTank || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              {formData.reportedToPhishTank === 'Yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-1">
                      PhishTank user
                    </label>
                    <input
                      type="text"
                      name="phishTankUser"
                      value={formData.phishTankUser || ''}
                      onChange={handleChange}
                      className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-1">
                      Report link
                    </label>
                    <input
                      type="url"
                      name="phishTankReportLink"
                      value={formData.phishTankReportLink || ''}
                      onChange={handleChange}
                      className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in Meta ADs? <span className="text-red-500">*</span>
                </label>
                <select
                  name="foundInMetaAds"
                  required
                  value={formData.foundInMetaAds || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in Google ADs? <span className="text-red-500">*</span>
                </label>
                <select
                  name="foundInGoogleAds"
                  required
                  value={formData.foundInGoogleAds || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in Twitter/X? <span className="text-red-500">*</span>
                </label>
                <select
                  name="foundInTwitter"
                  required
                  value={formData.foundInTwitter || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              {formData.foundInTwitter === 'Yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-1">
                      Twitter/X user
                    </label>
                    <input
                      type="text"
                      name="twitterUser"
                      value={formData.twitterUser || ''}
                      onChange={handleChange}
                      className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-accent-700 mb-1">
                      Twitter/X tags
                    </label>
                    <textarea
                      name="twitterTags"
                      rows={3}
                      value={formData.twitterTags || ''}
                      onChange={handleChange}
                      className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Could be detected by Weblogs? <span className="text-red-500">*</span>
                </label>
                <select
                  name="detectedByWeblogs"
                  required
                  value={formData.detectedByWeblogs || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="NA">NA</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Observations
                </label>
                <textarea
                  name="phishingObservations"
                  rows={4}
                  value={formData.phishingObservations || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                />
              </div>
            </div>
          </section>

          {/* Keywords Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-accent-800 mb-6">Keywords</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Keywords Fields */}
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in domain
                </label>
                <input
                  type="text"
                  name="keywordsInDomain"
                  value={formData.keywordsInDomain || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  placeholder="Enter keywords found in domain..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Found in subdomain
                </label>
                <input
                  type="text"
                  name="keywordsInSubdomain"
                  value={formData.keywordsInSubdomain || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  placeholder="Enter keywords found in subdomain..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Is the keywords configured? <span className="text-red-500">*</span>
                </label>
                <select
                  name="keywordsConfigured"
                  required
                  value={formData.keywordsConfigured || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Observations
                </label>
                <textarea
                  name="keywordsObservations"
                  rows={4}
                  value={formData.keywordsObservations || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  placeholder="Enter any additional observations about keywords..."
                />
              </div>
            </div>
          </section>

          {/* Manual Searches Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-accent-800 mb-6">Manual Searches</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(formData.manualSearches || {}).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={`manualSearches.${key}`}
                    checked={value}
                    onChange={handleChange}
                    className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-primary-300 rounded"
                  />
                  <label className="text-sm text-accent-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Final Analysis Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-accent-800 mb-6">Final Analysis</h2>
            <div className="grid grid-cols-1 gap-6">
              {/* System Info - Read Only */}
              <div className="bg-primary-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-1">
                      Created At (UTC)
                    </label>
                    <input
                      type="text"
                      value={formData.createdAt}
                      disabled
                      className="w-full rounded-md border-primary-300 bg-primary-100 text-accent-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-1">
                      Created By
                    </label>
                    <input
                      type="text"
                      value={formData.createdBy}
                      disabled
                      className="w-full rounded-md border-primary-300 bg-primary-100 text-accent-500"
                    />
                  </div>
                </div>
              </div>

              {/* NAD Solved Status */}
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  NAD solved? <span className="text-red-500">*</span>
                </label>
                <select
                  name="nadSolved"
                  required
                  value={formData.nadSolved || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Final Observations */}
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Observations
                </label>
                <textarea
                  name="finalObservations"
                  rows={4}
                  value={formData.finalObservations || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  placeholder="Enter any final observations about this NAD..."
                />
              </div>

              {/* Q/A Section */}
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Q/A
                </label>
                <textarea
                  name="qa"
                  rows={4}
                  value={formData.qa || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  placeholder="Enter any Q/A information..."
                />
              </div>

              {/* Actions to Take */}
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Actions to take
                </label>
                <textarea
                  name="actionsToTake"
                  rows={4}
                  value={formData.actionsToTake || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  placeholder="List the actions that need to be taken..."
                />
              </div>
            </div>

            {/* Form Submit Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-primary-300 rounded-md text-accent-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                Create NAD
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}