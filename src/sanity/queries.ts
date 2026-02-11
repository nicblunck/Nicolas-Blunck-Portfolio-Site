import { groq } from "next-sanity";

export const casesQuery = groq`
  *[_type == "case" && featured == true] | order(_createdAt desc){
    _id,
    title,
    client,
    aspect,
    role,
    competencies[]->{_id, "key": key.current, label, emoji, "bg": coalesce(bg.hex, bg)},
    coverMedia,
    slug,
    "slugValue": coalesce(slug.current, slug)
  }
`;

export const caseBySlugQuery = groq`
  *[_type == "case" && (slug.current == $slug || slug == $slug)][0]{
    _id,
    title,
    client,
    slug,
    aspect,
    role,
    intro,
    liveLink,
    liveLinkLabel,
    competencies[]->{_id, "key": key.current, label, emoji, "bg": coalesce(bg.hex, bg)},
    coverMedia,
    relatedCases[]->{
      _id,
      title,
      client,
      slug,
      "slugValue": coalesce(slug.current, slug),
      aspect,
      coverMedia
    },
    content[]{
      _key,
      _type,
      metrics[]{
        value,
        label
      },
      heading,
      body,
      gallery[]->{
        _id,
        title,
        mediaType,
        alt,
        image,
        video{
          asset->{
            url
          }
        }
      },
      text,
      author,
      role
    }
  }
`;

export const latestCasesQuery = groq`
  *[_type == "case"] | order(_createdAt desc)[0...3]{
    _id,
    title,
    client,
    slug,
    "slugValue": coalesce(slug.current, slug),
    aspect,
    competencies[]->{_id, "key": key.current, label, emoji, "bg": coalesce(bg.hex, bg)},
    coverMedia
  }
`;

export const clientLogosQuery = groq`
  *[_type == "clientLogo"] | order(name asc){
    _id,
    name,
    "logo": logo{
      asset->{
        url,
        mimeType
      }
    }
  }
`;

export const contactLinksQuery = groq`
  *[_type == "contactLink"] | order(_createdAt asc){
    _id,
    label,
    url,
    emoji
  }
`;

export const competenciesQuery = groq`
  *[_type == "competency"] | order(label asc){
    _id,
    "key": key.current,
    label,
    emoji,
    "bg": coalesce(bg.hex, bg)
  }
`;
