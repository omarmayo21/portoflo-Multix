import { DashboardHomepage } from './components/DashboardHomepage';
import { LeadAnalyticsView } from './components/LeadAnalyticsView';

export const deskStructure = (S: any) =>
  S.list()
    .title('Multix Studio Dashboard')
    .items([
      // 1. Executive Dashboard Homepage
      S.listItem()
        .title('📊 Dashboard Overview')
        .child(
          S.component()
            .title('Executive Metrics')
            .component(DashboardHomepage)
        ),

      S.divider(),

      // 2. Projects & Categories
      S.listItem()
        .title('🚀 Projects')
        .child(
          S.list()
            .title('Projects Management')
            .items([
              S.documentTypeListItem('project').title('All Projects'),
              S.documentTypeListItem('category').title('Project Categories'),
            ])
        ),

      // 3. Campaigns & Landing Pages
      S.listItem()
        .title('🛬 Campaigns & Landing Pages')
        .child(
          S.list()
            .title('Landing Pages & Ads')
            .items([
              S.documentTypeListItem('landingPage').title('Landing Pages (/landing/:slug)'),
              S.documentTypeListItem('campaign').title('Advertising Campaigns'),
              S.documentTypeListItem('thankYouPage').title('Thank You Page Settings'),
            ])
        ),

      // 4. Lead Management
      S.listItem()
        .title('📥 Lead Management & CSV Export')
        .child(
          S.component()
            .title('Lead Analytics')
            .component(LeadAnalyticsView)
        ),

      S.divider(),

      // 5. Dynamic Content Collections
      S.documentTypeListItem('testimonial').title('💬 Testimonials'),
      S.documentTypeListItem('service').title('⚡ Services'),
      S.documentTypeListItem('faq').title('❓ FAQ Items'),
      S.documentTypeListItem('lead').title('📩 All Lead Submissions'),

      S.divider(),

      // 6. Website Content & Global Settings Singletons
      S.listItem()
        .title('🌐 Website Section Content')
        .child(
          S.document()
            .schemaType('websiteContent')
            .documentId('websiteContent-global')
            .title('Website Section Content')
        ),

      S.listItem()
        .title('⚙️ Website Settings & Meta Ads')
        .child(
          S.document()
            .schemaType('websiteSettings')
            .documentId('websiteSettings-global')
            .title('Global Ads & Analytics Settings')
        ),
    ]);
