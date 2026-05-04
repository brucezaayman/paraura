import { placeholderProducts } from '@/lib/placeholder-products'
import { harnesses } from '@/lib/placeholder-products'

export default async function sitemap() {
  const baseUrl = 'https://www.paraura.com'

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/wings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/harnesses`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/reserves`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/accessories`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/selector`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/fly`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/advice`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Wing product pages
  const wingPages = placeholderProducts.map((product) => ({
    url: `${baseUrl}/wings/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Harness pages
  const harnessPages = harnesses.map((h) => ({
    url: `${baseUrl}/harnesses/${h.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...wingPages, ...harnessPages]
}
