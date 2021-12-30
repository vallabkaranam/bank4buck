import React, { useState } from "react";
// import "./ScrollUp.css";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <i
      className="fas fa-arrow-circle-up fa-3x scrollTop text-primary"
      onClick={scrollTop}
      style={{ display: showScroll ? "inline-block" : "none" }}
    />
  );
};

export default ScrollToTop;
