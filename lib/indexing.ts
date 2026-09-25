export const isIndexable = () => process.env.PUBLIC_SITE_INDEXABLE === '1' && process.env.VERCEL_ENV !== 'preview' && process.env.VERCEL_ENV !== 'development';
