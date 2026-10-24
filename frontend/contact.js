 /* script du menu toggle: en mode responsive */
        const toggle = document.getElementById("menuToggle");
        const closeBtn = document.getElementById("closeMenu");
        const navMenu = document.getElementById("navMenu");

        toggle.addEventListener("click", () => {
          navMenu.classList.add("active");
        });

        closeBtn.addEventListener("click", () => {
        navMenu.classList.remove("active");
        });

        /* messae de confirmation  */
        const form = document.getElementById('contactForm');
        const confirmation = document.getElementById('confirmationMessage');

        form.addEventListener('submit', function (e) {
        e.preventDefault();
        confirmation.style.display = 'block';
        setTimeout(() => {
          confirmation.style.display = 'none';
        form.reset();
        }, 3000);
        });

        // Animation champ par champ
        const inputs = document.querySelectorAll('.animate-input');
        inputs.forEach((input, index) => {
          setTimeout(() => {
            input.style.opacity = '1';
            input.style.transform = 'translateY(0)';
          }, 300 * index);
        });

        // FORMULAIRE AVEC EMAILJS
(function(){
  emailjs.init('Fc63g7OnOvfKFgzaS'); // Remplace par ta clé
})();

document.getElementById("contactForm")?.addEventListener("submit", function(event) {
  event.preventDefault();
  const form = this;
  const templateParams = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    message: form.message.value
  };

  emailjs.send("service_zmgpurk", "template_s0nql6s", templateParams)
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      document.getElementById("confirmationMessage").style.display = "block";
      form.reset();
      setTimeout(() => {
        document.getElementById("confirmationMessage").style.display = "none";
      }, 5000);
    }, function(error) {
      console.log("FAILED...", error);
      alert("Une erreur s'est produite, veuillez réessayer.");
    });
});
