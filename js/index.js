window.addEventListener("load", () => {
  const container = document.querySelector(".BAer-container");
  const numBAer = 100;
  const BAerElements = [];

  // Lấy kích thước container khi đã load xong
  const containerRect = container.getBoundingClientRect();
  const width = containerRect.width;
  const height = containerRect.height;

  for (let i = 0; i < numBAer; i++) {
    const span = document.createElement("span");
    span.classList.add("BAer");
    span.innerText = "BAer";

    // Lấy vị trí ngẫu nhiên trong kích thước container
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 24 + 12;

    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.fontSize = `${size}px`;

    container.appendChild(span);

    BAerElements.push({
      el: span,
      x: x,
      y: y,
      offsetX: 0,
      offsetY: 0,
      repelX: 0,
      repelY: 0,
    });
  }

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function floatEffect() {
    const time = Date.now() * 0.001;

    BAerElements.forEach((obj) => {
      obj.offsetX = Math.sin(time + obj.x) * 5;
      obj.offsetY = Math.cos(time + obj.y) * 5;

      const dx = mouseX - obj.x;
      const dy = mouseY - obj.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const angle = Math.atan2(dy, dx);
        obj.repelX = Math.cos(angle) * -50;
        obj.repelY = Math.sin(angle) * -50;
      } else {
        obj.repelX *= 0.9;
        obj.repelY *= 0.9;
      }

      const tx = obj.offsetX + obj.repelX;
      const ty = obj.offsetY + obj.repelY;

      obj.el.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    requestAnimationFrame(floatEffect);
  }

  floatEffect();
});
