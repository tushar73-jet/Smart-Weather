# SmartWeather App

A powerful and elegant weather application built with React Native and Expo. SmartWeather provides real-time weather updates, accurate forecasts, and intelligent outfit suggestions based on current climate conditions.

## 🚀 Features

- **Real-time Weather**: Current temperature, humidity, wind speed, and pressure for any city.
- **GPS Integration**: Automatically detects your location to provide local weather updates.
- **5-Day Forecast**: Visualizes upcoming weather trends with a horizontal scrollable forecast.
- **Outfit Suggestions**: Smart recommendations on what to wear based on temperature and weather (e.g., Rain, Storm, Cold).
- **Stunning Animations**: High-quality Lottie animations that dynamically change with the weather.
- **Offline Mode**: Caches the latest weather data using `AsyncStorage` for access without internet.
- **Responsive Design**: Optimized for both mobile devices and web browsers.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)
- **Networking**: [Axios](https://axios-http.com/)
- **Storage**: [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
- **Animations**: [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)
- **Icons**: [@expo/vector-icons](https://icons.expo.fyi/)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/SmartWeather.git
   cd SmartWeather
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up API Key**:
   - Obtain an API key from [OpenWeatherMap](https://home.openweathermap.org/api_keys).
   - In `App.js`, replace the `API_KEY` constant with your key:
     ```javascript
     const API_KEY = 'YOUR_API_KEY_HERE';
     ```

4. **Run the app**:
   - For Android: `npx expo start --android`
   - For iOS: `npx expo start --ios`
   - For Web: `npx expo start --web`

## 📁 Project Structure

```text
Smart-Weather-1/
├── assets/             # Images and Lottie animations
├── src/                # Functional components
│   ├── WeatherCard.js      # Main weather display component
│   ├── ForecastList.js     # Horizontal forecast list
│   ├── OutfitSuggestion.js # Clothing recommendation logic
│   └── WeatherAnimation.js # Lottie animation controller
├── App.js              # Root application logic and state management
└── package.json        # Project dependencies and scripts
```

## 📝 License

This project is licensed under the MIT License.
