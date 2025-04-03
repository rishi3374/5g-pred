# 5G Prediction Accuracy Analysis System

A web-based application that analyzes and predicts 5G network coverage and performance at specific locations. The system combines location data with 5G network parameters to provide detailed analysis of potential network performance.

## Features

- 🔍 Location Search: Search for any location worldwide
- 📍 Current Location Detection: Use your device's GPS
- 📊 Network Analysis: 5G frequency band prediction and coverage analysis
- 🌍 Environmental Analysis: Building density and terrain assessment
- 📱 Responsive Design: Works on all devices
- 🔒 User Authentication: Secure login and registration

## Tech Stack

- React with TypeScript
- Shadcn UI Components
- Tailwind CSS
- Vite
- OpenStreetMap Nominatim API
- Custom Authentication System

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/5g-prediction-accuracy.git
cd 5g-prediction-accuracy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## Project Structure

```
5g-prediction-accuracy/
├── src/
│   ├── components/
│   │   ├── LocationAnalysis.tsx
│   │   ├── CoverageMap.tsx
│   │   └── ui/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
├── public/
├── package.json
└── README.md
```

## Features in Detail

### Location Analysis
- Search for any location worldwide
- Get current location using GPS
- View detailed location information
- Analyze 5G coverage potential

### Network Analysis
- Frequency band prediction
- Coverage range estimation
- Expected speed calculation
- Prediction accuracy scoring

### Environmental Analysis
- Building density assessment
- Terrain type classification
- GPS accuracy measurement
- Signal propagation impact

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenStreetMap for location data
- Shadcn UI for component library
- React and TypeScript communities

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/5g-prediction-accuracy](https://github.com/yourusername/5g-prediction-accuracy)
