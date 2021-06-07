const { spawn, execSync } = require('child_process');

let electronProcess = null;

module.exports = class ElectronReloadPlugin {
  constructor(startPath = '.') {
    this.startPath = startPath;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
      if (electronProcess) {
        try {
          if (process.platform === 'win32') {
            execSync(`taskkill /pid ${electronProcess.pid} /f /t`);
          } else {
            electronProcess.kill();
          }

          electronProcess = null;
        } catch (e) {
          console.log('taskkill failed - ', e.message);
        }
      }

      electronProcess = spawn('electron', [this.startPath], {
        shell: true,
        env: process.env,
        stdio: 'pipe',
      });
      electronProcess.stdout.pipe(process.stdout);
    });
  }
};
