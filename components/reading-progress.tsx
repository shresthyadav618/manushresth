"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const article = document.querySelector("article");

      if (!article) {
        return;
      }

      const top = article.offsetTop;
      const height = article.offsetHeight - window.innerHeight;
      const value =
        height <= 0 ? 1 : Math.min(1, Math.max(0, (window.scrollY - top) / height));

      setProgress(value);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div
        className="reading-progress-bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
