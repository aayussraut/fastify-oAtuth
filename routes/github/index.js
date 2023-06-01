import dotenv from "dotenv";
dotenv.config();

export default async function (fastify, opts) {
  fastify.get("/callback", async function (req, reply) {
    try {
      const token =
        await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
      req.session.token = token;
      console.log(req.session.token);
      reply.redirect("/");
    } catch (err) {
      console.log(err);
    }
    // axios
    //   .post(
    //     "https://github.com/login/oauth/access_token",
    //     {
    //       client_id: process.env.CLIENT_ID,
    //       client_secret: process.env.CLIENT_SECRET,
    //       code: request.query.code,
    //     },
    //     {
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log("You are authorized: " + result.data.access_token);
    //     // request.session.set("user", result.data.access_token);
    //     request.session.user = result.data.access_token;
    //     console.log(request.session.get("user"));
    //     // reply.send("Authorization successful!");
    //   })
    //   .catch((err) => {
    //     reply.send(err);
    //   });
  });
}
