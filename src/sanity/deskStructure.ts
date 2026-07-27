import { ComponentView } from 'sanity/structure';
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
      S.listItem()
        .title('💬 Testimonials')
        .child(S.documentTypeListItem('testimonial').title('Testimonials')),

      S.listItem()
        .title('⚡ Services')
        .child(S.documentTypeListItem('service').title('Services')),

      S.listItem()
        .title('❓ FAQ')
        .child(S.documentTypeListItem('faq').title('FAQ Items')),

      S.divider(),

      // 6. Website Content & Global Settings
      S.listItem()
        .title('🌐 Website Section Content')
        .child(
          S.documentTypeList('websiteContent')
            .title('Page Content')
        ),

      S.listItem()
        .title('⚙️ Website Settings & Meta Ads')
        .child(
          S.documentTypeList('websiteSettings')
            .title('Global Ads & Analytics Settings')
        ),
    ]);
