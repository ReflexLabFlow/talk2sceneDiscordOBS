/**
 * 🎧 Discord → OBS Connector
 * Public Distribution Version (GitHub-Ready)
 * Author: ReflexLabFlow / Johannes Glaw
 * 🧩 Description:
 * This script connects a Discord voice channel to OBS.
 * When someone starts/stops speaking, it sends messages
 * to OBS Advanced Scene Switcher via WebSocket.
 *
 * 💡 Example Use:
 * Auto-switch OBS scenes depending on who speaks in Discord.
 *
 * ────────────────────────────────────────────────
 * ⚠️ Security Note:
 * Never share your Token publicly!
 * It grants full access to your bot. If leaked, reset it immediately.
 * ────────────────────────────────────────────────
 */

import { Client, GatewayIntentBits } from "discord.js";
import { joinVoiceChannel, getVoiceConnection } from "@discordjs/voice";
import OBSWebSocket from "obs-websocket-js";
import { v4 as uuidv4 } from "uuid";

// ========== CONFIGURATION ==========
const token = "";         // 🔑 Your Discord Bot Token
const guildId = "";        // 🏠 Your Discord Server ID
const channelId = "";      // 🔊 Voice Channel ID
const serverPass = "";     // 🔐 OBS WebSocket Password (from OBS settings)
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

      // Auto-reconnect if OBS disconnects
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


import { Client, GatewayIntentBits } from "discord.js";
import { joinVoiceChannel, getVoiceConnection } from "@discordjs/voice";
import OBSWebSocket from "obs-websocket-js";
import { v4 as uuidv4 } from "uuid";

const token = ""; // Bot-Token: 
const channelId = ""; // Voice-Channel-ID
const guildId = "";   // Server-ID
const serverPass = "";   // OBS-WebSocket Passwort

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

let connection;
const obs = new OBSWebSocket();

// Delay-Hilfsfunktion
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// OBS verbinden (inkl. Passwort)
async function connectOBS() {
  while (true) {
    try {
      await obs.connect("ws://localhost:4455", serverPass);
      console.log("✅ Mit OBS verbunden");

      obs.on("ConnectionClosed", async () => {
        console.warn("⚠️ OBS-Verbindung geschlossen, reconnect...");
        await wait(5000);
        await connectOBS();
      });

      break; // Verbindung steht, loop verlassen
    } catch (err) {
      console.log("⚠️ OBS-WebSocket nicht erreichbar, versuche in 5s erneut...");
      await wait(5000);
    }
  }
}

// Helper: Nachricht an Advanced Scene Switcher senden
const sendOBSRequest = async (text) => {
  console.log(`➡️ Sende OBS-Anfrage: "${text}"`);
  try {
    await obs.call("CallVendorRequest", {
      vendorName: "AdvancedSceneSwitcher",
      requestType: "AdvancedSceneSwitcherMessage",
      requestData: { message: text },
      requestId: uuidv4(), // eindeutige ID für jede Anfrage
    });
  } catch (err) {
    console.error("❌ OBS-Anfrage konnte nicht gesendet werden:", err);
  }
};

// Discord ready
client.once("ready", async () => {
  console.log(`✅ Eingeloggt als ${client.user.tag}`);

  try {
    const guild = await client.guilds.fetch(guildId);
    const channel = await guild.channels.fetch(channelId);

    // Prüfen ob Bot schon drin ist
    const oldConnection = getVoiceConnection(guildId);
    if (oldConnection) {
      console.log("♻️ Bot war schon im Voice-Channel, trenne kurz...");
      oldConnection.destroy();
      await wait(2000);
      console.log("♻️ 2 Sekunden Pause vorbei, verbinde neu");
    }

    // Bot joinen
    connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    console.log("🎧 Bot ist im Voice-Channel");

    // OBS verbinden
    await connectOBS();

    // Speaking-Events
    const receiver = connection.receiver;

    receiver.speaking.on("start", async (userId) => {
      let member = guild.members.cache.get(userId);
      if (!member) member = await guild.members.fetch(userId).catch(() => null);
      if (member) {
        const text = `START:${member.user.username}`;
        console.log(`🎙️ ${member.user.username} spricht jetzt`);
        await sendOBSRequest(text);
      }
    });

    receiver.speaking.on("end", async (userId) => {
      let member = guild.members.cache.get(userId);
      if (!member) member = await guild.members.fetch(userId).catch(() => null);
      if (member) {
        const text = `END:${member.user.username}`;
        console.log(`🛑 ${member.user.username} hört auf zu sprechen`);
        await sendOBSRequest(text);
      }
    });

  } catch (error) {
    console.error("❌ Fehler beim Einrichten:", error);
  }
});

// Clean Exit
process.on("SIGINT", () => {
  console.log("\n🛑 Beende Bot...");
  if (connection) connection.destroy();
  client.destroy();
  obs.disconnect();
  process.exit();
});

client.login(token);
