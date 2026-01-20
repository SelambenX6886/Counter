// Hedef tarihi ayarla (örnek olarak 1 ay sonrası)
const targetDate = new Date('2026-06-20T10:00:00');
const tickSound = document.getElementById('tickSound');

// Ses seviyesini ayarla
tickSound.volume = 0.2; // 20% ses seviyesi

function playTickSound() {
    tickSound.currentTime = 0; // Sesi başa sar
    tickSound.play().catch(function(error) {
        console.log("Ses çalma hatası:", error);
    });
}

function updateCountdown() {
    const currentDate = new Date();
    const difference = targetDate - currentDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // DOM elementlerini güncelle
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Her saniye değişiminde ses çal
    playTickSound();

    // Sayaç tamamlandığında
    if (difference < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Sayacı başlat
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// Sayfa yüklendiğinde smooth fade-in animasyonu
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.countdown-container');
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        container.style.opacity = '1';
    }, 100);
}); 
