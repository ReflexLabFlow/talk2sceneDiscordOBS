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


## ⚡ Vorinstallation
Bevor du startest, installiere die folgenden Programme:

1. **Git** – für Repository-Klonen  
   [https://git-scm.com/downloads](https://git-scm.com/downloads)  

2. **Node.js + npm** – für das Ausführen des Bots  
   [https://nodejs.org](https://nodejs.org) (empfohlen LTS-Version)  

3. **OBS Studio** – mindestens Version 29+  
   [https://obsproject.com/de](https://obsproject.com/de)  

Optional: **Python** wird nur benötigt, falls OBS-Plugins Python-Skripte nutzen, für unseren Bot nicht zwingend erforderlich.

---

## ⚡ Setup Instructions

### 1️⃣ Clone the Repository
Öffne ein Terminal oder die Eingabeaufforderung und führe aus:


git clone https://github.com/ReflexLabFlow/talk2sceneDiscordOBS.git
Standardmäßig landet das Repo hier:

makefile
Code kopieren
C:\Users\YourUsername\talk2sceneDiscordOBS\
Dann ins Projektverzeichnis wechseln:

bash
Code kopieren
cd talk2sceneDiscordOBS
2️⃣ Create a Discord Bot
Gehe zum Discord Developer Portal

Klicke Neue Anwendung → Name z. B. "OBS Voice Link"

Im Menü links: Bot → Bot hinzufügen

Kopiere den Token (wird in Schritt 4 eingefügt)

3️⃣ Set Required Bot Permissions
Scopes: bot

Bot-Berechtigungen:

Connect

Speak

View Channels

Read Messages/View Channels

Use Voice Activity

OAuth2-URL generieren und den Bot zu deinem Server einladen.

4️⃣ Edit Configuration
Öffne index.js und trage deine Daten ein:

js
Code kopieren
const token = "";      // Discord Bot Token
const guildId = "";    // Server-ID
const channelId = "";  // Voice-Channel-ID
const serverPass = ""; // OBS WebSocket-Passwort
5️⃣ OBS Setup (Deutsch)
Öffne OBS → Werkzeuge → Erweiterter Szenenwechsler

Installiere, falls nicht vorhanden, das Plugin Advanced Scene Switcher

Konfiguriere eine WebSocket-Anfrage für den Bot:

Gehe auf Add → WebSocket → Request

Name z. B. DiscordBot

Type: CallVendorRequest

Vendor Name: AdvancedSceneSwitcher

Request Type: AdvancedSceneSwitcherMessage

Request Data: { "message": "START:discordUsername" }

Dies sendet z. B. beim Starten des Sprechens eine Nachricht an den Szenenwechsler.

Stelle sicher, dass WebSocket-Server aktiviert ist:

Einstellungen → WebSocket-Server → Port 4455

Passwort setzen → in index.js eintragen (serverPass)

6️⃣ Install Dependencies & Run
bash
Code kopieren
npm install
node index.js
7️⃣ Update Later
bash
Code kopieren
git pull origin main
💡 Security Note
Nie den Bot-Token öffentlich teilen!

Er gewährt vollen Zugriff auf deinen Bot. Bei Leaks sofort zurücksetze
