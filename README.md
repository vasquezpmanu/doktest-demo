# Doktest demo

A tiny Node.js app for testing Git branch deployments with Mini-Dokploy. It has no external dependencies and displays the branch used to build it.

## Branches

| Branch | Page heading | Background |
| --- | --- | --- |
| `main` | Doktest demo — main | Blue |
| `doktest` | Doktest demo — doktest | Green |

The branch name, heading, and background are defined in `server.mjs`. Both branches use the same Dockerfile and internal port, so switching branches produces a visible change without changing the deployment configuration.

## Run locally

Use Node.js 22 or later. No `npm install` is required.

```sh
git clone https://github.com/vasquezpmanu/doktest-demo.git
cd doktest-demo
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `npm start` runs the same server.

To see the other version, stop the server, switch branches, and start it again:

```sh
git switch doktest
npm run dev
```

The server listens on `0.0.0.0` and uses port `3000` by default. To use a different port, for example when Mini-Dokploy already occupies port 3000:

```sh
PORT=3001 npm run dev
```

## Run with Docker

Build and run the main version:

```sh
git switch main
docker build -t doktest-demo:main .
docker run --rm -p 8080:3000 doktest-demo:main
```

Open [http://localhost:8080](http://localhost:8080) to see the blue page. Stop that container before running the other version:

```sh
git switch doktest
docker build -t doktest-demo:doktest .
docker run --rm -p 8080:3000 doktest-demo:doktest
```

The page should now be green and display `doktest`.

## Deploy with Mini-Dokploy

| Setting | Value |
| --- | --- |
| Git repository URL | `https://github.com/vasquezpmanu/doktest-demo.git` |
| Dockerfile path | `Dockerfile` |
| App port inside the container | `3000` |
| Branches | `main` and `doktest` |

Mini-Dokploy currently clones the repository's default branch, which is `main`. Deploying `doktest` from its panel requires branch selection support in the controller.

Responses use `Cache-Control: no-store` so a browser refresh can show the new version after a successful redeploy.
