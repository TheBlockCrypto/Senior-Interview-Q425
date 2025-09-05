import { db } from "../../lib/db";
import { cache } from "../../lib/cache";

export default defineEventHandler(async () => {
  const cached = await cache.get<{ timestamp: number }>("ping");

  // Broadcast ping to all WebSocket clients
  const broadcastMessage = async () => {
    try {
      const { wsState } = await import("../routes/_ws");
      const pingMessage = {
        type: "ping_broadcast",
        message: "🏓 Someone pinged the server!",
        timestamp: new Date().toISOString(),
        endpoint: "/api/ping",
      };

      console.log(
        `[ping] Broadcasting to ${wsState.connectedPeers.size} WebSocket clients`,
      );

      wsState.connectedPeers.forEach((peer: any) => {
        try {
          peer.send(pingMessage);
        } catch (error) {
          console.error("[ping] Error broadcasting to peer:", error);
        }
      });
    } catch (error) {
      console.error("[ping] Error importing wsState:", error);
    }
  };

  // Broadcast to WebSocket clients
  await broadcastMessage();

  if (cached) {
    return {
      message: "pong (cached)",
      timestamp: cached.timestamp,
      database: "connected",
      cache: "hit",
      broadcast: "sent",
    };
  }

  try {
    await db.$client.prepare("SELECT 1 as test").get();
    const response = {
      message: "pong",
      timestamp: Date.now(),
      database: "connected",
      cache: "miss",
      broadcast: "sent",
    };

    await cache.set("ping", response, 30);

    return response;
  } catch (error) {
    return {
      message: "pong",
      timestamp: Date.now(),
      database: "error",
      cache: "miss",
      broadcast: "sent",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});

