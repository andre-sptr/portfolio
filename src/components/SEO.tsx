import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown>;
}

const SEO = ({ 
  title = "Andre Saputra | Full Stack Developer & AI Enthusiast", 
  description = "Portofolio Andre Saputra, seorang Full Stack Developer dan Guru Informatika yang berfokus pada pengembangan web modern, AI, dan solusi digital.",
  keywords = ["Andre Saputra", "Full Stack Developer", "Web Developer", "React", "TypeScript", "AI", "Informatics Teacher", "Portfolio"],
  image = "/andre-saputra.png",
  url = "https://andresptr.site",
  type = "website",
  schema
}: SEOProps) => {
  const siteTitle = title.includes("Andre Saputra") ? title : `${title} | Andre Saputra`;
  const canonicalUrl = url.endsWith('/') ? url : `${url}/`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Andre Saputra Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@andresptr" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
