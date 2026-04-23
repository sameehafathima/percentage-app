import confetti from 'canvas-confetti';

export const triggerBloomConfetti = () => {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#E0F2F1', '#FFFDE7', '#E3F2FD', '#F48FB1']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#E0F2F1', '#FFFDE7', '#E3F2FD', '#F48FB1']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};
