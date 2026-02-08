import { groq } from "next-sanity";

export const contactLinksQuery = groq`
  *[_type == "contactLink"]|order(order asc, label asc){
    _id,
    label,
    url,
    emoji
  }
`;

export const clientLogosQuery = groq`
  *[_type == "clientLogo"]|order(order asc, name asc){
    _id,
    name,
    logo{
      asset->{
        url,
        mimeType
      }
    }
  }
`;

export const casesQuery = groq`
  *[_type == "case" && featured == true]|order(order asc, publishedAt desc){
    _id,
    title,
    client,
    slug,
    aspect,
    role,
    competencies,
    coverMedia{
      coverType,
      image,
      link,
      "videoUrl": video.asset->url
    }
  }
`;
