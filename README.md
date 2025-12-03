# 🎵 SonicForge - Retro Audio Editor

A completely local, browser-based audio editing application with a pixel-themed, 8-bit retro aesthetic. All audio processing happens on your device - no uploads, no servers, complete privacy!

## ✨ Features

### Audio Editing Capabilities
- **Trim Audio**: Cut your audio files to the exact duration you need with draggable handles
- **Split Audio**: Split audio at any cursor position into separate files
- **Combine Files**: Merge multiple audio files into one seamless track
- **Volume Adjustment**: Control audio levels from 0% to 200%
- **Reverse Audio**: Flip your audio backwards for creative effects
- **Fade In/Out**: Apply smooth fade effects to the beginning or end
- **Normalize**: Automatically balance audio levels to optimal volume
- **Waveform Visualization**: See your audio in real-time with interactive waveform
- **Seek/Scrub**: Click anywhere on the waveform to jump to that position
- **Time Cursor**: Visual indicator showing current playback position

### File Management
- **Multi-Format Support**: MP3, AAC, WAV, OGG, FLAC, and more
- **Batch Upload**: Upload unlimited audio files at once
- **Single or Multiple Files**: Work with one file or many
- **Download Edited Files**: Save your work in high-quality WAV format
- **Batch Download**: Download all edited files with one click

### Playback Features
- **Native Audio Player**: Built-in HTML5 audio player for quick preview
- **Web Audio Playback**: Professional playback controls with precise timing
- **Millisecond Precision**: Time display shows MM:SS.mmm format
- **Detailed File Info**: View sample rate, channels, duration, and more

### Design & Experience
- **Dual Themes**: Toggle between retro dark mode and modern light mode
- **Light Mode Default**: Opens in accessible light mode by default
- **8-Bit Retro Aesthetic**: Pixel-themed terminal look with scanline effects
- **VT323 Font**: Classic monospace retro font
- **Responsive Design**: Works on desktop and mobile
- **No Installation Required**: Just open in a browser
- **100% Privacy**: All processing on your device

## 🚀 Getting Started

### Option 1: Open Locally
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Start editing audio!

### Option 2: Deploy to GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select main branch as source
4. Visit your GitHub Pages URL

### Option 3: Use a Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then visit http://localhost:8000
```

## 📖 How to Use

### Basic Editing
1. **Upload Audio**: Click the upload area or drag files
2. **Select a File**: Click "EDIT" on any uploaded file
3. **Play/Preview**: Use the native audio player or playback controls
4. **Edit Your Audio**:
   - Click on the waveform to seek to any position
   - Drag the yellow trim handles to set start/end points
   - Adjust volume with the slider
   - Click REVERSE to flip the audio
   - Click APPLY TRIM to cut the audio
   - Apply FADE IN or FADE OUT effects
   - Use NORMALIZE to balance audio levels
   - Click SPLIT AT CURSOR to divide audio into parts
5. **Download**: Click DOWNLOAD to save your edited file

### Advanced Features
- **Precise Trimming**: Enter exact times in seconds with millisecond precision
- **Split Audio**: Click on waveform to set cursor, then click SPLIT AT CURSOR
- **Batch Processing**: Upload multiple files and use batch operations
- **Theme Toggle**: Switch between light and dark modes using TOGGLE THEME button

### Combining Files
1. Upload 2 or more audio files
2. Click "COMBINE ALL FILES" in the Batch Operations section
3. A new combined file will appear in your files list
4. Edit and download as needed

### Batch Operations
- **Combine All**: Merge all loaded files into one
- **Download All**: Download all files at once

## 🛠️ Technical Details

### Technologies Used
- **Web Audio API**: For all audio processing
- **Canvas API**: For waveform visualization
- **Vanilla JavaScript**: No frameworks, pure JS
- **CSS3**: Custom retro styling with animations and theming
- **HTML5**: Semantic markup with native audio player

### Browser Compatibility
Works in all modern browsers that support:
- Web Audio API
- Canvas API
- FileReader API
- ES6+ JavaScript

Recommended browsers:
- Chrome 89+
- Firefox 88+
- Safari 14+
- Edge 89+

### Audio Format Support
The application can handle any format your browser's Web Audio API supports:
- MP3 (most widely supported)
- WAV
- OGG
- AAC
- M4A
- FLAC (in some browsers)

**Note**: Output files are always saved as WAV for maximum compatibility and quality.

## 🎨 Design Philosophy

SonicForge embraces the retro computing aesthetic with modern usability:
- **Dual theme support** - Light mode for accessibility, dark mode for nostalgia
- **Green phosphor monitor** color scheme in dark mode
- **Scanline effects** for CRT nostalgia
- **VT323 monospace font** for that terminal feel
- **Pixel-perfect** borders and effects
- **Glowing text** animations

## 🔒 Privacy & Security

- **100% Local Processing**: No data ever leaves your device
- **No Server Required**: Pure client-side application
- **No Analytics**: We don't track anything
- **No Cookies**: No data storage beyond your session
- **Open Source**: Fully transparent code
- **No Security Vulnerabilities**: Regularly scanned with CodeQL

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 🎮 Tips & Tricks

- **Trim Precision**: Use the number inputs for exact millisecond control
- **Draggable Handles**: Click and drag the yellow trim markers on the waveform
- **Waveform Seek**: Click anywhere on the waveform to jump to that position
- **Volume Boost**: Can go up to 200% for quiet audio
- **Combine Order**: Files are combined in the order they appear
- **Theme Toggle**: Switch between light and dark modes anytime
- **Split Strategy**: Use split to create loops, remove sections, or divide tracks
- **Normalize First**: Apply normalization before other effects for best results
- **Mobile Use**: Works on phones and tablets too!

## ⚡ Performance

- **On-Device Processing**: Uses your device's processing power
- **No File Size Limits**: Limited only by your device's RAM
- **Fast Processing**: Direct buffer manipulation
- **Efficient Rendering**: Optimized waveform drawing
- **Real-time Preview**: Native audio player for instant playback

## 🔧 Troubleshooting

**Audio won't play?**
- Check browser audio permissions
- Try a different file format
- Ensure volume is up
- Use the native audio player for quick testing

**Can't upload files?**
- Check file format is supported
- Try refreshing the page
- Ensure browser supports FileReader API

**Download not working?**
- Check browser download permissions
- Ensure sufficient disk space
- Try a different browser

**Trim handles not moving?**
- Click and drag the yellow markers on the waveform
- Use the number inputs for precise control
- Ensure a file is loaded and selected

---

Made with 💚 by the SonicForge team

**[ KEEP IT RETRO, KEEP IT LOCAL ]**

🔗 [View on GitHub](https://github.com/navuxneeth/SonicForge)