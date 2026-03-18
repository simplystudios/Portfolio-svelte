export function fadeUp(node, { delay = 0, duration = 350, y = 8 } = {}) {
  node.style.opacity = "0";
  node.style.transform = `translateY(${y}px)`;
  node.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`;

  requestAnimationFrame(() => {
    node.style.opacity = "1";
    node.style.transform = "translateY(0)";
  });

  return {
    destroy() {},
  };
}
