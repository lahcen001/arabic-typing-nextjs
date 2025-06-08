import { NextResponse } from 'next/server';

export async function GET() {
  const robotsContent = `User-agent: *
Allow: /
Allow: /terms
Allow: /privacy
Sitemap: https://arabizi.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1
`;

  return new NextResponse(robotsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 