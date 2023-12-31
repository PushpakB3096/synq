# Synq - Real-time Communication Platform

Synq is a real-time communication platform that aims to provide a seamless experience for communities, friends, and teams to connect and interact. It offers a range of features to facilitate communication and collaboration.

![image](https://github.com/PushpakB3096/synq/assets/44138832/f67f30e2-9ab0-4d0e-a53c-dde9a5e1288b)
![image](https://github.com/PushpakB3096/synq/assets/44138832/55b258eb-f02f-4423-90e5-d85f32cc78fd)
![image](https://github.com/PushpakB3096/synq/assets/44138832/a2bc9e81-f295-45b7-8258-69ead8c0d2ad)
![image](https://github.com/PushpakB3096/synq/assets/44138832/5bb11678-d97a-4563-a28f-0fad7df4764a)
![image](https://github.com/PushpakB3096/synq/assets/44138832/79d31edf-52af-4a5a-9c75-a97851ea48f1)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

### Features

- Real-Time Messaging
    - Server creation and customization   
    - Create and join Text, Audio and Video channels
    - Send and receive real-time messages
    - Delete & Edit messages in real time for all users
    - Send attachments (images/PDFs) as messages using UploadThing
    - Send Emojis
- Voice and Video Calls
    - 1:1 conversation between members
    - 1:1 video calls between members
    - Voice and video call functionality
    - Screen sharing during calls
    - Mute and unmute options
- Community Management
    - Create and manage communities or groups
    - Member management (Kick, Role change Guest / Moderator)
    - Community customization (e.g., name, logo)
    - Unique invite link generation & full working invite system
- Search and Discovery
    - User search
    - Channel and community discovery (TBA)
- Intuitive User Experience
    - Fully responsive and mobile-first UI
    - Light / Dark mode

### Technologies Used
- `React` with Typescript
- `NextJS` (version 13) with App routing
- WebSocket for real-time communication using `Socket.io`
- Websocket fallback: Polling with API
- `TailwindCSS` as the CSS library
- `ShadcnUI` as the component library
- ORM using `Prisma`
- `MySQL` database using PlanetScale
- Authentication with `Clerk`

### Getting Started
#### Cloning the repository

```shell
git clone https://github.com/PushpakB3096/synq.git
```

#### Install packages

```shell
npm i
```

#### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

#### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma generate
npx prisma db push
```

#### Start the app

```shell
npm run dev
```

#### Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `lint`          | Runs eslint                              |
