# 📱 WhatsApp Hook Clone

A full-stack WhatsApp-like web application built with **Node.js, MongoDB, and React (Vite + TailwindCSS)**.
This project processes **WhatsApp webhook payloads (messages & statuses)**, stores them in MongoDB, and provides a **WhatsApp Web–like UI** to view and send messages.

---

## ✨ Features

* 📩 **Message Processing**

  * Imports WhatsApp webhook payloads (`messages` & `statuses`) from JSON.
  * Stores messages and users in MongoDB.
  * Updates message status (`sent`, `delivered`, `read`) in real-time.

* 💬 **Frontend (React + Vite + Tailwind)**

  * Responsive **WhatsApp Web–style UI**.
  * Sidebar with chat list (sorted by latest message).
  * Chat panel with message bubbles & status ticks (✅ Sent, ✅✅ Delivered, ✅✅ Read).
  * Mobile-friendly: only one panel shown at a time.

* 🗄 **Backend (Node.js + Express + MongoDB)**

  * Message & user models.
  * Importer script to process sample payloads.
  * REST API for chats and messages.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite) + TailwindCSS
* **Backend:** Node.js + Express
* **Database:** MongoDB (Mongoose ORM)
* **Other Tools:** dotenv, pm2 (optional), Git

---

## 📂 Project Structure

```
├── client/                     # Frontend (React + Vite + Tailwind)
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/         # UI components (Sidebar, ChatHeader, MessageList, etc.)
│   │   ├── index.css
│   │   ├── lib/                # API helpers
│   │   └── main.jsx
│   └── vite.config.js
│
└── server/                     # Backend (Node.js + Express + MongoDB)
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── src/
        ├── config/             # Environment configs
        ├── db/                 # Database connection
        ├── index.js            # Server entry point
        ├── models/             # User & Message models
        ├── payLoadDir/         # Sample WhatsApp webhook payloads (JSON)
        ├── routes/             # REST API routes
        ├── sockets/            # Socket.IO for real-time updates
        └── utils/              # Utility functions (status mapping)
├── README.md              # Project documentation
```

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/whatsapp-hook.git
cd whatsapp-hook
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

* Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/whatsapp
MY_BUSINESS_NUMBER=918329446654
```

* Run importer script (to process payloads):

```bash
npm run import
```

* Start server:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

Open: **[http://localhost:5173](http://localhost:5173)**

---

## 📸 Screenshots

### 💻 Desktop View

<img width="1920" height="1027" alt="Screenshot (159)" src="https://github.com/user-attachments/assets/53d9b996-9afc-482f-8830-147fbcb1bab3" />

### 📱 Mobile View

<img width="463" height="831" alt="Screenshot 2025-08-19 184400" src="https://github.com/user-attachments/assets/10b059a0-7a2b-4b65-b3e1-f9e0d74c3f65" />

### 🔍 Chat Details

<img width="468" height="833" alt="Screenshot 2025-08-19 184429" src="https://github.com/user-attachments/assets/f13ca828-2bab-4614-b44e-66354f39e41f" />

---

## 🚀 Future Improvements

* 🔄 Real WhatsApp webhook integration.
* 🔔 Push notifications.
* 📁 File & media message support.
* 👥 Group chats.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to improve.

---

## 📜 License

MIT License © 2025

