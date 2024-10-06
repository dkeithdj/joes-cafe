FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y openssl

RUN pnpm install --frozen-lockfile
RUN pnpm run build

EXPOSE 3000 3001 3002 3003 5555
CMD ["pnpm", "start"]