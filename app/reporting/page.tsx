'use client'

import Header from '../../components/Header';
import Tabs from '../../components/Tabs';

export default function ReportingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Tabs />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Reporting</h1>
        <p>Reporting functionality will display call analytics and metrics here.</p>
      </div>
    </div>
  );
}
