# OBS Discord Voice Link

> A lightweight Node.js bridge between Discord voice chat and OBS – automatically triggers scene actions in OBS when users start or stop speaking.

## 🔹 Description
**OBS Discord Voice Link** connects a Discord voice channel to OBS.  
When someone starts or stops speaking, messages are sent to the **Advanced Scene Switcher** plugin in OBS, allowing automatic scene or overlay changes.  
Perfect for remote group shows, podcasts, and streamers. Ideally combined with **VDO.Ninja (Video.Ninja)** for visual speaker switching.

### 💡 Why this setup is efficient
- 🎧 In this setup only **video streams** are handled through VDO.Ninja – **audio stays in Discord**, reducing total input bitrate.  
- 🧠 Fewer active OBS sources = lower **CPU load** and smoother performance.  
- ⚡ Switching logic is fully automated – no need for manual scene control.  

**Note:** A small delay might occur between Discord speech audio and Video that comes with VDO.ninja, but it can easily be synchronized with OBS.

---

## 🛠️ Features
- 🎙️ Detects who is speaking in Discord  
- 🔌 Sends WebSocket messages directly to OBS  
- ♻️ Auto reconnect if OBS disconnects  
- 💻 Simple setup, beginner-friendly  
- 🎥 (Optional) Integrates with **VDO.Ninja** for video guest switching  

---

## ⚡ Prerequisites
Make sure you have these installed:

1. **Git** – https://git-scm.com/downloads  
2. **Node.js + npm** – https://nodejs.org (LTS recommended)  
3. **OBS Studio** – version 29 or higher: https://obsproject.com/  

---

## ⚡ Setup Instructions

### 1️⃣ Clone the Repository
Open your terminal or command prompt:

git clone https://github.com/ReflexLabFlow/talk2sceneDiscordOBS.git

The project folder will usually be here:

C:\Users\YourUsername\talk2sceneDiscordOBS\

Then go inside it:

cd talk2sceneDiscordOBS

---

### 2️⃣ Create a Discord Bot
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)  
2. Click **New Application** → name it (e.g., “OBS Voice Link”)  
3. In the left menu: **Bot** → **Add Bot**  
4. Copy the **Token** (you’ll use it later in `index.js`)

---

### 3️⃣ Set Required Bot Permissions
Under **OAuth2 → URL Generator**:
- **Scopes:** `bot`
- **Bot Permissions:**
  - Connect  
  - Speak  
  - View Channels  
  - Read Messages/View Channels  
  - Use Voice Activity  

Generate the invite URL and add the bot to your Discord server.

---

### 4️⃣ Edit Configuration
Open `index.js` and fill in your info:

const token = "";      // Discord Bot Token  
const guildId = "";    // Your Server ID  
const channelId = "";  // Voice Channel ID  
const serverPass = ""; // OBS WebSocket password  

---

### 5️⃣ OBS Setup
1. Open OBS → **Tools → Advanced Scene Switcher**  
2. Inside Advanced Scene Switcher:
   - Go to the **WebSocket** tab  
   - Add → **Request**  
   - Name: `DiscordBot`  
   - Type: `CallVendorRequest`  
   - Vendor Name: `AdvancedSceneSwitcher`  
   - Request Type: `AdvancedSceneSwitcherMessage`  
   - Request Data example: `{ "message": "START:discordUsername" }`  
   This lets OBS react to the Discord user who started or stopped speaking.
3. Enable the OBS WebSocket server:
   - Settings → WebSocket Server → Enable  
   - Port: 4455  
   - Set a password → use the same in `serverPass` inside `index.js`

---

## 🎥 Best Use-Case: Integrate VDO.Ninja (Video.Ninja)
If your Discord guests also appear via VDO.Ninja, you can use this bot to **switch to their corresponding video source in OBS** when they speak.

**Example setup:**
- Each remote guest joins through a dedicated VDO.Ninja link, e.g.:  
  https://vdo.ninja/?view=Laura  
  https://vdo.ninja/?view=Tobi  
- In OBS, add each VDO.Ninja link as a separate Browser Source (e.g. `Guest_Laura`, `Guest_Tobi`).  
- In Advanced Scene Switcher, create conditions like:
  - If message = `START:Laura` → show source `Guest_Laura`
  - If message = `START:Tobi` → show source `Guest_Tobi`
  - If message = `END:Laura` → hide source `Guest_Laura`
  - etc.

This allows automatic on-screen video switching between your Discord speakers, using only their voice activity.

---

### 6️⃣ Install Dependencies & Run

npm install  
node index.js

---

### 7️⃣ Update Later

git pull origin main

---

## 💡 Security Note
- Never share your **Discord Bot Token** publicly!  
- If your token leaks, regenerate it immediately in the Developer Portal.

---

## 💸 Support the Project
If this tool helps you, support development here:  
https://buymeacoffee.com/ReflexLabFlow

---

## 📄 License
MIT License – see LICENSE file for details.
