export const isDev = process.env.NODE_ENV === 'development';

/**
 * Name of Global partition
 */
export const windowPartition = 'default';

/**
 * List of permissions: https://developer.chrome.com/extensions/declare_permissions#manifest
 */
export const allowedWindowPermissions: Array<string> = [];
