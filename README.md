# NEiX's Music Collection 🎵 + Music Player 🎧

Welcome to NEiX's music collection project! This project is built using Next.js with TypeScript, featuring a collection of remixed songs along with a built-in music player.

## Features

- **Remixed Music Collection:** Browse through a curated collection of remixed songs, listing in SQLite3 + Express.js.
- **Music Player:** Enjoy seamless playback of your favorite remixes with the built-in music player.
- **Next.js:** Utilizes the power of Next.js for server-side rendering and optimized performance.
- **Responsive Design:** The application is designed to be fully responsive, ensuring a great experience across all devices.

## Project Structure

```
📁 public\
│   ├── 🖼️ images\
│   │   └── seo.png
│   └── 🌟 favicon.ico
│
📁 src\
│   ├── 📁 assets\
│   │   ├── 📁 data\
│   │   │   ├── color.ts
│   │   │   ├── nav.ts
│   │   │   ├── packageversion.ts
│   │   │   └── styled.ts
│   │   └── 📁 fonts\
│   │       ├── 🖋️ Geist\
│   │       │   ├── Geist-Black.woff2
│   │       │   ├── Geist-Bold.woff2
│   │       │   ├── Geist-Light.woff2
│   │       │   ├── Geist-Medium.woff2
│   │       │   ├── Geist-Regular.woff2
│   │       │   ├── Geist-SemiBold.woff2
│   │       │   ├── Geist-Thin.woff2
│   │       │   ├── Geist-UltraBlack.woff2
│   │       │   └── Geist-UltraLight.woff2
│   │       ├── 📜 LineSeedSansTH\
│   │       │   ├── LINESeedSansTH_W_Bd.woff
│   │       │   ├── LINESeedSansTH_W_He.woff
│   │       │   ├── LINESeedSansTH_W_Rg.woff
│   │       │   ├── LINESeedSansTH_W_Th.woff
│   │       │   └── LINESeedSansTH_W_XBd.woff
│   │       └── index.ts
│   ├── 📁 components\
│   │   ├── 🧭 Nav\
│   │   │   ├── Header.tsx
│   │   │   ├── Nav.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   ├── 🎨 icons\
│   │   │   ├── UpxLogo.tsx
│   │   │   ├── backbutton.tsx
│   │   │   ├── bugicon.tsx
│   │   │   ├── discord.tsx
│   │   │   ├── donateicon.tsx
│   │   │   ├── downloadbtn.tsx
│   │   │   ├── ghicon.tsx
│   │   │   ├── homeicon.tsx
│   │   │   ├── muteicon.tsx
│   │   │   ├── pauseicon.tsx
│   │   │   ├── playicon.tsx
│   │   │   ├── playsolid.tsx
│   │   │   ├── repeaticon.tsx
│   │   │   ├── repeatoneicon.tsx
│   │   │   ├── searchicon.tsx
│   │   │   ├── shareicon.tsx
│   │   │   ├── shuffleicon.tsx
│   │   │   ├── skipleft.tsx
│   │   │   ├── skipright.tsx
│   │   │   ├── star.tsx
│   │   │   ├── starsolid.tsx
│   │   │   ├── volumeicon.tsx
│   │   │   └── waveformicon.tsx
│   │   ├── 🎵 AudioPlayer.tsx
│   │   ├── 📁 CardFile.tsx
│   │   ├── 🔄 DownloadStatus.tsx
│   │   ├── ❗ ErrorDisplay.tsx
│   │   ├── 🔄 LoadingScreen.tsx
│   │   ├── 📢 Notification.tsx
│   │   └── 📱 PlayerScreen.tsx
│   ├── 📚 libs\
│   │   ├── AudioContext.tsx
│   │   ├── DownloadContext.tsx
│   │   └── ErrorContext.tsx
│   ├── 📄 pages\
│   │   ├── 404.tsx
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── 🎨 styles\
│   │   └── globals.scss
│   └── 🛠️ utils\
│       ├── bytetosize.ts
│       └── timeformat.ts
│
🗝️ .env.example
🙈 .gitignore
📝 README.md
next-env.d.ts
next.config.mjs
out.txt
📦 package.json
pnpm-lock.yaml
postcss.config.js
tailwind.config.ts
tsconfig.json
```