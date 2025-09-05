export const wsState = {
  connectedPeers: new Set(),
  startTime: new Date(),
  messageCount: 0,
};

export default defineWebSocketHandler({
  open(peer) {
    // console.log("[ws] open", peer);
    wsState.connectedPeers.add(peer);
    // console.log(`[ws] Total connected clients: ${wsState.connectedPeers.size}`);
  },

  message(peer, message) {
    // console.log("[ws] Raw message received:", message);
    // console.log("[ws] Message type:", typeof message);

    wsState.messageCount++;

    let messageText: string = "";
    try {
      if (typeof message === "string") {
        messageText = message;
      } else if (message.data && Buffer.isBuffer(message.data)) {
        // Handle Buffer data (common format from WebSocket)
        messageText = message.data.toString("utf8");
      } else if (message.text && typeof message.text === "function") {
        messageText = message.text();
      } else if (message.toString) {
        messageText = message.toString();
      } else {
        messageText = String(message);
      }

      // console.log("[ws] Parsed message text:", messageText);

      if (messageText.includes("ping")) {
        peer.send({ user: "server", message: "pong" });
        return;
      }

      // Broadcast message to all connected clients
      // console.log(
      //   `[ws] Broadcasting message to ${wsState.connectedPeers.size} clients:`,
      //   messageText,
      // );

      wsState.connectedPeers.forEach((connectedPeer: any) => {
        if (connectedPeer !== peer) {
          // Don't send back to sender
          try {
            // Send as object (H3/CrossWS format)
            connectedPeer.send({
              type: "broadcast",
              message: messageText,
              timestamp: new Date().toISOString(),
            });
            // console.log("[ws] Message sent to peer:", messageText);
          } catch (error) {
            // console.error("[ws] Error sending to peer:", error);
          }
        }
      });
    } catch (error) {
      // console.error("[ws] Error processing message:", error);
    }
  },

  close(peer, event) {
    // console.log("[ws] close", peer, event);
    wsState.connectedPeers.delete(peer);
    // console.log(`[ws] Total connected clients: ${wsState.connectedPeers.size}`);
  },

  error(peer, error) {
    // console.log("[ws] error", peer, error);
    wsState.connectedPeers.delete(peer);
  },
});
