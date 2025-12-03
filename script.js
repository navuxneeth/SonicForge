// Audio Editor State
const state = {
    audioFiles: [],
    currentFile: null,
    audioContext: null,
    audioBuffer: null,
    sourceNode: null,
    gainNode: null,
    isPlaying: false,
    startTime: 0,
    pauseTime: 0,
    trimStart: 0,
    trimEnd: 0,
    originalBuffer: null
};

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Initialize Web Audio API
    state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // File input
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
    
    // Playback controls
    document.getElementById('playBtn').addEventListener('click', playAudio);
    document.getElementById('pauseBtn').addEventListener('click', pauseAudio);
    document.getElementById('stopBtn').addEventListener('click', stopAudio);
    
    // Edit controls
    document.getElementById('volumeSlider').addEventListener('input', updateVolume);
    document.getElementById('trimStartInput').addEventListener('input', updateTrimStart);
    document.getElementById('trimEndInput').addEventListener('input', updateTrimEnd);
    
    // Action buttons
    document.getElementById('reverseBtn').addEventListener('click', reverseAudio);
    document.getElementById('applyTrimBtn').addEventListener('click', applyTrim);
    document.getElementById('downloadBtn').addEventListener('click', downloadAudio);
    
    // Batch operations
    document.getElementById('combineBtn').addEventListener('click', combineAudioFiles);
    document.getElementById('batchDownloadBtn').addEventListener('click', batchDownload);
}

// File Handling
async function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    
    for (const file of files) {
        const audioData = {
            file: file,
            name: file.name,
            duration: 0,
            buffer: null
        };
        
        // Load audio buffer
        try {
            const arrayBuffer = await file.arrayBuffer();
            audioData.buffer = await state.audioContext.decodeAudioData(arrayBuffer);
            audioData.duration = audioData.buffer.duration;
            state.audioFiles.push(audioData);
        } catch (error) {
            console.error('Error loading audio file:', error);
            alert(`Error loading ${file.name}: ${error.message}`);
        }
    }
    
    updateFilesList();
    
    // Show sections
    if (state.audioFiles.length > 0) {
        document.getElementById('filesSection').style.display = 'block';
        if (state.audioFiles.length > 1) {
            document.getElementById('batchSection').style.display = 'block';
        }
    }
}

function updateFilesList() {
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = '';
    
    state.audioFiles.forEach((audioData, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        if (state.currentFile === audioData) {
            fileItem.classList.add('selected');
        }
        
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-name">🎵 ${audioData.name}</span>
                <span class="file-duration">[${formatTime(audioData.duration)}]</span>
            </div>
            <div class="file-actions">
                <button class="btn btn-small" onclick="selectFile(${index})">EDIT</button>
                <button class="btn btn-small btn-danger" onclick="removeFile(${index})">DELETE</button>
            </div>
        `;
        
        filesList.appendChild(fileItem);
    });
}

function selectFile(index) {
    stopAudio();
    state.currentFile = state.audioFiles[index];
    state.audioBuffer = state.currentFile.buffer;
    state.originalBuffer = state.audioBuffer;
    
    // Reset trim values
    state.trimStart = 0;
    state.trimEnd = state.audioBuffer.duration;
    
    // Update UI
    document.getElementById('trimStartInput').value = 0;
    document.getElementById('trimStartInput').max = state.audioBuffer.duration;
    document.getElementById('trimEndInput').value = state.audioBuffer.duration.toFixed(2);
    document.getElementById('trimEndInput').max = state.audioBuffer.duration;
    document.getElementById('totalTime').textContent = formatTime(state.audioBuffer.duration);
    
    document.getElementById('selectedFileInfo').textContent = `📝 EDITING: ${state.currentFile.name}`;
    document.getElementById('editorSection').style.display = 'block';
    
    updateFilesList();
    drawWaveform();
}

function removeFile(index) {
    if (state.currentFile === state.audioFiles[index]) {
        stopAudio();
        state.currentFile = null;
        state.audioBuffer = null;
        document.getElementById('editorSection').style.display = 'none';
    }
    
    state.audioFiles.splice(index, 1);
    updateFilesList();
    
    if (state.audioFiles.length === 0) {
        document.getElementById('filesSection').style.display = 'none';
        document.getElementById('batchSection').style.display = 'none';
    } else if (state.audioFiles.length === 1) {
        document.getElementById('batchSection').style.display = 'none';
    }
}

// Waveform Visualization
function drawWaveform() {
    if (!state.audioBuffer) return;
    
    const canvas = document.getElementById('waveformCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const data = state.audioBuffer.getChannelData(0);
    const step = Math.ceil(data.length / canvas.width);
    const amp = canvas.height / 2;
    
    ctx.fillStyle = 'rgba(0, 10, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    for (let i = 0; i < canvas.width; i++) {
        let min = 1.0;
        let max = -1.0;
        
        for (let j = 0; j < step; j++) {
            const datum = data[(i * step) + j];
            if (datum < min) min = datum;
            if (datum > max) max = datum;
        }
        
        ctx.moveTo(i, (1 + min) * amp);
        ctx.lineTo(i, (1 + max) * amp);
    }
    
    ctx.stroke();
    
    // Draw trim markers
    const trimStartX = (state.trimStart / state.audioBuffer.duration) * canvas.width;
    const trimEndX = (state.trimEnd / state.audioBuffer.duration) * canvas.width;
    
    // Update trim handles
    document.getElementById('trimStart').style.left = trimStartX + 'px';
    document.getElementById('trimEnd').style.left = trimEndX + 'px';
}

// Playback Controls
async function playAudio() {
    if (!state.audioBuffer) return;
    
    if (state.isPlaying) {
        stopAudio();
    }
    
    // Resume AudioContext if needed (required by some browsers)
    if (state.audioContext.state === 'suspended') {
        await state.audioContext.resume();
    }
    
    state.sourceNode = state.audioContext.createBufferSource();
    state.sourceNode.buffer = state.audioBuffer;
    
    state.gainNode = state.audioContext.createGain();
    const volume = document.getElementById('volumeSlider').value / 100;
    state.gainNode.gain.value = volume;
    
    state.sourceNode.connect(state.gainNode);
    state.gainNode.connect(state.audioContext.destination);
    
    const offset = state.pauseTime || state.trimStart;
    const duration = state.trimEnd - offset;
    
    state.sourceNode.start(0, offset, duration);
    state.startTime = state.audioContext.currentTime - (state.pauseTime || 0);
    state.isPlaying = true;
    
    state.sourceNode.onended = () => {
        if (state.isPlaying) {
            stopAudio();
        }
    };
    
    updateTimeDisplay();
}

function pauseAudio() {
    if (!state.isPlaying) return;
    
    state.pauseTime = state.audioContext.currentTime - state.startTime;
    stopAudio();
}

function stopAudio() {
    if (state.sourceNode) {
        try {
            state.sourceNode.stop();
        } catch (e) {
            // Already stopped
        }
        state.sourceNode = null;
    }
    
    state.isPlaying = false;
    state.pauseTime = 0;
    updateTimeDisplay();
}

function updateTimeDisplay() {
    if (state.isPlaying) {
        const currentTime = state.audioContext.currentTime - state.startTime + state.trimStart;
        const displayTime = Math.min(currentTime, state.trimEnd);
        document.getElementById('currentTime').textContent = formatTime(displayTime);
        requestAnimationFrame(updateTimeDisplay);
    } else {
        const displayTime = state.pauseTime + state.trimStart;
        document.getElementById('currentTime').textContent = formatTime(displayTime);
    }
}

// Edit Controls
function updateVolume(event) {
    const value = event.target.value;
    document.getElementById('volumeValue').textContent = value + '%';
    
    if (state.gainNode) {
        state.gainNode.gain.value = value / 100;
    }
}

function updateTrimStart(event) {
    const value = parseFloat(event.target.value);
    state.trimStart = Math.max(0, Math.min(value, state.trimEnd - 0.1));
    event.target.value = state.trimStart.toFixed(2);
    drawWaveform();
}

function updateTrimEnd(event) {
    const value = parseFloat(event.target.value);
    state.trimEnd = Math.min(state.audioBuffer.duration, Math.max(value, state.trimStart + 0.1));
    event.target.value = state.trimEnd.toFixed(2);
    drawWaveform();
}

// Audio Processing
async function reverseAudio() {
    if (!state.audioBuffer) return;
    
    stopAudio();
    
    const reversedBuffer = state.audioContext.createBuffer(
        state.audioBuffer.numberOfChannels,
        state.audioBuffer.length,
        state.audioBuffer.sampleRate
    );
    
    for (let channel = 0; channel < state.audioBuffer.numberOfChannels; channel++) {
        const channelData = state.audioBuffer.getChannelData(channel);
        const reversedData = reversedBuffer.getChannelData(channel);
        
        for (let i = 0; i < channelData.length; i++) {
            reversedData[i] = channelData[channelData.length - 1 - i];
        }
    }
    
    state.audioBuffer = reversedBuffer;
    state.currentFile.buffer = reversedBuffer;
    state.trimEnd = state.audioBuffer.duration;
    document.getElementById('trimEndInput').value = state.trimEnd.toFixed(2);
    document.getElementById('totalTime').textContent = formatTime(state.audioBuffer.duration);
    
    drawWaveform();
    alert('✓ AUDIO REVERSED');
}

async function applyTrim() {
    if (!state.audioBuffer) return;
    
    stopAudio();
    
    const startSample = Math.floor(state.trimStart * state.audioBuffer.sampleRate);
    const endSample = Math.floor(state.trimEnd * state.audioBuffer.sampleRate);
    const newLength = endSample - startSample;
    
    const trimmedBuffer = state.audioContext.createBuffer(
        state.audioBuffer.numberOfChannels,
        newLength,
        state.audioBuffer.sampleRate
    );
    
    for (let channel = 0; channel < state.audioBuffer.numberOfChannels; channel++) {
        const channelData = state.audioBuffer.getChannelData(channel);
        const trimmedData = trimmedBuffer.getChannelData(channel);
        
        for (let i = 0; i < newLength; i++) {
            trimmedData[i] = channelData[startSample + i];
        }
    }
    
    state.audioBuffer = trimmedBuffer;
    state.currentFile.buffer = trimmedBuffer;
    state.trimStart = 0;
    state.trimEnd = trimmedBuffer.duration;
    
    document.getElementById('trimStartInput').value = 0;
    document.getElementById('trimStartInput').max = trimmedBuffer.duration;
    document.getElementById('trimEndInput').value = trimmedBuffer.duration.toFixed(2);
    document.getElementById('trimEndInput').max = trimmedBuffer.duration;
    document.getElementById('totalTime').textContent = formatTime(trimmedBuffer.duration);
    
    drawWaveform();
    alert('✓ TRIM APPLIED');
}

async function combineAudioFiles() {
    if (state.audioFiles.length < 2) return;
    
    stopAudio();
    
    // Validate sample rates match
    const sampleRate = state.audioFiles[0].buffer.sampleRate;
    const differentSampleRate = state.audioFiles.find(
        audioData => audioData.buffer.sampleRate !== sampleRate
    );
    
    if (differentSampleRate) {
        alert(`❌ ERROR: Cannot combine files with different sample rates.\n` +
              `File "${differentSampleRate.name}" has ${differentSampleRate.buffer.sampleRate}Hz ` +
              `while others have ${sampleRate}Hz.`);
        return;
    }
    
    // Calculate total length
    let totalLength = 0;
    let maxChannels = 1;
    
    for (const audioData of state.audioFiles) {
        totalLength += audioData.buffer.length;
        maxChannels = Math.max(maxChannels, audioData.buffer.numberOfChannels);
    }
    
    const combinedBuffer = state.audioContext.createBuffer(
        maxChannels,
        totalLength,
        sampleRate
    );
    
    let offset = 0;
    for (const audioData of state.audioFiles) {
        for (let channel = 0; channel < maxChannels; channel++) {
            const sourceData = channel < audioData.buffer.numberOfChannels 
                ? audioData.buffer.getChannelData(channel)
                : audioData.buffer.getChannelData(0);
            const destData = combinedBuffer.getChannelData(channel);
            
            for (let i = 0; i < audioData.buffer.length; i++) {
                destData[offset + i] = sourceData[i];
            }
        }
        offset += audioData.buffer.length;
    }
    
    // Create new combined file
    const combinedFile = {
        file: null,
        name: 'COMBINED_AUDIO.wav',
        duration: combinedBuffer.duration,
        buffer: combinedBuffer
    };
    
    state.audioFiles.push(combinedFile);
    updateFilesList();
    selectFile(state.audioFiles.length - 1);
    
    alert('✓ FILES COMBINED');
}

// Download Functions
async function downloadAudio() {
    if (!state.audioBuffer) return;
    
    const volume = document.getElementById('volumeSlider').value / 100;
    
    // Apply volume to buffer
    const adjustedBuffer = state.audioContext.createBuffer(
        state.audioBuffer.numberOfChannels,
        state.audioBuffer.length,
        state.audioBuffer.sampleRate
    );
    
    for (let channel = 0; channel < state.audioBuffer.numberOfChannels; channel++) {
        const sourceData = state.audioBuffer.getChannelData(channel);
        const destData = adjustedBuffer.getChannelData(channel);
        
        for (let i = 0; i < sourceData.length; i++) {
            destData[i] = sourceData[i] * volume;
        }
    }
    
    const wav = audioBufferToWav(adjustedBuffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.currentFile.name.replace(/\.[^/.]+$/, '') + '_edited.wav';
    a.click();
    
    URL.revokeObjectURL(url);
    alert('✓ DOWNLOAD STARTED');
}

async function batchDownload() {
    for (const audioData of state.audioFiles) {
        const wav = audioBufferToWav(audioData.buffer);
        const blob = new Blob([wav], { type: 'audio/wav' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = audioData.name.replace(/\.[^/.]+$/, '') + '_edited.wav';
        a.click();
        
        URL.revokeObjectURL(url);
        
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    alert('✓ BATCH DOWNLOAD STARTED');
}

// Utility Functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function audioBufferToWav(buffer) {
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numberOfChannels * bytesPerSample;
    
    // Pre-allocate typed array for better performance
    const numSamples = buffer.length * numberOfChannels;
    const int16Data = new Int16Array(numSamples);
    
    // Convert samples more efficiently
    let dataIndex = 0;
    for (let i = 0; i < buffer.length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
            const sample = buffer.getChannelData(channel)[i];
            const clampedSample = Math.max(-1, Math.min(1, sample));
            int16Data[dataIndex++] = clampedSample < 0 
                ? clampedSample * 0x8000 
                : clampedSample * 0x7FFF;
        }
    }
    
    const dataLength = int16Data.length * bytesPerSample;
    const buffer_size = 44 + dataLength;
    const arrayBuffer = new ArrayBuffer(buffer_size);
    const view = new DataView(arrayBuffer);
    
    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(view, 8, 'WAVE');
    
    // FMT sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // SubChunk1Size
    view.setUint16(20, format, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    
    // Data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);
    
    // Write the PCM samples using typed array
    const int16View = new Int16Array(arrayBuffer, 44);
    int16View.set(int16Data);
    
    return arrayBuffer;
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

// Make functions global for onclick handlers
window.selectFile = selectFile;
window.removeFile = removeFile;
