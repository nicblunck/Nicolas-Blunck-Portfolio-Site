import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !process.env.SANITY_READ_TOKEN,
  token: process.env.SANITY_READ_TOKEN,
})
