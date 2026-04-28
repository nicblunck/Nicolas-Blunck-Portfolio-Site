import { createClient } from 'next-sanity'

import { apiVersion, assertSanityEnv, dataset, projectId } from '../env'

const baseClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !process.env.SANITY_READ_TOKEN,
  token: process.env.SANITY_READ_TOKEN,
})

export const client = new Proxy(baseClient, {
  get(target, prop, receiver) {
    if (prop === 'fetch') {
      return ((...args: Parameters<typeof target.fetch>) => {
        assertSanityEnv()
        return target.fetch(...args)
      }) as typeof target.fetch
    }
    return Reflect.get(target, prop, receiver)
  },
})
