// Version configuration
// MAJOR and MINOR are set manually
// PATCH is auto-generated from git commit count at build time

export const VERSION_MAJOR = 1;
export const VERSION_MINOR = 0;

// This is injected at build time by Vite
// Falls back to 'dev' in development if not available
export const VERSION_PATCH = (() => {
  try {
    // @ts-ignore - injected by Vite at build time
    return typeof __GIT_COMMIT_COUNT__ !== 'undefined' ? __GIT_COMMIT_COUNT__ : 'dev';
  } catch {
    return 'dev';
  }
})();

export const getVersion = () => `v${VERSION_MAJOR}.${VERSION_MINOR}.${VERSION_PATCH}`;
