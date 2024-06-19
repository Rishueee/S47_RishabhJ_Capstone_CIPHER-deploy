# Cipher: Music for the Independent Soul

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
8. [Contact](#contact)

## Project Overview

Cipher is a music streaming platform designed for independent artists and their passionate fans.

**What can you do on Cipher?**

- **Artists:** Upload your music directly, without distributors. Keep full control and connect with your fans.
- **Fans:** Discover fresh sounds, support independent artists, and stay informed about the music industry (coming soon).

**Why choose Cipher?**

- **Direct Uploads:** Skip the distributor and keep creative control without paying a single rupee.
- **Artist-Fan Connection:** Build relationships with your biggest supporters.
- **Monetization (Future):** Earn from your music as the platform grows.

## Features

- User Authentication (Sign up, Login, Logout)
- Task Management (Create, Edit, Delete)
- Real-time Updates
- Responsive Design

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication & Realtime Database:** Firebase

## Setup and Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject
    ```

2. **Install dependencies:**
    - Backend:
      ```bash
      cd backend
      npm install
      ```
    - Frontend:
      ```bash
      cd frontend
      npm install
      ```

3. **Set up Firebase:**
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
    - Enable Authentication and Firestore Database
    - Add Firebase config to your project

4. **Environment variables:**
    - Create a `.env` file and add the following:
      ```env
      MONGO_URI=your_mongodb_connection_string
      FIREBASE_API_KEY=your_firebase_api_key
      FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
      FIREBASE_PROJECT_ID=your_firebase_project_id
      FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
      FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
      FIREBASE_APP_ID=your_firebase_app_id
      ```

5. **Start the development server:**
    - Backend:
      ```bash
      cd backend
      npm run dev
      ```
    - Frontend:
      ```bash
      cd frontend
      npm start
      ```

## Usage

### For Artists:
1. **Upload Music:** Use the upload feature to share your tracks directly with fans.
2. **Connect with Fans:** Engage with your audience through comments and messages.

### For Fans:
1. **Discover Music:** Browse and listen to tracks from independent artists.
2. **Support Artists:** Follow your favorite artists and stay updated with their latest releases.

## Contact

- **LinkedIn:** [Rishabh Jha](https://www.linkedin.com/in/rishabh-jhaa-)
- **GitHub:** [Rishueee](https://github.com/Rishueee?tab=repositories)

