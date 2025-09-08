# 🎵 Musical Chairs Game - Automatic & Fair

A modern, web-based musical chairs game that eliminates human bias by automatically stopping music at completely random intervals. Perfect for parties, events, or classroom activities!

## ✨ Features

- **🎯 100% Fair & Random**: Music stops at truly random intervals between 5-30 seconds
- **🎵 Custom Music Upload**: Use your own songs (MP3, WAV, M4A, OGG, etc.)
- **📱 Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **🎛️ Volume Control**: Adjustable volume slider for perfect audio levels
- **⚡ Real-time Visual Feedback**: Timer, progress bar, and status indicators
- **🖱️ Drag & Drop Support**: Simply drag audio files from your computer
- **⌨️ Keyboard Shortcuts**: Space to start, Escape to reset
- **🔄 Auto-Reset**: Automatically resets after each round for quick gameplay
- **🎨 Beautiful UI**: Modern glassmorphism design with smooth animations

## 🚀 Quick Start

1. **Clone or Download**: Get the project files
2. **Open**: Simply open `index.html` in any modern web browser
3. **Upload**: Choose your favorite song using the file picker
4. **Play**: Click "Start Music" and let the randomness begin!

No installation, no dependencies, no setup required!

## 🎮 How to Play

1. **Upload Your Song**: Click "Choose Audio File" or drag & drop your music file
2. **Adjust Volume**: Use the slider to set your preferred volume level
3. **Start the Game**: Click "Start Music" or press the Spacebar
4. **Listen & Move**: Dance around the chairs while the music plays
5. **Stop & Sit**: When the music stops, quickly find a chair!
6. **Repeat**: The game automatically resets for the next round

## 🛠️ Technical Details

### Project Structure
```
musical-chairs-game/
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # JavaScript game logic
└── README.md           # This file
```

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ **Android Chrome** (optimized)
- ✅ **Android Firefox** (optimized)
- ✅ **Samsung Internet** (optimized)
- ✅ iOS Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Android-Specific Optimizations
- 🤖 **Touch Targets**: 48dp minimum size for easy tapping
- 📱 **Zoom Prevention**: Disabled double-tap zoom for better UX
- 🔊 **Audio Context**: Automatic audio unlock on first interaction
- ⚡ **Performance**: Optimized for Android Chrome and Samsung Internet
- 🎯 **Touch Feedback**: Visual feedback for button presses
- 📐 **High DPI**: Crisp rendering on high-resolution Android screens

### Supported Audio Formats
- MP3 (most common)
- WAV (high quality)
- M4A (Apple format)
- OGG (open source)
- AAC
- FLAC (if browser supports)

## 🎲 Randomization Algorithm

The game uses a sophisticated randomization system:

- **Base Range**: 5-30 seconds (guaranteed maximum of 30 seconds)
- **Weighted Random**: Slight bias toward shorter durations for more exciting gameplay
- **True Randomness**: Uses `Math.random()` with power transformation
- **No Patterns**: Each round is completely independent

```javascript
// Simplified version of the algorithm
function generateRandomStopTime() {
    const min = 5000;  // 5 seconds
    const max = 30000; // 30 seconds
    let random = Math.random();
    random = Math.pow(random, 0.8); // Slight bias toward shorter times
    return min + (random * (max - min));
}
```

## 🎯 Why This Game?

Traditional musical chairs can be unfair because:
- 👤 **Human Bias**: The person controlling music might favor certain players
- ⏰ **Predictable Timing**: Patterns can emerge over multiple rounds
- 🎭 **Social Pressure**: Controller might stop music based on player positions

Our solution:
- 🤖 **Computer Controlled**: Completely eliminates human bias
- 🎲 **True Randomness**: No patterns, no predictability
- ⚖️ **Fair for Everyone**: Every player has an equal chance

## 🔧 Customization

### Easy Modifications

**Change Time Range** (in `script.js`):
```javascript
// In generateRandomStopTime() function
const min = 3000;  // 3 seconds minimum
const max = 45000; // 45 seconds maximum
```

**Adjust Auto-Reset Delay** (in `script.js`):
```javascript
// In stopGame() function
setTimeout(() => {
    if (this.gameState === 'stopped') {
        this.resetGame();
    }
}, 8000); // 8 seconds instead of 5
```

**Modify Colors** (in `style.css`):
```css
/* Change the main gradient */
body {
    background: linear-gradient(135deg, #your-color1, #your-color2);
}
```

## 📱 Mobile Usage

The game is fully optimized for mobile devices:
- Touch-friendly interface
- Responsive design
- Mobile file picker support
- Optimized for portrait and landscape modes

## 🎓 Educational Use

Perfect for:
- **Schools**: PE classes, break activities
- **Summer Camps**: Group games and activities  
- **Birthday Parties**: Fair gameplay for all ages
- **Team Building**: Corporate events and workshops
- **Family Gatherings**: Holiday parties and reunions

## 🐛 Troubleshooting

**Music won't play?**
- Ensure your browser allows audio playback
- Try a different audio file format (MP3 recommended)
- Check that your file size is under 50MB

**Timer seems off?**
- Keep the browser tab active during gameplay
- The game auto-corrects timing when tab regains focus

**File won't upload?**
- Make sure it's an audio file
- Check file size (must be under 50MB)
- Try a different file format

## 🤝 Contributing

Want to improve the game? Here's how:

1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contributions
- 🎵 Multiple song queue system
- 📊 Game statistics and scoring
- 🎨 Additional themes and color schemes
- 🔊 Sound effects for game events
- 🏆 Tournament mode with brackets
- 💾 Save settings to local storage
- 🌐 Multiplayer online version

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the classic musical chairs game
- Built with vanilla HTML, CSS, and JavaScript
- No external dependencies for maximum compatibility
- Designed with accessibility and mobile users in mind

## 📞 Support

Having issues? Here are some options:

- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Create a feature request issue
- 💬 **General Questions**: Start a discussion thread
- 📧 **Direct Contact**: Reach out through GitHub

---

**Made with ❤️ for fair and fun musical chairs gameplay!**

Enjoy your bias-free musical chairs game! 🎉