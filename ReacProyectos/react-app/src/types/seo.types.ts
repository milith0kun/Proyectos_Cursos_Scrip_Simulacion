// Types para SEO
export type SeoMetrics = {
  id: number;
  keyword: string;
  searchVolume: number;
  difficulty: number;
  position: number;
  traffic: number;
};

export type SeoAnalysis = {
  id: number;
  url: string;
  title: string;
  description: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  wordCount: number;
  loadTime: string;
  mobileOptimized: boolean;
};

export type CompetitorData = {
  id: number;
  domain: string;
  authority: number;
  backlinks: number;
  keywords: number;
  traffic: number;
};

// Nuevos tipos para SEO
type KeywordData = {
  id: number;
  keyword: string;
  intent: "informational" | "transactional" | "navigational";
  cpc: number;
  competition: number;
  trendsData: number[];
  relatedKeywords: string[];
};

type TechnicalSEO = {
  id: number;
  url: string;
  sslSecure: boolean;
  mobileResponsive: boolean;
  loadSpeed: {
    mobile: string;
    desktop: string;
  };
  robotsTxt: boolean;
  sitemap: boolean;
  structuredData: boolean;
  canonicalTags: boolean;
  brokenLinks: number;
};

type ContentAnalysis = {
  id: number;
  url: string;
  readabilityScore: number;
  contentLength: number;
  keywordDensity: number;
  imageAltTags: boolean;
  internalLinks: number;
  externalLinks: number;
  lastUpdated: string;
  socialShares: {
    facebook: number;
    twitter: number;
    linkedin: number;
  };
};

type BacklinkProfile = {
  id: number;
  domain: string;
  totalBacklinks: number;
  dofollow: number;
  nofollow: number;
  domainAuthority: number;
  topLinkingDomains: {
    domain: string;
    authority: number;
  }[];
  anchorTextDistribution: {
    text: string;
    count: number;
  }[];
};

export type { KeywordData, TechnicalSEO, ContentAnalysis, BacklinkProfile };
