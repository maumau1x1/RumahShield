export interface ScanResult {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'HIGH_RISK';
  rumahScore: number;
  riskFactors: string[];
  recommendations: string[];
  summary: string;
}

export const mockScanResult: ScanResult = {
  verdict: 'HIGH_RISK',
  rumahScore: 25,
  riskFactors: [
    'Price is significantly lower than market average for this area.',
    'Agent requests deposit before viewing.',
    'Images seem to be stock photos or stolen from other listings.',
  ],
  recommendations: [
    'Do not transfer any money before physical viewing.',
    'Verify the agent\'s REN (Real Estate Negotiator) number.',
    'Ask for a video call tour of the property.',
  ],
  summary: 'This listing exhibits multiple red flags commonly associated with rental scams in Malaysia. Proceed with extreme caution.',
};

export const hotspotData = [
  { id: '1', city: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869, count: 45, topScam: 'Fake Agent' },
  { id: '2', city: 'Shah Alam', lat: 3.0738, lng: 101.5183, count: 22, topScam: 'Price Scam' },
  { id: '3', city: 'Subang Jaya', lat: 3.0438, lng: 101.5859, count: 31, topScam: 'Fake Listing' },
  { id: '4', city: 'Johor Bahru', lat: 1.4927, lng: 103.7414, count: 56, topScam: 'Fake Agent' },
  { id: '5', city: 'Penang', lat: 5.4141, lng: 100.3288, count: 38, topScam: 'Identity Fraud' },
  { id: '6', city: 'Ipoh', lat: 4.5975, lng: 101.0901, count: 12, topScam: 'Price Scam' },
  { id: '7', city: 'Petaling Jaya', lat: 3.1073, lng: 101.6067, count: 29, topScam: 'Fake Listing' },
  { id: '8', city: 'Cyberjaya', lat: 2.9228, lng: 101.6572, count: 18, topScam: 'Deposit Scam' },
  { id: '9', city: 'Putrajaya', lat: 2.9264, lng: 101.6964, count: 8, topScam: 'Fake Agent' },
  { id: '10', city: 'Kuching', lat: 1.5533, lng: 110.3440, count: 15, topScam: 'Identity Fraud' },
];
