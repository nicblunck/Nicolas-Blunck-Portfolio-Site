import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export function getClient(useDraft = false) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !useDraft,
    token: useDraft ? process.env.SANITY_API_READ_TOKEN : undefined,
    perspective: useDraft ? 'previewDrafts' : 'published',
  })
}

export const client = getClient(false)
