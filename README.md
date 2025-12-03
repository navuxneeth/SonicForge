# 🎵 SonicForge - Retro Audio Editor

A completely local, browser-based audio editing application with a pixel-themed, 8-bit retro aesthetic. All audio processing happens on your device - no uploads, no servers, complete privacy!

## ✨ Features

### Audio Editing Capabilities
- **Trim Audio**: Cut your audio files to the exact duration you need
- **Combine Files**: Merge multiple audio files into one seamless track
- **Volume Adjustment**: Control audio levels from 0% to 200%
- **Reverse Audio**: Flip your audio backwards for creative effects
- **Waveform Visualization**: See your audio in real-time

### File Management
- **Multi-Format Support**: MP3, AAC, WAV, OGG, and more
- **Batch Upload**: Upload unlimited audio files at once
- **Single or Multiple Files**: Work with one file or many
- **Download Edited Files**: Save your work in WAV format
- **Batch Download**: Download all edited files with one click

### Design & Experience
- **8-Bit Retro Aesthetic**: Pixel-themed green-on-black terminal look
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
3. **Edit Your Audio**:
   - Use the waveform to visualize
   - Adjust trim start/end points
   - Change volume with the slider
   - Click REVERSE to flip the audio
   - Click APPLY TRIM to cut the audio
4. **Download**: Click DOWNLOAD to save your edited file

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
- **CSS3**: Custom retro styling with animations
- **HTML5**: Semantic markup

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

SonicForge embraces the retro computing aesthetic:
- **Green phosphor monitor** color scheme
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
- **Volume Boost**: Can go up to 200% for quiet audio
- **Combine Order**: Files are combined in the order they appear
- **Keyboard Shortcuts**: Space to play/pause (coming soon!)
- **Mobile Use**: Works on phones and tablets too!

## ⚡ Performance

- **On-Device Processing**: Uses your device's processing power
- **No File Size Limits**: Limited only by your device's RAM
- **Fast Processing**: Direct buffer manipulation
- **Efficient Rendering**: Optimized waveform drawing

## 🔧 Troubleshooting

**Audio won't play?**
- Check browser audio permissions
- Try a different file format
- Ensure volume is up

**Can't upload files?**
- Check file format is supported
- Try refreshing the page
- Ensure browser supports FileReader API

**Download not working?**
- Check browser download permissions
- Ensure sufficient disk space
- Try a different browser

---

Made with 💚 by the SonicForge team

**[ KEEP IT RETRO, KEEP IT LOCAL ]**