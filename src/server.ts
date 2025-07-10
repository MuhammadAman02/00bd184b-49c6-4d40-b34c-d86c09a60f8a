import { createApp } from "./app";

async function start() {
  try {
    const app = await createApp();
    
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const host = process.env.HOST || "0.0.0.0";

    await app.listen({ port, host });
    
    console.log(`🚀 Server running at http://${host}:${port}`);
    console.log(`📚 API Documentation available at http://${host}:${port}/docs`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

start();