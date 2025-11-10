/**
 * 🎧 OBS Discord Voice Link
 * Public Distribution Version (GitHub-Ready)
 * Author: ReflexLabFlow / Johannes Glaw
 *
 * ℹ️ See README.md for full setup instructions, permissions, and OBS configuration
 *
 * ⚠️ Security Note:
 * Never share your Bot Token publicly!
 * It grants full access to your bot. Reset immediately if leaked.
 */

import { Client, GatewayIntentBits } from "discord.js";
import { joinVoiceChannel, getVoiceConnection } from "@discordjs/voice";
import OBSWebSocket from "obs-websocket-js";
import { v4 as uuidv4 } from "uuid";

// ========== CONFIGURATION ==========
const token = "";         // 🔑 Your Discord Bot Token
const guildId = "";       // 🏠 Your Discord Server ID
const channelId = "";     // 🔊 Voice Channel ID
const serverPass = "";    // 🔐 OBS WebSocket Password
// ===================================

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

let connection;
const obs = new OBSWebSocket();

// Helper: Delay function
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 🔌 Connect to OBS WebSocket (auto-reconnect)
 */
async function connectOBS() {
  while (true) {
    try {
      await obs.connect("ws://localhost:4455", serverPass);
      console.log("✅ Connected to OBS");

      obs.on("ConnectionClosed", async () => {
        console.warn("⚠️ OBS connection lost, reconnecting...");
        await wait(5000);
        await connectOBS();
      });

      break;
    } catch {
      console.log("⚠️ OBS not reachable, retrying in 5s...");
      await wait(5000);
    }
  }
}

/**
 * 📨 Send message to OBS Advanced Scene Switcher
 */
const sendOBSRequest = async (text) => {
  console.log(`➡️ Sending to OBS: "${text}"`);
  try {
    await obs.call("CallVendorRequest", {
      vendorName: "AdvancedSceneSwitcher",
      requestType: "AdvancedSceneSwitcherMessage",
      requestData: { message: text },
      requestId: uuidv4(),
    });
  } catch (err) {
    console.error("❌ Could not send to OBS:", err);
  }
};

/**
 * 🚀 Bot Startup
 */
client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  try {
    const guild = await client.guilds.fetch(guildId);
    const channel = await guild.channels.fetch(channelId);

    // Reconnect if already connected
    const oldConnection = getVoiceConnection(guildId);
    if (oldConnection) {
      console.log("♻️ Reconnecting to voice channel...");
      oldConnection.destroy();
      await wait(2000);
    }

    // Join the voice channel
    connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    console.log("🎧 Joined voice channel");

    // Connect to OBS
    await connectOBS();

    // Listen for speaking events
    const receiver = connection.receiver;

    receiver.speaking.on("start", async (userId) => {
      let member = guild.members.cache.get(userId);
      if (!member) member = await guild.members.fetch(userId).catch(() => null);
      if (member) {
        console.log(`🎙️ ${member.user.username} started speaking`);
        await sendOBSRequest(`START:${member.user.username}`);
      }
    });

    receiver.speaking.on("end", async (userId) => {
      let member = guild.members.cache.get(userId);
      if (!member) member = await guild.members.fetch(userId).catch(() => null);
      if (member) {
        console.log(`🛑 ${member.user.username} stopped speaking`);
        await sendOBSRequest(`END:${member.user.username}`);
      }
    });

  } catch (err) {
    console.error("❌ Setup failed:", err);
  }
});

/**
 * 🧹 Graceful shutdown on Ctrl+C
 */
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down...");
  if (connection) connection.destroy();
  client.destroy();
  obs.disconnect();
  process.exit();
});

// Start the bot
client.login(token);
