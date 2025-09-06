<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useWebSocket } from "@vueuse/core";

const { status, data, send, open, close } = useWebSocket(
  "ws://localhost:3000/_ws",
  {
    autoReconnect: true,
    heartbeat: true,
    onConnected() {
      // console.log("[WebSocket] Connected to server");
    },
    onDisconnected() {
      // console.log("[WebSocket] Disconnected from server");
    },
    onError(event) {
      // console.error("[WebSocket] Error:", event);
    },
    onMessage(ws, event) {
      // console.log("[WebSocket] onMessage event:", event);
      // console.log("[WebSocket] event.data:", event.data);

      if (!event.data) return;

      let messageData = event.data;

      // Handle string messages that need JSON parsing
      if (typeof event.data === "string") {
        try {
          messageData = JSON.parse(event.data);
        } catch (error) {
          // console.log("[WebSocket] Plain text message:", event.data);
          return;
        }
      }

      // Handle different message types
      if (messageData && typeof messageData === "object") {
        if (messageData.type === "broadcast") {
          // console.log(
          //   "[WebSocket] 🎉 Broadcast received:",
          //   messageData.message,
          // );
        } else if (messageData.type === "ping_broadcast") {
          // console.log("[WebSocket] 🏓 Ping broadcast:", messageData.message);
          // console.log(
          //   "[WebSocket] From endpoint:",
          //   messageData.endpoint,
          //   "at",
          //   messageData.timestamp,
          // );
        }
      }
    },
  },
);

provide("websocket", {
  status,
  data,
  send,
  open,
  close,
});

// Log connection status changes
watch(status, (newStatus) => {
  // console.log("[WebSocket] Status changed to:", newStatus);
});

// Messages are now handled in onMessage callback above
</script>
