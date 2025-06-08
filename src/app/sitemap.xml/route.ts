import { NextResponse } from 'next/server';

export async function GET() {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://arabizi.com/</loc>
        <lastmod>2024-12-01</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://arabizi.com/terms</loc>
        <lastmod>2024-12-01</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://arabizi.com/privacy</loc>
        <lastmod>2024-12-01</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>`;

  return new NextResponse(sitemapContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 