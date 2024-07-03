export async function onPresenceUpdate(client) {
  client.on("presenceUpdate", async (oldPresence, newPresence) => {
    let nowStreaming = false;
    newPresence.activities.forEach((activity) => {
      if (activity.type === "Streaming") {
        nowStreaming = true;
      }
    });

    const nowLiveRole = newPresence.guild.roles.cache.get("653066180617306123");

    if (nowStreaming) {
      await newPresence.member.roles.add(nowLiveRole);
    } else {
      await newPresence.member.roles.remove(nowLiveRole);
    }
  });
}
