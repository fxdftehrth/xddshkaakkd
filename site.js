const navigationToggle = document.querySelector("[data-nav-toggle]");
const siteNavigation = document.querySelector("#site-nav");

if (navigationToggle && siteNavigation) {
  navigationToggle.addEventListener("click", () => {
    const isOpen = siteNavigation.classList.toggle("is-open");
    navigationToggle.classList.toggle("is-open", isOpen);
    navigationToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNavigation.classList.remove("is-open");
      navigationToggle.classList.remove("is-open");
      navigationToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const ageDialog = document.querySelector("#age-dialog");
const localPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname) && new URLSearchParams(window.location.search).has("preview");

if (localPreview) sessionStorage.setItem("pole-age-confirmed", "yes");

if (ageDialog) {
  document.querySelector("[data-age-yes]")?.addEventListener("click", () => {
    sessionStorage.setItem("pole-age-confirmed", "yes");
    ageDialog.close();
  });

  document.querySelector("[data-age-no]")?.addEventListener("click", () => {
    ageDialog.close();
    const toast = document.querySelector("#age-toast");
    toast?.classList.add("visible");
    window.setTimeout(() => toast?.classList.remove("visible"), 3500);
  });

  if (!sessionStorage.getItem("pole-age-confirmed") && !ageDialog.open) ageDialog.showModal();
}
