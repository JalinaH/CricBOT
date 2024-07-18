# CricBot

CricBot is a mobile application designed to control an automated cricket practice machine. The app is developed as part of a first-year hardware project and provides an interface for users to manage their practice sessions, track their performance, and view detailed statistics. The application is built using Expo, React Native, NativeWind (Tailwind CSS for React Native), and Firebase (including Firestore for database management).

## Features

- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Landing Page**: Welcome screen for users.
- **Home Page**: Displays navigation buttons for different ball types, leading to the session setup page. Shows machine connection status (connected/disconnected) with color indication (green/red).
- **Session Page**: Allows users to configure practice sessions, including ball type, ball speed, ball count, and waiting time. Shows machine connection status (connected/disconnected) with color indication (green/red).
- **Stats Page**: Visual representation of practice data stored in the database, displayed as graphs.
- **Profile Page**: Displays logged-in user information and general settings.

## Screenshots


<div style="text-align:center">
  <img src="https://github.com/JalinaH/CricBOT/blob/master/Screenshots/landing_page.png" alt="Landing Page" width="300"/>
  <p>Landing Page</p>
</div>

<div style="text-align:center">
  <img src="https://github.com/JalinaH/CricBOT/blob/master/Screenshots/home_page.png" alt="Home Page" width="300"/>
  <p>Home Page</p>
</div>

<div style="text-align:center">
  <img src="https://github.com/JalinaH/CricBOT/blob/master/Screenshots/session_page.png" alt="Session Page" width="300"/>
  <p>Session Page</p>
</div>

<div style="text-align:center">
  <img src="https://github.com/JalinaH/CricBOT/blob/master/Screenshots/profile_page.png" alt="Profile Page" width="300"/>
  <p>Profile Page</p>
</div>

## Technologies Used

- **Expo**: For building and developing the React Native application.
- **React Native**: Framework for building native apps using React.
- **NativeWind**: Tailwind CSS for styling React Native applications.
- **Firebase**: For user authentication and real-time database.
- **Firestore**: For storing and managing user practice data.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/JalinaH/CricBot.git
   cd CricBot
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up Firebase:**
  - Create a Firebase project in the Firebase Console.
  - Add an Android and iOS app to your Firebase project.
  - Download the `google-services.json` (for Android) and `GoogleService-Info.plist` (for iOS) files and place them in the appropriate directories.
  - Copy your Firebase configuration and add it to your project.

4. **Run the application:**
   ```sh
   npx expo start
   ```

## Usage
1. Authentication:
  - Users can register and log in using their email and password.
    
2. Home Page:
  - Quick navigation to different ball types for setting up a session.
  - Displays machine connection status with color indication.

3. Session Page:

  - Configure the practice session by selecting ball type, speed, count, and waiting time.
  - Displays machine connection status with color indication.
    
4. Stats Page:
  - View detailed graphs representing the practice data stored in Firestore.
    
5. Profile Page:
  - View and update user information and general settings.
    
## Firebase Firestore Structure
  - PlayerStats (Collection)
    - {userId} (Document)
      - balls (Collection)
        - {documentId} (Document)
          - date: Date of the practice session.
          - count: Number of balls played.
      - sessions: Number of practice sessions.
      - totalBalls: Total number of balls played.

## Contact 
For any inquiries, please [contact](mailto:jalinahirushan2002@gmail.com).
