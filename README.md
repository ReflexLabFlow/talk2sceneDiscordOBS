# OBS Discord Voice Link

> A lightweight Node.js bridge between Discord voice chat and OBS – automatically triggers scene actions in OBS when users start or stop speaking.

## 🔹 Description
**OBS Discord Voice Link** verbindet einen Discord-Voice-Channel mit OBS.  
Wenn jemand zu sprechen beginnt oder aufhört, werden Nachrichten an den **Advanced Scene Switcher** in OBS gesendet, sodass Szenen oder Overlays automatisch gewechselt werden.  
Ideal für Streamer, Podcasts oder Gruppen-Streams.

---

## 🛠️ Features
- 🎙️ Erkennt, wann Nutzer in Discord sprechen oder aufhören
- 🔌 Sendet Nachrichten an OBS via WebSocket
- ♻️ Automatische Reconnect-Funktion bei OBS-Verbindungsabbruch
- 💻 Einfache Einrichtung, keine tiefen Programmierkenntnisse nötig

---

## ⚡ Vorinstallation
Bevor du startest, installiere die folgenden Programme:

1. Git – für Repository-Klonen: https://git-scm.com/downloads
2. Node.js + npm – für das Ausführen des Bots: https://nodejs.org (LTS-Version empfohlen)
3. OBS Studio – mindestens Version 29+: https://obsproject.com/de

Optional: Python wird nur benötigt, falls OBS-Plugins Python-Skripte nutzen, für unseren Bot nicht zwingend erforderlich.

---

## ⚡ Setup Instructions

### 1️⃣ Clone the Repository
Öffne ein Terminal oder die Eingabeaufforderung und führe aus:

git clone https://github.com/ReflexLabFlow/talk2sceneDiscordOBS.git

Standardmäßig landet das Repo hier:

C:\Users\YourUsername\talk2sceneDiscordOBS\

Dann ins Projektverzeichnis wechseln:

cd talk2sceneDiscordOBS

---

### 2️⃣ Create a Discord Bot
1. Gehe zum Discord Developer Portal: https://discord.com/developers/applications
2. Klicke Neue Anwendung → Name z. B. "OBS Voice Link"
3. Im Menü links: Bot → Bot hinzufügen
4. Kopiere den Token (wird in Schritt 4 eingefügt)

---

### 3️⃣ Set Required Bot Permissions
- Scopes: bot
- Bot-Berechtigungen:
  - Connect
  - Speak
  - View Channels
  - Read Messages/View Channels
  - Use Voice Activity

OAuth2-URL generieren und den Bot zu deinem Server einladen.

---

### 4️⃣ Edit Configuration
Öffne index.js und trage deine Daten ein:

const token = "";      // Discord Bot Token

const guildId = "";    // Server-ID

const channelId = "";  // Voice-Channel-ID

const serverPass = ""; // OBS WebSocket Passwort

---

### 5️⃣ OBS Setup (Deutsch)
1. Öffne OBS → Werkzeuge → Erweiterter Szenenwechsler
2. Installiere, falls nicht vorhanden, das Plugin Advanced Scene Switcher
3. Konfiguriere eine WebSocket-Anfrage für den Bot:
   - Add → WebSocket → Request
   - Name z. B. DiscordBot
   - Type: CallVendorRequest
   - Vendor Name: AdvancedSceneSwitcher
   - Request Type: AdvancedSceneSwitcherMessage
   - Request Data: { "message": "START:discordUsername" }
   - Dies sendet z. B. beim Starten des Sprechens eine Nachricht an den Szenenwechsler.
4. Stelle sicher, dass WebSocket-Server aktiviert ist:
   - Einstellungen → WebSocket-Server → Port 4455
   - Passwort setzen → in index.js eintragen (serverPass)

---

### 6️⃣ Install Dependencies & Run

npm install
node index.js

---

### 7️⃣ Update Later

git pull origin main

---

## 💡 Security Note
- Nie den Bot-Token öffentlich teilen!
- Token gewährt vollen Zugriff auf deinen Bot. Bei Leaks sofort zurücksetzen.

---

## 💸 Donations
Wenn dir das Projekt hilft, unterstütze mich gerne: buymeacoffee.com/ReflexLabFlow

---

## 📄 License
MIT License – siehe LICENSE
