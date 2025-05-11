const handleLocCardClick = (e) => {
	
	const c = e.children
	for (var i = 0; i < c.length; i++) {
		if (c[i].tagName == "A" || c[i].tagName == "a") {
			c[i].click();
		}
	}
}

window.addEventListener("DOMContentLoaded", () => {

  const timeFrames = [
  { start: "06:00", end: "08:00", image: "images/rotating/image1.jpg" },
	{ start: "08:00", end: "10:00", image: "images/rotating/image2.jpg" },
	{ start: "10:00", end: "12:00", image: "images/rotating/image3.jpg" },
  { start: "12:00", end: "14:00", image: "images/rotating/image4.jpg" },
  { start: "14:00", end: "16:00", image: "images/rotating/image5.jpg" },
  { start: "16:00", end: "18:00", image: "images/rotating/image6.jpg" },
  { start: "18:00", end: "20:00", image: "images/rotating/image7.jpg" },
  { start: "20:00", end: "22:00", image: "images/rotating/image8.jpg" },
  { start: "22:00", end: "00:00", image: "images/rotating/image9.jpg" },
  { start: "00:00", end: "02:00", image: "images/rotating/image10.jpg" },
  { start: "02:00", end: "04:00", image: "images/rotating/image11.jpg" },
	{ start: "04:00", end: "06:00", image: "images/rotating/image12.jpg" }
  ];

  function timeToMinutes(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const currentFrame = timeFrames.find(frame => {
    const startMinutes = timeToMinutes(frame.start);
    const endMinutes = timeToMinutes(frame.end);
  
    if (startMinutes < endMinutes) {
      // 10:00 – 12:00
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    } else {
      // 22:00 – 00:00 ...
      return currentMinutes >= startMinutes || currentMinutes < endMinutes;
    }
  });
  

  if (currentFrame) {
    document.getElementById("timeBasedImage").src = currentFrame.image;
  } else {
    document.getElementById("timeBasedImage").src = "images/rotating/image3.jpg";
  }

setTimeout(() => {
	const img = document.getElementById("timeBasedImage");
	if (img) {
	  img.style.filter = "blur(0px) brightness(1)";
	}
  }, 500);
  
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("show") &&
      !mobileMenu.contains(e.target) &&
      e.target !== hamburger
    ) {
      mobileMenu.classList.remove("show");
    }
  });
});

function scrollLocs(button, direction) {
  const container = button.parentElement.querySelector(".loc-scroll-container");
  const scrollAmount = container.clientWidth * 0.8;
  container.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
}

function updateScrollButtons(wrapper) {
	const container = wrapper.querySelector(".loc-scroll-container");
	const leftBtn = wrapper.querySelector(".scroll-btn.left");
	const rightBtn = wrapper.querySelector(".scroll-btn.right");

	if (!container || !leftBtn || !rightBtn) return;

	const scrollWidth = container.scrollWidth;
	const clientWidth = container.clientWidth;

	if (scrollWidth <= clientWidth + 1) {
		leftBtn.style.display = "none";
		rightBtn.style.display = "none";
		return;
	}

	leftBtn.style.display = container.scrollLeft > 0 ? "block" : "none";
	rightBtn.style.display = container.scrollLeft + clientWidth < scrollWidth ? "block" : "none";
}

function initScrollObservers() {
	const wrappers = document.querySelectorAll(".scroll-wrapper");

	wrappers.forEach(wrapper => {
		const container = wrapper.querySelector(".loc-scroll-container");

		updateScrollButtons(wrapper);

		container.addEventListener("scroll", () => updateScrollButtons(wrapper));

		window.addEventListener("resize", () => updateScrollButtons(wrapper));
	});
}

document.addEventListener("DOMContentLoaded", initScrollObservers);
