import Fastify from "fastify";
import cors from "@fastify/cors";
import { produtoRoutes } from "./infrastructure/http/routes/produtoRoutes";

const app = Fastify({ logger: true });

app.register(cors, {
  origin: true
});

app.register(produtoRoutes);

app.get("/", async () => {
  return { message: "Hello World" };
});

const PORT = 3333;

app.listen({ port: PORT }, () => {
  console.log(`🚀 API Fastify rodando em http://localhost:${PORT}`);
});