// import Head from 'next/head';
// import { useRouter } from 'next/router';

// interface WebsiteSchemaProps {
//   title?: string;
//   description?: string;
//   image?: string;
//   author?: string;
//   publishedTime?: string;
//   modifiedTime?: string;
//   type?: 'website' | 'article' | 'product';
//   siteName?: string;
//   locale?: string;
//   canonicalUrl?: string;
//   keywords?: string[];
// }

// const WebsiteSchema: React.FC<WebsiteSchemaProps> = ({
//   title = "My Next.js Website",
//   description = "A modern website built with Next.js",
//   image = "/default-og-image.jpg",
//   author = "Site Author",
//   publishedTime,
//   modifiedTime,
//   type = "website",
//   siteName = "My Next.js Site",
//   locale = "en_US",
//   canonicalUrl,
//   keywords = ["nextjs", "react", "website"]
// }) => {
//   const router = useRouter();
//   const currentUrl = canonicalUrl || `https://yourdomain.com${router.asPath}`;
  
//   // Organization schema (change to your organization details)
//   const organizationSchema = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     "name": "Your Company Name",
//     "url": "https://yourdomain.com",
//     "logo": "https://yourdomain.com/logo.png",
//     "sameAs": [
//       "https://twitter.com/yourcompany",
//       "https://facebook.com/yourcompany",
//       "https://linkedin.com/company/yourcompany",
//       "https://instagram.com/yourcompany"
//     ],
//     "contactPoint": [{
//       "@type": "ContactPoint",
//       "telephone": "+1-123-456-7890",
//       "contactType": "customer service"
//     }]
//   };

//   <script type="application/ld+json">
// {
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   "mainEntity": [{
//     "@type": "Question",
//     "name": "dfg",
//     "acceptedAnswer": {
//       "@type": "Answer",
//       "text": "fdg"
//     }
//   },{
//     "@type": "Question",
//     "name": "dfg",
//     "acceptedAnswer": {
//       "@type": "Answer",
//       "text": "dfg"
//     }
//   }]
// }
// </script>

//   // Website schema
//   const websiteSchema = {
//     "@context": "https://schema.org",
//     "@type": "WebSite",
//     "name": siteName,
//     "url": "https://yourdomain.com/",
//     "potentialAction": {
//       "@type": "SearchAction",
//       "target": "https://yourdomain.com/search?q={search_term_string}",
//       "query-input": "required name=search_term_string"
//     }
//   };

//   // Breadcrumb schema
//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": "https://yourdomain.com"
//       },
//       {
//         "@type": "ListItem",
//         "position": 2,
//         "name": title,
//         "item": currentUrl
//       }
//     ]
//   };

//   // Article schema (if type is article)
//   const articleSchema = type === "article" ? {
//     "@context": "https://schema.org",
//     "@type": "Article",
//     "headline": title,
//     "description": description,
//     "image": image,
//     "author": {
//       "@type": "Person",
//       "name": author
//     },
//     "publisher": {
//       "@type": "Organization",
//       "name": "Your Company Name",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://yourdomain.com/logo.png"
//       }
//     },
//     "datePublished": publishedTime,
//     "dateModified": modifiedTime,
//     "mainEntityOfPage": {
//       "@type": "WebPage",
//       "@id": currentUrl
//     }
//   } : null;

//   // Product schema (if type is product)
//   const productSchema = type === "product" ? {
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     "name": title,
//     "description": description,
//     "image": image,
//     "sku": "PRODUCT123",
//     "brand": {
//       "@type": "Brand",
//       "name": "Your Brand"
//     },
//     "offers": {
//       "@type": "Offer",
//       "url": currentUrl,
//       "priceCurrency": "USD",
//       "price": "99.99",
//       "availability": "https://schema.org/InStock",
//       "seller": {
//         "@type": "Organization",
//         "name": "Your Company Name"
//       }
//     }
//   } : null;

//   return (
//     <Head>
//       {/* Basic Meta Tags */}
//       <title>{title}</title>
//       <meta name="description" content={description} />
//       <meta name="keywords" content={keywords.join(', ')} />
//       <meta name="author" content={author} />
//       <meta name="robots" content="index, follow" />
      
//       {/* Open Graph Meta Tags */}
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:image" content={image} />
//       <meta property="og:url" content={currentUrl} />
//       <meta property="og:type" content={type} />
//       <meta property="og:site_name" content={siteName} />
//       <meta property="og:locale" content={locale} />
      
//       {/* Twitter Card Meta Tags */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image" content={image} />
//       <meta name="twitter:site" content="@yourtwitterhandle" />
//       <meta name="twitter:creator" content="@youraccount" />
      
//       {/* Canonical URL */}
//       <link rel="canonical" href={currentUrl} />
      
//       {/* Schema.org JSON-LD */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
//       />
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
//       />
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
//       />
//       {articleSchema && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
//         />
//       )}
//       {productSchema && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
//         />
//       )}
//     </Head>
//   );
// };

// export default WebsiteSchema;