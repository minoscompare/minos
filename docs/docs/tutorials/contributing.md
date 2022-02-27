---
sidebar_position: 1
---

# Contributing to Minos

## System Requirements

- [Node 14+](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- [Docker](https://docs.docker.com/get-docker/) (required to run the API)

:::info WSL on Windows

It is highly recommended that you use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install)
(see [What is WSL?](https://docs.microsoft.com/en-us/windows/wsl/about))
on Windows for a better developer experience.

:::

## Setup

1. Clone the repository

   ```bash
   git clone https://github.com/minoscompare/minos
   cd minos
   ```

2. Install dependencies

   ```bash
   yarn
   ```

3. Copy development env file

   ```bash
   cp .env.example .env
   ```

4. Start docker containers

   ```bash
   docker-compose up
   ```

   :::note Detach Daemon

   You can run `docker-compose up -d` to detach your console from the daemon and run `docker-compose down` to shutdown
   the containers.

   :::

5. Sync database schema with Postgres

   ```bash
   npx prisma db push
   ```

6. Seed database and typesense

   ```bash
   yarn sync
   ```

7. Start the development server
   ```bash
   yarn dev
   ```
