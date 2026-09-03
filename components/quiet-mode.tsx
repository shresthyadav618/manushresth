"use client";

import { useEffect, useState } from "react";

export default function QuietMode() {
  const [quiet, setQuiet] = useState(false);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("quiet-reading");
    };
  }, []);

  function toggle() {
    const next = !quiet;
    setQuiet(next);
    document.documentElement.classList.toggle("quiet-reading", next);
  }

  return (
    <button type="button" className="quiet-toggle" onClick={toggle}>
      {quiet ? "Exit quiet mode" : "Quiet mode"}
    </button>
  );
}
