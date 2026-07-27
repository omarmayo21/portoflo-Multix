import React, { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity/client';
import { updateSeoMeta } from '../utils/seo';

export const PreviewPage: React.FC = () => {
  const [draftData, setDraftData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const docType = urlParams.get('type') || 'landingPage';
  const slug = urlParams.get('slug') || '';

  useEffect(() => {
    // 1. Force noindex, nofollow for preview environment
    updateSeoMeta({
      title: `[PREVIEW DRAFT] ${slug || docType}`,
      noIndex: true,
    });

    async function fetchDraft() {
      try {
        const query = `*[_type == "${docType}" && (slug.current == $slug || _id == $slug)][0]`;
        const res = await sanityClient.fetch(query, { slug });
        setDraftData(res);
      } catch (err) {
        console.warn('Error loading draft preview:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDraft();
  }, [docType, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1D38] flex items-center justify-center text-white font-heading">
        <span>Loading Draft Preview...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1D38] text-white">
      {/* Top Preview Banner */}
      <div className="bg-[#FF5E3A] text-white px-4 py-2 text-center text-xs font-bold font-heading uppercase tracking-wider sticky top-0 z-50 shadow-md">
        ⚠️ DRAFT PREVIEW MODE — UNPUBLISHED DOCUMENT ({docType}: {slug})
      </div>

      <div className="max-w-4xl mx-auto py-16 px-4 space-y-8">
        <h1 className="text-3xl font-bold font-heading">
          {draftData?.pageName || draftData?.title?.en || draftData?.title || 'Draft Content Preview'}
        </h1>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <pre className="text-xs text-slate-300 overflow-x-auto p-4 bg-black/40 rounded-xl">
            {JSON.stringify(draftData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
