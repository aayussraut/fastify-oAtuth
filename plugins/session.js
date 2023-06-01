import fastify from "fastify";
import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import axios from "axios";

export default fp(async (fastify, optns) => {
  fastify.register(fastifyCookie);

  fastify.register(fastifySession, {
    secret: "thisismy32characterlongsecretkey",
    cookie: {
      secure: false,
      maxAge: 60000,
      expires: Date.now() + 60 * 1000,
    },
    saveUninitialized: false,
  });

  fastify.decorate("authenticate", async function (req, reply) {
    try {
      const token = await req.session.token;
      console.log(token);

      if (token === undefined) {
        reply.code(401).send({ error: "Unauthorized User" });
      }

      const response = await axios.post(
        `https://api.github.com/applications/${process.env.CLIENT_ID}/token`,
        { access_token: token.token.access_token },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64")}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      reply.send(err);
    }
  });

  // fastify.decorate("authenticate", async (req, reply, done) => {
  //   console.log(req.session.user);
  //   if (!req.session.user) {
  //     reply.code(401).send({ msg: "Please login" });
  //   } else {
  //     done();
  //   }
  // const user = await req.server.user.findOne({
  //   where: { id: req.session.userId },
  // });
  // if (user) {
  //   console.log("You are authenticated");
  // } else {
  //   reply.code(401).send({ msg: "Please login" });
  // }
  // done();
  // });
});
