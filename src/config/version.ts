// Version configuration
// MAJOR and MINOR are set manually
// PATCH is auto-generated from git commit count at build time

export const VERSION_MAJOR = 1;
export const VERSION_MINOR = 0;

// Injected at build time by Vite
export const VERSION_PATCH = (() => {
  try {
    // @ts-ignore - injected by Vite
    return typeof __GIT_COMMIT_COUNT__ !== "undefined" ? __GIT_COMMIT_COUNT__ : "dev";
  } catch {
    return "dev";
  }
})();

export const BUILD_TIMESTAMP: string = (() => {
  try {
    // @ts-ignore - injected by Vite
    return typeof __BUILD_TIMESTAMP__ !== "undefined" ? __BUILD_TIMESTAMP__ : new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
})();

export const getVersion = () => `v${VERSION_MAJOR}.${VERSION_MINOR}.${VERSION_PATCH}`;

export const getBuildNumber = () => `build ${VERSION_PATCH}`;

/**
 * Format the build timestamp in the user's local timezone with TZ abbreviation.
 * e.g. "Jun 5, 2026, 2:31 PM PDT"
 */
export const getFormattedBuildTimestamp = () => {
  try {
    const date = new Date(BUILD_TIMESTAMP);
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
  } catch {
    return BUILD_TIMESTAMP;
  }
};
