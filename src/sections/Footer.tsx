import React from 'react';
import { Sparkles, Github, Linkedin, Twitter, Dribbble, Instagram, ArrowUp } from 'lucide-react';
import { useLanguage } from '../i18n/context';
import { useSanity } from '../context/SanityContext';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github className="w-4 h-4" />,
  Linkedin: <Linkedin className="w-4 h-4" />,
  Twitter: <Twitter className="w-4 h-4" />,
  Dribbble: <Dribbble className="w-4 h-4" />,
  Instagram: <Instagram className="w-4 h-4" />,
};

const defaultSocialLinks = [
  { icon: <Github className="w-4 h-4" />, href: "https://github.com/multix-studio", label: "GitHub" },
  { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/company/multix-studio", label: "LinkedIn" },
  { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com/multix_studio", label: "Twitter" },
  { icon: <Dribbble className="w-4 h-4" />, href: "https://dribbble.com/multix-studio", label: "Dribbble" },
  { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com/multix.studio", label: "Instagram" },
];

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { websiteContent } = useSanity();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic content from Sanity or i18n fallback
  const footerTagline = websiteContent?.footerTagline?.en || t('footer.tagline');
  const footerCopyright = websiteContent?.footerCopyright || t('footer.copyright');
  const socialLinks = websiteContent?.socialLinks?.length
    ? websiteContent.socialLinks.map((link: any) => ({
        icon: iconMap[link.icon] || <Github className="w-4 h-4" />,
        href: link.url,
        label: link.platform,
      }))
    : defaultSocialLinks;

  return (
    <footer className="py-16 relative bg-[#091224] text-slate-300 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A4073] to-[#FF5E3A] p-[1px] shadow-glow-accent">
                <div className="w-full h-full bg-[#0F1D38] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#FF5E3A]" />
                </div>
              </div>
              <span className="text-2xl font-black font-heading tracking-wider text-white">
                MULTIX<span className="text-[#FF5E3A]">.</span>
              </span>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {footerTagline}
            </p>

            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-heading mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#projects" className="hover:text-[#FF5E3A] transition-colors">{t('nav.projects')}</a></li>
              <li><a href="#services" className="hover:text-[#FF5E3A] transition-colors">{t('nav.services')}</a></li>
              <li><a href="#about" className="hover:text-[#FF5E3A] transition-colors">{t('nav.about')}</a></li>
              <li><a href="#process" className="hover:text-[#FF5E3A] transition-colors">{t('nav.process')}</a></li>
              <li><a href="#contact" className="hover:text-[#FF5E3A] transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-heading mb-4">
              {t('footer.socials')}
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((item: any, idx: number) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="p-3 rounded-full bg-[#2A4073]/30 border border-white/10 text-slate-300 hover:text-white hover:bg-[#FF5E3A] hover:border-[#FF5E3A] transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & scroll-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <span>{footerCopyright}</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-300 hover:text-[#FF5E3A] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
