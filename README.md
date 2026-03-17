# Firebase Storage App 🗂️

A **Digital Document Manager** built with React.js, Redux Toolkit, and Firebase Realtime Database. Users can upload, organize, preview, update, and delete digital documents in real-time.

## 🌐 Live Demo
👉 https://firebase-storage-fawn.vercel.app/

## 🚀 Live Features
- 📤 Upload documents (PDF, Images, Certificates, Reports, Resumes)
- 👁️ View all files in a clean card layout
- ✏️ Edit file name, category, and description
- 🗑️ Delete files instantly
- 🔍 Search and filter by name, type, and category
- ⚡ Real-time UI sync using Firebase `onValue` listener

## 🛠️ Tech Stack
- **Frontend** — React.js + Vite
- **State Management** — Redux Toolkit + Thunk
- **Database** — Firebase Realtime Database
- **UI** — Material UI (MUI)

## 📂 Folder Structure
```
src/
├── app/store.js
├── features/fileSlice.js
├── components/
│   ├── UploadFile.jsx
│   ├── FileList.jsx
│   ├── FileCard.jsx
│   └── SearchFilter.jsx
├── firebase/firebaseConfig.js
└── pages/Dashboard.jsx
```

## ⚙️ Setup & Installation
```bash
git clone https://github.com/devanshimarvania/Firebase-storage.git
cd Firebase-storage
npm install
npm run dev
```

## 🔥 Redux Modules
- `uploadFile` — converts file to Base64 and saves to Firebase
- `deleteFile` — removes file from Firebase
- `updateFileMetadata` — updates name, category, description
- `setFiles` — real-time listener syncs UI instantly

## 📌 Use Case
Colleges, offices, and organizations can use this to manage digital files centrally — students upload certificates, faculty upload reports, admin downloads and verifies documents.

---


<img width="1910" height="747" alt="Screenshot 2026-03-17 121904" src="https://github.com/user-attachments/assets/0c403002-ad60-40ff-8afc-ff60df5e959e" />
<img width="1913" height="696" alt="Screenshot 2026-03-17 122015" src="https://github.com/user-attachments/assets/990fa05d-e51f-4a28-9577-973957dbbba5" />
<img width="1914" height="846" alt="Screenshot 2026-03-17 122026" src="https://github.com/user-attachments/assets/e146ccda-4113-485e-be53-af0165381ce8" />
<img width="1913" height="879" alt="Screenshot 2026-03-17 122113" src="https://github.com/user-attachments/assets/e4ffcb1e-576d-4961-8189-be8cbbfe8a6d" />
<img width="1907" height="792" alt="Screenshot 2026-03-17 122128" src="https://github.com/user-attachments/assets/045a3e0c-e5c3-45d7-8515-348362e41877" />
<img width="1900" height="815" alt="Screenshot 2026-03-17 122156" src="https://github.com/user-attachments/assets/caba60b9-fdfa-4b82-b287-0962b2ed99c2" />
<img width="1903" height="820" alt="Screenshot 2026-03-17 122212" src="https://github.com/user-attachments/assets/42a002bd-e10b-41d1-bd5f-60dc983c1b6c" />
<img width="1909" height="846" alt="Screenshot 2026-03-17 122229" src="https://github.com/user-attachments/assets/78718c76-2595-437e-bfd6-48e8b180498a" />
<img width="1909" height="751" alt="Screenshot 2026-03-17 122317" src="https://github.com/user-attachments/assets/1ebe5d09-af47-4a10-92db-b13456a0cf4c" />
<img width="1909" height="1000" alt="Screenshot 2026-03-17 122429" src="https://github.com/user-attachments/assets/4aa3bd00-c8f0-45b0-924c-10d522014b3f" />
