// IIFE for tooltip functionality
(function () {
  // Function to show tooltips
  function showTooltip(event) {
    const targetElement = event.target;
    const titleText = targetElement.title;

    targetElement.title = ""; // Clear the default title

    if (!titleText) return; // Skip if empty

    // Create tooltip element
    const tooltip = document.createElement("div");
    tooltip.textContent = titleText;
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "4px 8px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.style.opacity = "0.9";
    tooltip.style.fontSize = "0.8em";
    tooltip.style.pointerEvents = "none";
    tooltip.style.transition = "opacity 0.2s ease";

    // Function to append tooltip with a callback
    const appendTooltip = (callback) => {
      document.body.appendChild(tooltip);
      const rect = targetElement.getBoundingClientRect();
      const tooltipHeight = tooltip.offsetHeight;

      // Calculate position above the element
      let topPosition = rect.top + window.scrollY - tooltipHeight;

      // Adjust position if the tooltip goes off-screen
      if (topPosition < 0) {
        topPosition = rect.bottom + window.scrollY; // Show below if not enough space above
      }

      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${topPosition}px`;

      // Invoke the callback after appending
      if (callback) callback();
    };

    // Append the tooltip and execute the callback
    appendTooltip(() => {
      // Remove tooltip when mouse leaves and restore the original title
      targetElement.addEventListener(
        "mouseleave",
        () => {
          document.body.removeChild(tooltip);
          targetElement.title = titleText; // Restore the original title
        },
        { once: true }
      );
    });
  }

  // Wait for the DOM content to fully load
  document.addEventListener("DOMContentLoaded", () => {
    // Attach event listeners for default tooltips
    document.querySelectorAll("[title]").forEach((element) => {
      element.addEventListener("mouseenter", showTooltip);
    });
  });
})(); // Execute the IIFE
