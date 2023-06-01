export default function (fastify, optns, done) {
  try {
    fastify.get("/example", async (request, reply) => {
      console.log(request.session);
      console.log(request.session.get("token"));
      reply.send("user is validated");
    });
    done();
  } catch (err) {
    reply.send(err);
  }
}
