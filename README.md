# UMass Lowell AI & ML Club Portfolio Website

Welcome to the digital portfolio for the **UMass Lowell Artificial Intelligence & Machine Learning Club**. This website serves as the central hub for club information, projects, events, and resources. 

## 🚀 Features
- **Dynamic Content Loading**: HTML partials are modularly loaded via JavaScript fetch API for easier management.
- **Scroll Animations**: Smooth reveal animations as you scroll down the page using the Intersection Observer API.
- **Interactive UI Components**: Includes a custom typing effect, dynamic scrolling navbar, mobile hamburger menu, and scroll-spy navigation.
- **Form Handling**: A mock-up join form with frontend validation and customized success messaging.
- **Fully Responsive**: Designed to look great on desktop, tablet, and mobile devices.

## 💻 Tech Stack
- **HTML5 & CSS3**: Custom stylized components and layout without heavy reliance on CSS frameworks.
- **Vanilla JavaScript (ES6+)**: Handles all frontend logic including partial injection and interactions.
- **Vite**: Blazing fast frontend build tool and development server.

## 📂 Project Structure
```text
📦 UML-AI-ML-Club
├── 📁 public           # Static public assets (favicon, etc.)
├── 📁 src              
│   ├── 📁 partials     # Reusable HTML snippets (navbar, footer, sections)
│   ├── 📁 sections     # CSS files specific to each section component
│   ├── 📄 main.js      # App logic and initializations 
│   └── 📄 style.css    # Global CSS variables and core styles
├── 📄 index.html       # Main entry point holding the page layout structure
├── 📄 package.json     # Project dependencies and npm scripts
└── 📄 vite.config.js   # Vite server configuration
```

## 🛠️ Getting Started

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed, and then follow these steps:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd UML-AI-ML-Club
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## 🤝 Contributing
Feel free to fork this project, make adjustments, and submit a pull request if you'd like to contribute new features, fix bugs, or improve the styling.
