let navDiv = document.querySelector("nav div");

navDiv.addEventListener("mouseenter", function (e) {
  navDiv.classList.add("mouseEvent");
});
navDiv.addEventListener("mouseleave", function (e) {
  navDiv.classList.remove("mouseEvent");
  navDiv.style.backgroundColor = "#1a2634";
  navDiv.style.transition = "0.4s ease-in-out";
});

document.body.addEventListener("click", function (e) {
  if (e.target.tagName == "INPUT" || e.target.id == "search-img") {
    navDiv.classList.add("clickEvent");
    console.log(navDiv);
  } else {
    navDiv.classList.remove("clickEvent");
  }
});
