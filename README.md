# Qwik City App ⚡️

- [Qwik Docs](https://qwik.dev/)
- [Discord](https://qwik.dev/chat)
- [Qwik GitHub](https://github.com/QwikDev/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)

---

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.dev/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.dev/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Prerequisites

### Install Podman
Podman is required to run the containerized application. Follow the installation instructions for your operating system from the [official Podman documentation](https://podman.io/getting-started/installation).

It is recommended to install [Podman Desktop](https://podman-desktop.io/) for a better container management experience with a graphical interface.

### Install Firebase CLI
The Firebase CLI is required for deployment and local development:

```shell
npm install -g firebase-tools
```

## Configuration

### Firebase Setup

1. Create a `.env` file in the root directory with the following configuration:
```
VITE_API_KEY=xxxxxxxxxxxxx
VITE_AUTH_DOMAIN=xxxxxxxxxxxxx
VITE_PROJECT_ID=xxxxxxxxxxxxx
VITE_STORAGE_BUCKET=xxxxxxxxxxxxx
VITE_MESSAGING_SENDER_ID=xxxxxxxxxxxxx
VITE_APP_ID=xxxxxxxxxxxxx
VITE_MEASUREMENT_ID=xxxxxxxxxxxxx
```

2. Update your Firebase project name in `.firebaserc`

## Add Integrations and deployment

Use the `pnpm qwik add` command to add additional integrations. Some examples of integrations includes: Cloudflare, Netlify or Express Server, and the [Static Site Generator (SSG)](https://qwik.dev/qwikcity/guides/static-site-generation/).

```shell
pnpm qwik add # or `pnpm qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `pnpm start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
pnpm preview # or `pnpm preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
pnpm build # or `pnpm build`
```

## Running the Application

### Local Development
Run the application locally using Podman Compose:

```shell
podman compose --profile dev up --build
```

### Production Deployment
Deploy the application in production mode:

```shell
podman compose --profile prod up --build
```

## Deno Server

This app has a minimal [Deno server](https://docs.deno.com/runtime/tutorials/http_server) implementation. After running a full build, you can preview the build using the command:

```
pnpm serve
```

Then visit [http://localhost:8080/](http://localhost:8080/)
