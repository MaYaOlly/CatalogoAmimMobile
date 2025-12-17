import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({ logger: true });

app.register(cors, {
  origin: true
});

app.get("/", async () => {
  return { message: "Hello World" };
});

const PORT = 3333;

app.listen({ port: PORT }, () => {
  console.log(`🚀 API Fastify rodando em http://localhost:${PORT}`);
});
