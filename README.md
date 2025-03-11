# Qwik City App Template ⚡️

Base template for web projects using:

- [Qwik](https://qwik.dev/) - High-performance web framework
- [Docker/Podman](https://podman.io/) - Containerization
- [Firebase](https://firebase.google.com/) - Backend as a Service
  - Firebase Emulators for local development
- [Deno Deploy](https://deno.com/deploy) - Deployment platform

## Key Features

- Local development with Firebase Emulators
- Docker/Podman containers for development and production
- Automated deployment to Deno Deploy
- Continuous integration with GitHub Actions

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

## Initial Setup

1. Clone the repository
2. For production deployments only (execute once after creating your `.env` file):
   - Configure your repository name in `package.json`
   - Update the project name in `/.github/workflows/deploy.yml` to match your Deno Deploy project
   - Locate the `prepare.env.file` script in the package.json file
   - Replace `eddraz/qwik-deno-docker` with your repository name
   - Update the origin URL `https://qwik-docker.deno.dev` in `/adapters/deno/vite.config.ts` with your Deno Deploy project URL

## Prerequisites

### Install GitHub CLI

Install the [GitHub CLI](https://github.com/cli/cli/blob/trunk/docs/install_linux.md):

```bash
type -p curl >/dev/null || (sudo apt update && sudo apt install curl -y)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y

# Authenticate with GitHub
gh auth login
```

### Install Podman

Install [Podman](https://podman.io/getting-started/installation) and [Podman Desktop](https://podman-desktop.io/) for container management.

### Install Firebase CLI and Emulators

```shell
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Install and configure emulators
firebase init emulators
```

## Configuration

### 1. Firebase Setup

1. Create a `.env` file in the root directory with the following configuration:

```
PUBLIC_API_KEY=xxxxxxxxxxxxx
PUBLIC_AUTH_DOMAIN=xxxxxxxxxxxxx
PUBLIC_PROJECT_ID=xxxxxxxxxxxxx
PUBLIC_STORAGE_BUCKET=xxxxxxxxxxxxx
PUBLIC_MESSAGING_SENDER_ID=xxxxxxxxxxxxx
PUBLIC_APP_ID=xxxxxxxxxxxxx
PUBLIC_MEASUREMENT_ID=xxxxxxxxxxxxx
```

2. Update your Firebase project name in `.firebaserc`

### 2. GitHub Actions Setup

1. Configure environment secrets:

```bash
pnpm run prepare.env.file
```

This command will:

- Encode your `.env` file to base64
- Create/update the `ENV_FILE_CONTENT` secret in your GitHub repository

⚠️ IMPORTANT:

- Never commit `.env` or `.env.base64` files
- Ensure you have the correct repository name in `package.json`
- Run this command whenever you update your `.env` file

## Development

### Local Development

Run the application locally using Podman Compose:

```shell
podman compose --profile dev up --build
```

### Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
pnpm build # or `pnpm build`
```

Deploy the application in production mode:

```shell
podman compose --profile prod up --build
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
