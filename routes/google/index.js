import dotenv from "dotenv";
dotenv.config();

export default async function (fastify, opts) {
  fastify.get("/callback", async function (req, reply) {
    try {
      const token =
        await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
      req.session.token = token;
      console.log(req.session.token);
      reply.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });
}
