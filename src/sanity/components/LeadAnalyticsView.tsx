import React, { useState, useEffect } from 'react';
import { Card, Stack, Text, Heading, Button, Flex, TextInput, Select, Grid, Badge } from '@sanity/ui';
import { sanityClient } from '../../lib/sanity/client';

export function LeadAnalyticsView() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await sanityClient.fetch(`*[_type == "lead"] | order(submissionDate desc)`);
      setLeads(data || []);
    } catch {
      // Fallback to local storage leads if running locally
      const local = JSON.parse(localStorage.getItem('multix_saved_leads') || '[]');
      setLeads(local);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter((item) => {
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (sourceFilter !== 'ALL' && item.source !== sourceFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (item.fullName || '').toLowerCase().includes(q) ||
        (item.email || '').toLowerCase().includes(q) ||
        (item.company || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportToCsv = () => {
    if (!filteredLeads.length) return;

    const headers = [
      'Full Name',
      'Email',
      'Phone',
      'Company',
      'Project Type',
      'Budget',
      'Source',
      'UTM Source',
      'UTM Campaign',
      'Landing Page',
      'Submission Date',
      'Status',
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.fullName || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.company || ''}"`,
      `"${l.projectType || ''}"`,
      `"${l.budget || ''}"`,
      `"${l.source || ''}"`,
      `"${l.utmSource || ''}"`,
      `"${l.utmCampaign || ''}"`,
      `"${l.currentLandingPage || ''}"`,
      `"${l.submissionDate || ''}"`,
      `"${l.status || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `multix_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Flex justify="space-between" align="center">
          <Heading size={2}>📥 Lead Management & Meta Ads Analytics</Heading>
          <Button text="📥 Export to CSV / Excel" tone="positive" onClick={exportToCsv} disabled={!filteredLeads.length} />
        </Flex>

        {/* Filters */}
        <Grid columns={[1, 3]} gap={3}>
          <TextInput
            placeholder="Search by name, email, company..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
          />
          <Select value={statusFilter} onChange={(e: any) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </Select>
          <Select value={sourceFilter} onChange={(e: any) => setSourceFilter(e.target.value)}>
            <option value="ALL">All Lead Sources</option>
            <option value="Facebook Ads">Facebook Ads</option>
            <option value="Instagram Ads">Instagram Ads</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Organic Search">Organic Search</option>
            <option value="Direct">Direct</option>
          </Select>
        </Grid>

        {/* Table */}
        {loading ? (
          <Text size={1}>Loading leads dataset...</Text>
        ) : (
          <Stack space={2}>
            <Text size={1} weight="bold">
              Showing {filteredLeads.length} of {leads.length} Leads
            </Text>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc', background: '#f5f5f5' }}>
                    <th style={{ padding: '8px' }}>Name</th>
                    <th style={{ padding: '8px' }}>Email</th>
                    <th style={{ padding: '8px' }}>Source</th>
                    <th style={{ padding: '8px' }}>Campaign</th>
                    <th style={{ padding: '8px' }}>Status</th>
                    <th style={{ padding: '8px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((l) => (
                    <tr key={l._id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '8px', fontWeight: 'bold' }}>{l.fullName}</td>
                      <td style={{ padding: '8px' }}>{l.email}</td>
                      <td style={{ padding: '8px' }}>
                        <Badge tone={l.source?.includes('Ads') ? 'caution' : 'default'}>{l.source || 'Direct'}</Badge>
                      </td>
                      <td style={{ padding: '8px' }}>{l.utmCampaign || '—'}</td>
                      <td style={{ padding: '8px' }}>
                        <Badge tone={l.status === 'New' ? 'primary' : l.status === 'Won' ? 'positive' : 'neutral'}>
                          {l.status}
                        </Badge>
                      </td>
                      <td style={{ padding: '8px' }}>{new Date(l.submissionDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
