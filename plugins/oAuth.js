import fp from "fastify-plugin";
import oauthPlugin from "@fastify/oauth2";
import dotenv from "dotenv";
dotenv.config();

export default fp(async (fastify, otns) => {
  fastify.register(oauthPlugin, {
    name: "githubOAuth2",
    scope: [],
    credentials: {
      client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
      },
      auth: oauthPlugin.GITHUB_CONFIGURATION,
    },
    startRedirectPath: "/login/github",
    callbackUri: "http://localhost:3000/github/callback",
  });
});
