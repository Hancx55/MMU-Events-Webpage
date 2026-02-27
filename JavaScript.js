//inserts nav bar to all pages
document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/navigation.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;
    });
});
//inserts footer to all pages
document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/footer.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    });
});