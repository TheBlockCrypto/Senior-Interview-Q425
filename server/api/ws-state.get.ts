export default defineEventHandler(async () => {
  const { wsState } = await import("../routes/_ws");

  const uptime = Date.now() - wsState.startTime.getTime();
  const uptimeMinutes = Math.floor(uptime / 60000);
  const uptimeSeconds = Math.floor((uptime % 60000) / 1000);

  const clientIds = Array.from(wsState.connectedPeers).map((_, index) => {
    return `client_${index + 1}`;
  });

  return {
    status: "active",
    timestamp: new Date().toISOString(),
    uptime: {
      milliseconds: uptime,
      human: `${uptimeMinutes}m ${uptimeSeconds}s`,
    },
    connections: {
      total: wsState.connectedPeers.size,
      clientIds: clientIds,
    },
    stats: {
      totalMessages: wsState.messageCount,
      averageMessagesPerMinute:
        uptimeMinutes > 0
          ? Math.round(wsState.messageCount / uptimeMinutes)
          : 0,
    },
    serverInfo: {
      startTime: wsState.startTime.toISOString(),
      endpoint: "ws://localhost:3000/_ws",
    },
  };
});

