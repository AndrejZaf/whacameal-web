<p align="center">
<img align="center" width="300" alt="Whac a Meal" src="./public/whc_logo.svg" />
</p>
<h1 align="center" style="font-weight: bold;">Whac A Meal</h1>

<p align="center">
  <a href="#tech">Technologies</a> •
  <a href="#started">Getting Started</a>
</p>

<p align="center">
    <b>Exploring NextJS by creating a blog like application for managing, exploring recipes and leveraging Google Gemini for content generation.</b>
</p>

<p align="center">
<img align="center" alt="Whac a Meal" src="./public/chrome-capture-2025-08-13.gif" />
</p>
<h2 id="technologies">💻 Technologies</h2>

- ![NextJS](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
- ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)
- ![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)
- ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)
- ![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)
- ![BetterAuth](https://img.shields.io/badge/Better%20Auth-3C3C3D?logo=betterauth&logoColor=white)
- ![GoogleGemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?logo=googlegemini&logoColor=white)

<h2 id="started">🚀 Getting started</h2>
<h3>Prerequisites</h3>

- [Node.js](https://nodejs.org/en/download/package-manager) - **Node 22**
- [TypeScript](https://www.npmjs.com/package/typescript)
- [Docker](https://www.docker.com/products/docker-desktop/)

<h3>Starting the Project</h3>

- Clone the project, install the node dependencies by running `npm install` and then you can start the application with
  `npm run dev`.
- Run the docker-compose.yml file located in the root of the project. This will allow you to bootstrap some of the project dependencies such as keycloak, ngrok, mailhog and the database.
- Create your own `.env` file with the following key-value pairs

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/wam
HOST=<HOST_URL>
SMTP_PORT=<SMTP_PORT>
SMTP_EMAIL=<SMTP_EMAIL>
SMTP_HOST=<SMTP_HOST>
BETTER_AUTH_SECRET=<BETTER_AUTH_SECRET>
BETTER_AUTH_URL=<BETTER_AUTH_OR_HOST_URL>
GEMINI_API_KEY=<YOUR_GEMINI_KEY>
```
