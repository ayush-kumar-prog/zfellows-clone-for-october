// Z Fellows content types

export interface WritingArticle {
  slug: string;
  title: string;
  date: string;
  heroImage: string | null;
  /** Rich text HTML body (sanitized Webflow .new-rich-text inner HTML). */
  html: string;
  plainText: string;
}

export interface WritingIndexEntry {
  slug: string;
  title: string;
  date: string;
  heroImage: string | null;
}

export interface BlogCard {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt?: string;
}

export interface Mentor {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface FaqItem {
  question: string;
  answerHtml: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  authorRole: string;
  authorCompany?: string;
  authorImage?: string;
}

export interface NavLink {
  label: string;
  href: string;
  /** Internal link or external Google Form */
  external?: boolean;
}
