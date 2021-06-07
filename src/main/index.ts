import path from 'path';
import { app, BrowserWindow } from 'electron';

import { isDev } from './settings';
import { setupPermissions, setupSecurity } from './security';

// TODO: use protocol
// TODO: Gives our scheme access to load relative files
// TODO: depending on framework or libraries,
//       you might need to use some devtools extensions (check out 'electron-devtools-installer')
// TODO: in case you don't wanna use hardware acceleration:
//       `app.disableHardwareAcceleration();`
// TODO: refactor for future testing etc...
//       maybe make new App() and pass arguments (app, BrowserWindow, session, etc...)

let mainWindow: BrowserWindow | null = null;

function createBrowserWindow() {
  const rootAssetsPath = path.join(app.getAppPath(), 'build');

  /**
   * Create browser window
   * with security in mind
   * we disable whats not necessary
   *
   * there is `security.ts` file that manages security
   * lets say of whole app (kinda 😊)
   */
  mainWindow = new BrowserWindow({
    show: false,
    frame: true,
    hasShadow: true,
    // transparent: true,
    // vibrancy: 'dark', // make window transparent like
    backgroundColor: '#ffffff',
    minWidth: 400,
    minHeight: 450,
    width: 900,
    height: 700,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      devTools: isDev,
      preload: path.join(rootAssetsPath, 'preload.bundle.js'),
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webviewTag: true,
      webSecurity: true,
      // additionalArguments: [`storePath:${app.getPath("userData")}`],
      /**
       * A list of feature strings separated by `,`
       * For more details check documentation https://www.electronjs.org/docs/api/browser-window
       */
      disableBlinkFeatures: 'Auxclick',
    },
  });

  /**
   * Load application root file (index.html)
   *
   * in case of development environment
   * we load webpack's live reloading website
   *
   * otherwise we load file that is shipped with
   * whole application that we made and bundled
   * TODO: for production load with protocol in mind
   *       more secure
   *       example "win.loadURL(`${Protocol.scheme}://build/index.html`);"
   */
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.loadURL('http://localhost:3000/');
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(rootAssetsPath, 'index.html'));
  }

  /**
   * Show the app when content is ready
   */
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  /**
   * When close is requested, free pointers to main window.
   */
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.whenReady()
  .then(setupPermissions)
  .then(createBrowserWindow);

/**
 * Add security checks
 */
setupSecurity();

/**
 * Quit when all windows are closed.
 *
 * On macOS it is common for applications and their menu bar
 * to stay active until the user quits explicitly with Cmd + Q
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/**
 * On macOS it's common to re-create a window in the app when the
 * dock icon is clicked and there are no other windows open.
 */
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createBrowserWindow();
});

// TODO: in case you only want one window, please consider using:
//       `app.on('second-instance', callback)`
//
//       in case u wanna make only one window open (one instance) add this as well on beginning
//       `if (!app.requestSingleInstanceLock()) { app.quit(); process.exit(0); }`

/**
 * U can extend this and add more useful things
 *
 * You can:
 * - delay when to check for updates
 * - notify renderer and then press to download and do update like that (controlled way)
 * - add context menu that on press checks for update
 * - etc...
 */
// if (!isDev) {
//   app.whenReady()
//     .then(() => import('electron-updater'))
//     .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
//     .catch((e: Error) => {
//       console.error('Failed check updates:', e);
//     });
// }
