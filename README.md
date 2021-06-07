<h1 style="text-align: center">Electron TypeScript esbuild Boilerplate</h1>

<br/>
<br/>

Secure template (if its not secure enough, lets make it) for electron applications with some nice DX.
Under the hood is used [webpack] with [esbuild] — super fast, hot reload, frontend framework agnostic and [electron-builder] for compilation.

<hr/>
<br/>
<br/>

### Contribution

- Found a problem, wanna refactor or fix for security issue? `Issues` and `pull requests` are welcome.

- If you have questions or suggestions - **feel free to [discuss it](https://github.com/goranurukalo/electron-ts-esbuild/discussions)**

<hr/>
<br/>
<br/>

### Get started

- Click the **[Use this template](https://github.com/goranurukalo/electron-ts-esbuild/generate)** button. (or clone if that makes you more comfy ☕)

> NOTE: we recommend usage of [yarn] over `npm`

- `yarn install`  - install deps needed for development and build
- `yarn dev`      - start a development environment
- `yarn package`  - build and package application so we can release it
- `yarn test`     - test your code
- `yarn lint`     - check code quality
> NOTE: there is `yarn build` but its used for debugging purposes (packaging takes long time)

<hr/>
<br/>
<br/>

## Status

This template was created for public to use and grasp anything valuable from it.

Please still feel free to invest in this template, but idea is that this is just a bare minimum or like a bare template that "every" project needs (at least in my case)

Unfortunately i cannot guarantee that this template is going to be maintained in the future.

<hr/>
<br/>
<br/>

## Known issues

- ⚠ Some files require refactoring.
- ⚠ Things still in TODO (not sure if that should be done for everyone)
- Needs more examples or at least popular framework integrations (maybe as branches?)
- ⚠ We have [webpack], we should be able to use only [esbuild] and its [API](https://esbuild.github.io/api/#watch)

**Pull requests are welcome**.

<hr/>
<br/>
<br/>

### Project Structure

Structure is really simple, everything thats needed is in src directory

- [`src/main`](src/main) 
Electron's [**main script**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file).

- [`src/preload`](src/preload)
Electron's way to make bridge between renderer and main/node processes
Please check [Security Recommendations](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content)

- [`src/renderer`](src/renderer)
Electron's [**webview**](https://www.electronjs.org/docs/tutorial/quick-start#create-a-web-page).

<hr/>
<br/>
<br/>


[electron-builder]: https://github.com/electron-userland/electron-builder
[electron]: https://github.com/electron/electron
[esbuild]: https://github.com/evanw/esbuild
[typescript]: https://github.com/microsoft/TypeScript/
[webpack]: https://github.com/webpack/webpack
[yarn]: https://github.com/yarnpkg/yarn
