const canvas = document.getElementById("art");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("reset");
const size = canvas.width;
const smallest = size / 128;
let circles = [];

const photo = new Image();
photo.src = "images/tulips.png";
let photoPixels;
photo.onload = function () {
  const helper = document.createElement("canvas");
  helper.width = size;
  helper.height = size;
  const helperCtx = helper.getContext("2d", { willReadFrequently: true });
  helperCtx.drawImage(photo, 0, 0, size, size);
  photoPixels = helperCtx.getImageData(0, 0, size, size).data;
  reset();
};

function colorAt(x, y) {
  const px = Math.max(0, Math.min(size - 1, Math.floor(x)));
  const py = Math.max(0, Math.min(size - 1, Math.floor(y)));
  const index = (py * size + px) * 4;
  return `rgb(${photoPixels[index]}, ${photoPixels[index + 1]}, ${photoPixels[index + 2]})`;
}

function draw() {
  ctx.clearRect(0, 0, size, size);
  for (const circle of circles) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = colorAt(circle.x, circle.y);
    ctx.fill();
  }
}

function reset() {
  if (!photoPixels) return;
  circles = [{ x: size / 2, y: size / 2, radius: size / 2 }];
  draw();
}

function splitCircle(x, y) {
  for (let i = circles.length - 1; i >= 0; i--) {
    const c = circles[i];
    const distance = Math.hypot(x - c.x, y - c.y);
    if (distance > c.radius || c.radius <= smallest) continue;

    circles.splice(i, 1);
    const r = c.radius / 2;
    circles.push(
      { x: c.x - r, y: c.y - r, radius: r },
      { x: c.x + r, y: c.y - r, radius: r },
      { x: c.x - r, y: c.y + r, radius: r },
      { x: c.x + r, y: c.y + r, radius: r },
    );
    draw();
    break;
  }
}

function interact(event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) * size) / rect.width;
  const y = ((event.clientY - rect.top) * size) / rect.height;
  splitCircle(x, y);
}

canvas.addEventListener("pointermove", interact);
canvas.addEventListener("pointerdown", interact);
resetButton.addEventListener("click", reset);
