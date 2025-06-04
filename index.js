const mainButton = document.getElementById('main-button');
const finalMessage = document.querySelector('.final-message');
const wheelImg = document.querySelector('.wheel-img');

// Your date ideas
const dateIdeas = [
  "Movie Night", "Cooking Together", "Minecraft", "YouTube",
  "Virtual Shopping", "Card Games", "Wavelength",
  "Would You Rather", "Scribbl.io", "20 Questions"
];

let isSpinning = false;

mainButton.addEventListener('click', () => {
  if (isSpinning) return;

  isSpinning = true;
  finalMessage.textContent = '';
  finalMessage.style.display = 'none'; // Hide while spinning
  mainButton.disabled = true;

  // Spin math
  const segmentAngle = 360 / dateIdeas.length;
  const randomIndex = Math.floor(Math.random() * dateIdeas.length);
  const stopAngle = 360 * 5 + (randomIndex * segmentAngle) + (segmentAngle / 2);

  const startTime = performance.now();
  const duration = 3000;

  function spin(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const currentRotation = stopAngle * eased;

    wheelImg.style.transform = `rotate(${currentRotation}deg)`;

    if (progress < 1) {
        requestAnimationFrame(spin);
      } else {
        finalMessage.textContent = `🎉 ${dateIdeas[randomIndex]}! 🎉`;
        finalMessage.style.display = 'block'; // Show after spinning
        mainButton.disabled = false;
        isSpinning = false;
      }
  }

  requestAnimationFrame(spin);
});

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}