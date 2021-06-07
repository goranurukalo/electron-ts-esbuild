/* eslint-disable no-param-reassign */
import { app, session } from 'electron';
import { windowPartition, allowedWindowPermissions } from './settings';

/**
 * Allow user to access webcam for example
 * we disabled everything at the moment
 * we will add features as we go
 */
export function setupPermissions() {
  session.fromPartition(windowPartition)
    .setPermissionRequestHandler((webContents, permission, next) => {
      const permissionAllowed = allowedWindowPermissions.includes(permission);

      // TODO: maybe even check the url, or protocol etc... `const url = webContents.getURL()`

      if (!permissionAllowed) {
        // TODO: track ALL errors
        console.error(`The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`);
      }
      next(permissionAllowed);
    });
}

/**
 * Disable some of the actions that some websites can do
 * this is mostly to prevent bad stuff happen to user
 *
 * we follow electron recommendations
 * https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation
 * note that we don't need any of these features, thats why we follow them
 *
 * In case u need them, we would suggest you to verify them more then to turn them off, ty
 */
export function setupSecurity() {
  app.on('web-contents-created', (event, contents) => {
    /**
     * User or page trying to change window.location
     * https://www.electronjs.org/docs/api/web-contents#event-will-navigate
     */
    contents.on('will-navigate', (contentsEvent, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);
      const validOrigins: Array<string> = [];
      const isNavigationAllowed = validOrigins.includes(parsedUrl.origin);

      if (isNavigationAllowed) return;

      // TODO: track ALL errors
      console.error(`The application tried to redirect to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`);
      contentsEvent.preventDefault();
    });

    /**
     * Emitted as a server side redirect occurs during navigation. For example a 302 redirect.
     * https://www.electronjs.org/docs/api/web-contents#event-will-redirect
     */
    contents.on('will-redirect', (contentsEvent, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);
      const validOrigins: Array<string> = [];
      const isRedirectAllowed = validOrigins.includes(parsedUrl.origin);

      if (isRedirectAllowed) return;

      // TODO: track ALL errors
      console.error(`The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`);
      contentsEvent.preventDefault();
    });

    /**
     * When page renders <webview> tag
     *
     * https://www.electronjs.org/docs/api/web-contents#event-will-attach-webview
     * https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation
     *
     * Remove all props from tag that can be security issue
     */
    contents.on('will-attach-webview', (contentsEvent, webPreferences /* , params */) => {
      // @ts-ignore
      delete webPreferences.preloadURL;
      // delete webPreferences.preload
      if (webPreferences.preload) {
        const validOrigins: Array<string> = [];
        const parsedPreloadUrl = new URL(webPreferences.preload);
        const isPreloadAllowed = validOrigins.includes(parsedPreloadUrl.origin);

        // TODO: check those and allow if its from our protocol
        if (!isPreloadAllowed) delete webPreferences.preload;
      }

      webPreferences.webSecurity = true;
      webPreferences.nodeIntegration = false;
      webPreferences.nodeIntegrationInSubFrames = false;
      webPreferences.nodeIntegrationInWorker = false;
    });

    /**
     * This code replaces the old "new-window" event handling;
     * https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows
     * https://github.com/electron/electron/pull/24517#issue-447670981
     */
    contents.setWindowOpenHandler(({ url }) => {
      const parsedUrl = new URL(url);
      const validOrigins: Array<string> = [];
      const isNewWindowAllowed = validOrigins.includes(parsedUrl.origin);
      const action = isNewWindowAllowed ? 'allow' : 'deny';

      if (!isNewWindowAllowed) {
        // TODO: track ALL errors
        console.error(`The application tried to open a new window at the following address: '${url}'. This attempt was blocked.`);
      }

      return {
        action,
      };
    });
  });
}
