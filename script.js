/**
 * Musical Chairs Game - Automatic & Fair
 * 
 * A web-based musical chairs game that eliminates human bias by 
 * automatically stopping music at random intervals between 5-30 seconds.
 * 
 * Features:
 * - File upload for custom music
 * - Random timing algorithm
 * - Volume control
 * - Visual feedback with timer and progress bar
 * - Drag & drop support
 * - Mobile responsive
 */

class MusicalChairsGame {
    constructor() {
        // Game state variables
        this.gameState = 'ready'; // 'ready', 'playing', 'stopped'
        this.startTime = 0;
        this.stopTime = 0;
        this.animationFrame = null;
        this.gameTimeout = null;
        this.audioElement = null;
        this.audioFile = null;
        
        // DOM elements
        this.timerElement = document.getElementById('timer');
        this.statusElement = document.getElementById('status');
        this.startBtn = document.getElementById('startBtn');
        this.progressBar = document.getElementById('progressBar');
        this.fileInput = document.getElementById('audioFile');
        this.songInfo = document.getElementById('songInfo');
        this.fileUpload = document.getElementById('fileUpload');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeText = document.getElementById('volumeText');
        
        // Initialize the game
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateStartButton();
        console.log('Musical Chairs Game initialized!');
    }
    
    setupEventListeners() {
        // File input change
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Drag and drop functionality
        this.fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.fileUpload.classList.add('dragover');
        });
        
        this.fileUpload.addEventListener('dragleave', () => {
            this.fileUpload.classList.remove('dragover');
        });
        
        this.fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            this.fileUpload.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('audio/')) {
                this.handleFile(files[0]);
            } else {
                this.showNotification('Please drop an audio file!', 'error');
            }
        });

        // Volume control
        this.volumeSlider.addEventListener('input', (e) => {
            const volume = Math.round(e.target.value * 100);
            this.volumeText.textContent = volume + '%';
            if (this.audioElement) {
                this.audioElement.volume = e.target.value;
            }
        });

        // Window focus handling for timing accuracy
        window.addEventListener('focus', () => {
            if (this.gameState === 'playing') {
                const currentTime = Date.now();
                if (currentTime >= this.stopTime) {
                    this.stopGame();
                } else {
                    this.updateTimer();
                }
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.gameState === 'ready' && this.audioFile) {
                e.preventDefault();
                this.startGame();
            } else if (e.code === 'Escape') {
                e.preventDefault();
                this.resetGame();
            }
        });
    }
    
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            this.handleFile(file);
        } else if (file) {
            this.showNotification('Please select an audio file!', 'error');
        }
    }
    
    handleFile(file) {
        // Validate file size (max 50MB)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            this.showNotification('File too large! Please choose a file under 50MB.', 'error');
            return;
        }
        
        this.audioFile = file;
        
        // Clean up previous audio
        if (this.audioElement) {
            this.audioElement.pause();
            URL.revokeObjectURL(this.audioElement.src);
            this.audioElement = null;
        }
        
        // Create new audio element
        this.audioElement = new Audio();
        this.audioElement.src = URL.createObjectURL(file);
        this.audioElement.volume = this.volumeSlider.value;
        this.audioElement.preload = 'auto';
        
        // Handle audio loading
        this.audioElement.addEventListener('canplaythrough', () => {
            console.log('Audio loaded successfully');
        });
        
        this.audioElement.addEventListener('error', (e) => {
            console.error('Audio loading error:', e);
            this.showNotification('Error loading audio file. Please try a different format.', 'error');
        });
        
        // Show file info
        const fileName = file.name.length > 40 ? file.name.substring(0, 40) + '...' : file.name;
        this.songInfo.textContent = `🎵 ${fileName}`;
        this.songInfo.style.display = 'block';
        
        this.updateStartButton();
        this.showNotification('Song loaded successfully!', 'success');
    }
    
    updateStartButton() {
        if (this.audioFile && this.gameState === 'ready') {
            this.startBtn.disabled = false;
            this.startBtn.textContent = '🎵 Start Music';
            this.startBtn.title = 'Press Space or click to start';
        } else if (!this.audioFile) {
            this.startBtn.disabled = true;
            this.startBtn.textContent = 'Upload a song first';
            this.startBtn.title = 'Please upload an audio file';
        }
    }
    
    generateRandomStopTime() {
        // Generate random stop time between 5-30 seconds
        // Using a weighted random to make shorter times slightly more likely
        const min = 5000; // 5 seconds
        const max = 30000; // 30 seconds
        
        // Generate random number with slight bias toward shorter times
        let random = Math.random();
        random = Math.pow(random, 0.8); // Slight bias toward shorter times
        
        return min + (random * (max - min));
    }
    
    startGame() {
        if (this.gameState !== 'ready' || !this.audioElement) {
            return;
        }
        
        console.log('Starting new game round...');
        
        const randomStopTime = this.generateRandomStopTime();
        
        this.gameState = 'playing';
        this.startTime = Date.now();
        this.stopTime = this.startTime + randomStopTime;
        
        console.log(`Music will stop in ${(randomStopTime / 1000).toFixed(1)} seconds`);
        
        // Start playing audio with Android compatibility
        this.audioElement.currentTime = 0;
        
        // Android requires user interaction before playing audio
        const playPromise = this.audioElement.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Audio started successfully');
            }).catch(e => {
                console.error('Error playing audio:', e);
                this.showNotification('Please tap the screen to enable audio, then try again.', 'error');
                this.resetGame();
                return;
            });
        }
        
        // Update UI
        this.statusElement.className = 'status playing';
        this.statusElement.innerHTML = '🎵 Music Playing! 🎵<br><span class="music-note">♪</span><span class="music-note">♫</span><span class="music-note">♪</span>';
        this.startBtn.textContent = 'Music Playing...';
        this.startBtn.disabled = true;
        this.startBtn.title = '';
        
        // Start the timer update
        this.updateTimer();
        
        // Set timeout to stop the music
        this.gameTimeout = setTimeout(() => {
            this.stopGame();
        }, randomStopTime);
    }
    
    updateTimer() {
        if (this.gameState !== 'playing') return;
        
        const currentTime = Date.now();
        const elapsed = (currentTime - this.startTime) / 1000;
        const totalDuration = (this.stopTime - this.startTime) / 1000;
        
        // Update timer display
        this.timerElement.textContent = elapsed.toFixed(1);
        
        // Update progress bar
        const progress = (elapsed / totalDuration) * 100;
        this.progressBar.style.width = Math.min(progress, 100) + '%';
        
        // Continue updating
        this.animationFrame = requestAnimationFrame(() => this.updateTimer());
    }
    
    stopGame() {
        if (this.gameState !== 'playing') return;
        
        console.log('Music stopped!');
        
        this.gameState = 'stopped';
        this.clearTimers();
        
        // Stop audio
        if (this.audioElement) {
            this.audioElement.pause();
        }
        
        const finalTime = ((Date.now() - this.startTime) / 1000).toFixed(1);
        
        // Update UI
        this.statusElement.className = 'status stopped';
        this.statusElement.innerHTML = '🛑 MUSIC STOPPED! 🛑<br><strong>Find a chair quickly!</strong>';
        this.updateStartButton();
        this.timerElement.textContent = finalTime;
        this.progressBar.style.width = '100%';
        
        // Auto reset after 5 seconds
        setTimeout(() => {
            if (this.gameState === 'stopped') {
                this.resetGame();
            }
        }, 5000);
    }
    
    resetGame() {
        console.log('Resetting game...');
        
        this.gameState = 'ready';
        this.clearTimers();
        
        // Stop audio
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
        
        // Reset UI
        this.timerElement.textContent = '00.0';
        this.statusElement.className = 'status ready';
        this.statusElement.textContent = 'Ready to Play!';
        this.updateStartButton();
        this.progressBar.style.width = '0%';
    }
    
    clearTimers() {
        if (this.gameTimeout) {
            clearTimeout(this.gameTimeout);
            this.gameTimeout = null;
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
    
    showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = '#4CAF50';
                break;
            case 'error':
                notification.style.background = '#f44336';
                break;
            default:
                notification.style.background = '#2196F3';
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
function startGame() {
    if (window.game) {
        window.game.startGame();
    }
}

function resetGame() {
    if (window.game) {
        window.game.resetGame();
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MusicalChairsGame();
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Clean up when page unloads
window.addEventListener('beforeunload', () => {
    if (window.game && window.game.audioElement) {
        URL.revokeObjectURL(window.game.audioElement.src);
    }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('✅ Service Worker registered'))
    .catch(err => console.log('❌ Service Worker registration failed:', err));
}
