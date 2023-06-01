import fp from "fastify-plugin";
import oauthPlugin from "@fastify/oauth2";
import dotenv from "dotenv";
dotenv.config();
export default fp(async (fastify, otns) => {
  fastify.register(oauthPlugin, {
    name: "googleOAuth2",
    scope: ["email"],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/login/google",
    callbackUri: "http://localhost:3000/google/callback",
  });
});
