interface ResolvedMetadata extends DeprecatedMetadataFields {
    metadataBase: null | URL;
    title: null | AbsoluteTemplateString;
    description: null | string;
    applicationName: null | string;
    authors: null | Array<Author>;
    generator: null | string;
    keywords: null | Array<string>;
    referrer: null | ReferrerEnum;
    /**
     * @deprecated
     */
    themeColor: null | ThemeColorDescriptor[];
    /**
     * @deprecated
     */
    colorScheme: null | ColorSchemeEnum;
    /**
     * @deprecated
     */
    viewport: null | string;
    creator: null | string;
    publisher: null | string;
    robots: null | ResolvedRobots;
    alternates: null | ResolvedAlternateURLs;
    icons: null | ResolvedIcons;
    openGraph: null | ResolvedOpenGraph;
    manifest: null | string | URL;
    twitter: null | ResolvedTwitterMetadata;
    facebook: null | ResolvedFacebook;
    verification: null | ResolvedVerification;
    appleWebApp: null | ResolvedAppleWebApp;
    formatDetection: null | FormatDetection;
    itunes: null | ItunesApp;
    abstract: null | string;
    appLinks: null | ResolvedAppLinks;
    archives: null | Array<string>;
    assets: null | Array<string>;
    bookmarks: null | Array<string>;
    category: null | string;
    classification: null | string;
    other: null | ({
        [name: string]: string | number | Array<string | number>;
    } & DeprecatedMetadataFields);
}
type RobotsFile = {
    rules: {
        userAgent?: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
    } | Array<{
        userAgent: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
    }>;
    sitemap?: string | string[];
    host?: string;
};
type SitemapFile = Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: {
        languages?: Languages<string>;
    };
}>;
type ResolvingMetadata = Promise<ResolvedMetadata>;
declare namespace MetadataRoute {
    type Robots = RobotsFile;
    type Sitemap = SitemapFile;
    type Manifest = ManifestFile;
}


/////////////////////////////////////////// BUILD //////////////////////////////////////////

npm run build

cp -r ./node_modules/.pnpm/sodium-native@3.4.1/node_modules/sodium-native/prebuilds ".next/server/app/(auth)/login"

cp -r ./node_modules/.pnpm/sodium-native@3.4.1/node_modules/sodium-native/prebuilds ".next/server/app/api/rpc/[[...blitz]]"

cp -r ./node_modules/.pnpm/sodium-native@3.4.1/node_modules/sodium-native/prebuilds ".next/server/app/(auth)/reset-password"

npm start