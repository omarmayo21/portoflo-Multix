import { defineType, defineField } from 'sanity';

export const lead = defineType({
  name: 'lead',
  title: 'Lead Management',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
    }),
    defineField({
      name: 'budget',
      title: 'Estimated Budget',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message / Project Details',
      type: 'text',
    }),
    defineField({
      name: 'firstLandingPage',
      title: 'First Landing Page URL',
      type: 'string',
    }),
    defineField({
      name: 'currentLandingPage',
      title: 'Current Form Page URL',
      type: 'string',
    }),
    defineField({
      name: 'referrer',
      title: 'Original Referrer',
      type: 'string',
    }),
    defineField({
      name: 'source',
      title: 'Lead Source',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook Ads', value: 'Facebook Ads' },
          { title: 'Instagram Ads', value: 'Instagram Ads' },
          { title: 'Google Ads', value: 'Google Ads' },
          { title: 'Organic Search', value: 'Organic Search' },
          { title: 'Direct', value: 'Direct' },
          { title: 'Referral', value: 'Referral' },
        ],
      },
      initialValue: 'Direct',
    }),
    defineField({
      name: 'campaignName',
      title: 'Campaign Name',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaClicked',
      title: 'Primary CTA Clicked',
      type: 'string',
    }),
    defineField({
      name: 'utmSource',
      title: 'UTM Source',
      type: 'string',
    }),
    defineField({
      name: 'utmMedium',
      title: 'UTM Medium',
      type: 'string',
    }),
    defineField({
      name: 'utmCampaign',
      title: 'UTM Campaign',
      type: 'string',
    }),
    defineField({
      name: 'utmContent',
      title: 'UTM Content',
      type: 'string',
    }),
    defineField({
      name: 'utmTerm',
      title: 'UTM Term',
      type: 'string',
    }),
    defineField({
      name: 'deviceType',
      title: 'Device Type',
      type: 'string',
    }),
    defineField({
      name: 'browser',
      title: 'Browser',
      type: 'string',
    }),
    defineField({
      name: 'submissionDate',
      title: 'Submission Date & Time',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Lead Workflow Status',
      type: 'string',
      options: {
        list: [
          { title: 'New 🟢', value: 'New' },
          { title: 'Contacted 🟡', value: 'Contacted' },
          { title: 'Qualified 🔵', value: 'Qualified' },
          { title: 'Won 🏆', value: 'Won' },
          { title: 'Lost ❌', value: 'Lost' },
          { title: 'Archived 📁', value: 'Archived' },
        ],
      },
      initialValue: 'New',
    }),
    defineField({
      name: 'emailSent',
      title: 'Email Notifications Sent',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes (Private)',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || 'Anonymous Lead',
        subtitle: `${subtitle || 'No email'} | Status: ${status || 'New'}`,
      };
    },
  },
});
