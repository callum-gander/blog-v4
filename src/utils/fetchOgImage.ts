/**
 * Fetches the Open Graph image URL from a given URL
 * @param url - The URL to fetch OG image from
 * @returns The OG image URL or null if not found
 */
export async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) return null

    const html = await response.text()

    // Try to find og:image meta tag
    const ogImageMatch = html.match(/<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i)

    if (ogImageMatch && ogImageMatch[1]) {
      return ogImageMatch[1]
    }

    return null
  } catch (error) {
    console.warn(`Failed to fetch OG image from ${url}:`, error)
    return null
  }
}

/**
 * Gets OG image from project data (github or url field)
 * @param github - GitHub URL
 * @param url - Project URL
 * @returns OG image URL or null
 */
export async function getProjectOgImage(
  github?: string,
  url?: string
): Promise<string | null> {
  // Try GitHub first, then regular URL
  if (github) {
    const ogImage = await fetchOgImage(github)
    if (ogImage) return ogImage
  }

  if (url) {
    const ogImage = await fetchOgImage(url)
    if (ogImage) return ogImage
  }

  return null
}
