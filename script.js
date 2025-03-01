const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Параметры анимации
let phase = 0;
let hue = 0;

// Функция для генерации случайного паттерна
function drawPattern() {
  const width = canvas.width;
  const height = canvas.height;
  const segments = 20 + Math.floor(Math.random() * 30);
  const radius = Math.min(width, height) * 0.45;

  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = width / 2 + Math.cos(angle) * radius;
    const y = height / 2 + Math.sin(angle) * radius;

    const noise = Math.random() * 0.4;
    const offsetX = Math.cos(phase + angle) * radius * noise;
    const offsetY = Math.sin(phase + angle) * radius * noise;

    ctx.lineTo(x + offsetX, y + offsetY);
  }

  ctx.closePath();
  ctx.stroke();
}

// Основная функция анимации
function animate() {
  // Установка цвета линий и фона
  const lineColor = `hsl(${hue}, 100%, 70%)`;
  const bgColor = `hsl(${hue}, 0%, 10%)`;
  ctx.strokeStyle = lineColor;
  ctx.fillStyle = bgColor;
  ctx.lineWidth = 4;

  // Рисуем фон
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawPattern();

  // Изменение параметров
  phase += 0.03;
  hue += 0.5;

  requestAnimationFrame(animate);
}

// Запуск анимации при загрузке страницы
window.addEventListener("load", () => {
  // Обновляем размеры canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  requestAnimationFrame(animate);

  // Перерисовка при изменении размера окна
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
