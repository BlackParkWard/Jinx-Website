import type { Metadata } from "next";
import { SITE_NAME } from "./site";

/*
  Metadata for a page under the root layout. Next replaces nested objects
  rather than merging them, so without this every page would share the
  home page's Open Graph title and canonical URL.
*/
export const pageMetadata = (
  path: string,
  title: string,
  description: string,
): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: path,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
});
