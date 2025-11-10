# talk2sceneDiscordOBS
A lightweight Node.js bridge between Discord voice chat and OBS – automatically triggers scene actions in OBS when users start or stop speaking.

## 🔹 Description
**OBS Discord Voice Link** connects a Discord voice channel to OBS.  
When someone starts or stops speaking, messages are sent to **OBS Advanced Scene Switcher**, allowing automatic scene or overlay changes.  
Perfect for streamers, podcasts, or group discussions.

---

## 🛠️ Features
- 🎙️ Detects when users start/stop speaking in Discord
- 🔌 Sends messages to OBS via WebSocket
- ♻️ Auto-reconnect for OBS if connection is lost
- 💻 Easy setup: `npm install` → `node index.js`
- 🧩 No deep coding knowledge required

---

## ⚡ Setup Instructions

### 1️⃣ Create a Discord Bot
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**, name it (e.g., "OBS Voice Link")
3. In the left menu, go to **Bot** → **Add Bot**
4. Copy the **Token** → paste it into `token` in `index.js`  

### 2️⃣ Set Required Bot Permissions
- Scopes: `bot`
- Bot Permissions:
  - Connect
  - Speak
  - View Channels
  - Read Messages/View Channels
  - Use Voice Activity  
Generate the OAuth2 invite URL and add the bot to your server.

### 3️⃣ Get IDs
- Enable Developer Mode in Discord (Settings → Advanced)
- Right-click your server → **Copy Server ID**
- Right-click the voice channel → **Copy Channel ID**
- Paste both into `guildId` and `channelId` in `index.js`

### 4️⃣ OBS Setup
- Open OBS → Settings → **WebSocket Server Settings**
- Enable WebSocket server (default: `ws://localhost:4455`)
- Set a password → paste it into `serverPass` in `index.js`
- Install **Advanced Scene Switcher** plugin

### 5️⃣ Run the Bot
```bash
npm install
node index.js
