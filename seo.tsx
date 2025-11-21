import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogType?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  canonicalUrl?: string;
}

export function SEO({
  title,
  description,
  keywords = [],
  ogType = "website",
  ogImage = "/og-image.png",
  twitterCard = "summary_large_image",
  canonicalUrl,
}: SEOProps) {
  const fullTitle = `${title} | Teen Summit 2.0`;
  const currentUrl = canonicalUrl || window.location.href;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, attribute: "name" | "property" = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    if (keywords.length > 0) {
      updateMetaTag("keywords", keywords.join(", "));
    }

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:type", ogType, "property");
    updateMetaTag("og:url", currentUrl, "property");
    updateMetaTag("og:image", ogImage, "property");
    updateMetaTag("og:site_name", "Teen Summit 2.0", "property");

    // Twitter Card tags
    updateMetaTag("twitter:card", twitterCard);
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage);

    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.rel = "canonical";
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href = currentUrl;
  }, [title, description, keywords, ogType, ogImage, twitterCard, currentUrl]);

  return null;
}
