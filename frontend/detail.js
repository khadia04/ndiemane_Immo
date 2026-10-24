document.addEventListener("DOMContentLoaded", () => {
  // --- Fonction filtre des cartes ---
  function filterCards() {
    const input = document.getElementById("filter-input")?.value.toLowerCase() || "";
    const cards = document.querySelectorAll("#selection-cards .card");
    cards.forEach(card => {
      const title = card.querySelector(".card-content p")?.textContent.toLowerCase() || "";
      card.style.display = title.includes(input) ? "block" : "none";
    });
  }
  const filterInput = document.getElementById("filter-input");
  if (filterInput) {
    filterInput.addEventListener("input", filterCards);
  }

  // --- Navigation active link ---
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // --- Menu toggle (mobile) ---
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // --- Modal filtre ---
  const modalFilter = document.getElementById('filterModal');
  const filterToggle = document.getElementById('filterToggle');
  const closeFilterBtn = document.getElementById('closeBtn');
  const closeFilterIcon = document.getElementById('modalClose');

  function closeFilterModal() {
    modalFilter.classList.remove('show');
  }

  if (filterToggle && modalFilter) {
    filterToggle.addEventListener('click', () => modalFilter.classList.add('show'));
  }
  if (closeFilterBtn) closeFilterBtn.addEventListener('click', closeFilterModal);
  if (closeFilterIcon) closeFilterIcon.addEventListener('click', closeFilterModal);
  window.addEventListener('click', e => {
    if (e.target === modalFilter) closeFilterModal();
  });

  // --- Modal présentation ---
  const openModalBtn = document.getElementById('openModal');
  const modalPresentation = document.getElementById('modal');
  const closeModalBtn = document.getElementById('closeModal');

  if (openModalBtn && modalPresentation && closeModalBtn) {
    openModalBtn.addEventListener('click', () => modalPresentation.classList.add('show'));
    closeModalBtn.addEventListener('click', () => modalPresentation.classList.remove('show'));
    window.addEventListener('click', e => {
      if (e.target === modalPresentation) modalPresentation.classList.remove('show');
    });
  }

  // --- Animation cartes ---
  document.querySelectorAll('.card').forEach((el, i) => {
    setTimeout(() => {
      el.style.animationDelay = `${i * 0.2}s`;
      el.classList.add('animated');
    }, 100);
  });

  // --- Gestion message bienvenue & profil ---

  // Affiche le message de bienvenue avec prénom si connecté
  function afficherBienvenue() {
    const welcomeMessage = document.getElementById('welcomeMessage');
  const userJSON = localStorage.getItem('loggedInUser');
  if (welcomeMessage) {
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON);
        if (user.firstName && user.lastName) {
          welcomeMessage.textContent = `Bonjour, ${user.firstName} ${user.lastName}`;
        } else if (user.firstName) {
          welcomeMessage.textContent = `Bonjour, ${user.firstName}`;
        } else if (user.lastName) {
          welcomeMessage.textContent = `Bonjour, ${user.lastName}`;
        } else {
          welcomeMessage.textContent = `Bonjour`;
        }
        return;
      } catch (e) {
        console.error("Erreur parsing loggedInUser", e);
      }
    }
    welcomeMessage.textContent = "Vous n'êtes pas connecté.";
  }
  
}

  // Pré-remplit le formulaire profil avec les données localStorage
  function preRemplirFormulaireProfil() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    try {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  if (!user.email) throw "Pas d'utilisateur";
} catch {
  alert("Erreur de récupération utilisateur.");
}
    if (user) {
      document.getElementById("firstName").value = user.firstName || "";
      document.getElementById("lastName").value = user.lastName || "";
      document.getElementById("email").value = user.email || "";
      document.getElementById("phone").value = user.phone || "";
      document.getElementById("address").value = user.address || "";
    }
  }

  // Ouvre modal profil et préremplit
  const openProfileModalBtn = document.getElementById("openProfileModal");
  const profileModal = document.getElementById("profileModal");
  if (openProfileModalBtn && profileModal) {
    openProfileModalBtn.addEventListener("click", e => {
      e.preventDefault();
      preRemplirFormulaireProfil();
      profileModal.style.display = "flex";
    });
  }

  // Ferme modal profil
  const closeProfileModalBtn = document.getElementById("closeProfileModal");
  if (closeProfileModalBtn && profileModal) {
    closeProfileModalBtn.addEventListener("click", () => {
      profileModal.style.display = "none";
    });
  }

  // Ferme modal si clic en dehors
  window.addEventListener("click", e => {
    if (e.target === profileModal) {
      profileModal.style.display = "none";
    }
  });

  // Soumission formulaire profil — mise à jour localStorage + message
  const profileForm = document.getElementById("profileForm");
  const updateMessage = document.getElementById("updateMessage");
  if (profileForm && updateMessage) {
    profileForm.addEventListener("submit", e => {
      e.preventDefault();

      const updatedUser = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim(),
      };

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      updateMessage.textContent = "Profil mis à jour avec succès !";
      updateMessage.style.color = "green";

      afficherBienvenue();
    });
  }

  // --- Pagination modal profil ---
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const profilePage = document.querySelector(".profile-page");
  const passwordChangePage = document.querySelector(".password-change-page");
  let currentPage = 1;

  function showPage(page) {
    if (!profilePage || !passwordChangePage || !prevPageButton || !nextPageButton) return;
    if (page === 1) {
      profilePage.style.display = "block";
      passwordChangePage.style.display = "none";
      prevPageButton.style.display = "none";
      nextPageButton.style.display = "inline";
    } else if (page === 2) {
      profilePage.style.display = "none";
      passwordChangePage.style.display = "block";
      prevPageButton.style.display = "inline";
      nextPageButton.style.display = "none";
    }
  }

  showPage(currentPage);

  if (nextPageButton) {
    nextPageButton.addEventListener("click", e => {
      e.preventDefault();
      currentPage = 2;
      showPage(currentPage);
    });
  }
  if (prevPageButton) {
    prevPageButton.addEventListener("click", e => {
      e.preventDefault();
      currentPage = 1;
      showPage(currentPage);
    });
  }

  // --- Formulaire mise à jour profil via PHP (si utilisé) ---
  // Optionnel, tu peux supprimer ou commenter si pas besoin
  const phpProfileForm = document.getElementById("profileForm");
  const phpUpdateMessage = document.getElementById("updateMessage");
  if (phpProfileForm && phpUpdateMessage) {
    phpProfileForm.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(phpProfileForm);
      fetch("update_profile.php", {
        method: "POST",
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        phpUpdateMessage.textContent = data;
        phpUpdateMessage.style.color = "green";
      })
      .catch(() => {
        phpUpdateMessage.textContent = "Une erreur s'est produite.";
        phpUpdateMessage.style.color = "red";
      });
    });
  }

  // --- Formulaire changement mot de passe ---
 const passwordForm = document.querySelector('.password-change-page form');
const passwordMessage = document.getElementById('passwordMessage');

if (passwordForm && passwordMessage) {
  passwordForm.addEventListener('submit', e => {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    const userJSON = localStorage.getItem('loggedInUser');
    const allUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (!userJSON) {
      passwordMessage.textContent = "Erreur : Vous devez être connecté pour changer votre mot de passe.";
      passwordMessage.style.color = "red";
      return;
    }

    const user = JSON.parse(userJSON);

    if (!currentPassword) {
      passwordMessage.textContent = "Veuillez saisir votre mot de passe actuel.";
      passwordMessage.style.color = "red";
      return;
    }

    if (user.password !== currentPassword) {
      passwordMessage.textContent = "Le mot de passe actuel que vous avez saisi est incorrect.";
      passwordMessage.style.color = "red";
      return;
    }

    if (!newPassword) {
      passwordMessage.textContent = "Veuillez saisir un nouveau mot de passe.";
      passwordMessage.style.color = "red";
      return;
    }

    if (newPassword.length < 6) {
      passwordMessage.textContent = "Le nouveau mot de passe doit contenir au moins 6 caractères.";
      passwordMessage.style.color = "red";
      return;
    }

    if (!confirmPassword) {
      passwordMessage.textContent = "Veuillez confirmer votre nouveau mot de passe.";
      passwordMessage.style.color = "red";
      return;
    }

    if (newPassword !== confirmPassword) {
      passwordMessage.textContent = "La confirmation ne correspond pas au nouveau mot de passe.";
      passwordMessage.style.color = "red";
      return;
    }

    // Mise à jour du mot de passe
    user.password = newPassword;
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    if (allUsers[user.email]) {
      allUsers[user.email].password = newPassword;
      localStorage.setItem("users", JSON.stringify(allUsers));
    }

    passwordMessage.textContent = "Mot de passe modifié avec succès !";
    passwordMessage.style.color = "green";

    passwordForm.reset();

    setTimeout(() => {
      passwordMessage.textContent = '';
    }, 4000);
  });
}



  // --- Gestion déconnexion ---
  function logout() {
    localStorage.removeItem('loggedInUser');
    afficherBienvenue();
    alert("Vous êtes déconnecté.");
    window.location.href = "index.html";
  }
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', e => {
      e.preventDefault();
      logout();
    });
  }

  afficherBienvenue();
});


// --- Chargement des sections de détail de propriété ---
const storedProperty = JSON.parse(localStorage.getItem('selectedProperty'));

if (storedProperty) {
  // Construire la section property-gallery
  const gallerySection = `
    <section class="property-gallery">
      <div class="gallery-header">
        <h3 style="font-size: medium 18px ; margin-left: 50px; padding-top: 10px;">${storedProperty.nom}</h3>
        <div class="property-location">
          <i class="fas fa-map-marker-alt"></i> ${storedProperty.lieu}
        </div>
      </div>
      <div class="container">
        <div class="row g-3">
          <div class="col-12 col-md-7 h-auto">
            <img class="img-fluid h-auto gallery-img" src="pellicule/${storedProperty.id}.png" alt="Image principale" data-index="0" style="width: 739px;height: 523px;">
          </div>
          <div class="col-12 col-md-5">
            <div class="row g-3 d-flex justify-content-between mb-3">
              <div class="col-6">
                <img class="img-fluid me-2 gallery-img" src="pellicule/${storedProperty.id}-1.png" alt="Image 1" data-index="1">
              </div>
              <div class="col-6">
                <img class="img-fluid gallery-img" src="pellicule/${storedProperty.id}-2.png" alt="Image 2" data-index="2">
              </div>
            </div>
            <div class="row g-3 d-flex justify-content-between mb-3">
              <div class="col-6">
                <img class="img-fluid me-2 gallery-img" src="pellicule/${storedProperty.id}-3.png" alt="Image 3" data-index="3">
              </div>
              <div class="col-6">
                <img class="img-fluid gallery-img" src="pellicule/${storedProperty.id}-4.png" alt="Image 4" data-index="4">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" id="imageModal">
        <span class="modal-close" id="closeModal">&times;</span>
        <span class="modal-nav modal-prev" id="prevBtn">&#10094;</span>
        <div class="modal-content">
          <img src="" alt="Image agrandie" id="modalImage" />
        </div>
        <span class="modal-nav modal-next" id="nextBtn">&#10095;</span>
      </div>
    </section>
  `;

  // Construire la section description + contact
  const desformSection = `
    <section class="desform" style="display: flex;">
      <div class="des" style="width: 100%;">
        <h2 style="font-size: 28px; margin-left: 5%;">Description</h2>
        <p style="font-size: 20px; letter-spacing: 1px; word-spacing: 3px; line-height: 2.5; margin-top: 4%; margin-left: 5%;">
          ${storedProperty.description || "Description non fournie."}
        </p>
      </div>
      <div>
        <section class="contact-section">
          <div class="contact-form-wrapper">
            <img src="pellicule/logo%20NI.png" alt="Logo" class="contact-logo">
            <p>
              <i class="fas fa-envelope"></i>
              <a href="mailto:Ndiemanenimmo@company">Ndiemaenimmo@gmail.com</a>
            </p>
            <p>
              <i class="fas fa-phone-alt"></i>
              <a href="tel:+221765630430">+221784279096</a>
            </p>

            <form id="contactForm">
              <input type="text" name="name" placeholder="Nom complet*" required class="animate-input">
              <input type="tel" name="phone" placeholder="Numéro de téléphone*" required class="animate-input">
              <input type="email" name="email" placeholder="Adresse e-mail*" required class="animate-input">
              <textarea name="message" rows="4" placeholder="Message*" required class="animate-input"></textarea>
              <button type="submit" class="submit-btn">Envoyer le message</button>
              <div class="confirmation-message" id="confirmationMessage" style="display: none;">
                Message envoyé avec succès !
              </div>
            </form>

            <div class="contact-actions">
              <a href="tel:+221784279096" class="whatsapp-btn"><i class="fab fa-whatsapp"></i> WhatsApp</a>
              <a href="tel:+221784279096" class="call-btn"><i class="fas fa-phone"></i> Appeler</a>
            </div>
          </div>
        </section>
      </div>
    </section>
  `;

  // Insérer les sections dans <main>
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = gallerySection + desformSection;
  } else {
    console.error("⚠️ Aucun élément <main> trouvé !");
  }
  
} else {
  console.error("Aucune propriété sélectionnée dans localStorage.");
}


// NAV LINK ACTIF
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ANIMATION CHAMP PAR CHAMP
document.querySelectorAll('.animate-input').forEach((input, index) => {
  setTimeout(() => {
    input.style.opacity = '1';
    input.style.transform = 'translateY(0)';
  }, 300 * index);
});

// SLIDER MODAL IMAGE
const images = document.querySelectorAll('.gallery-img');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIndex = 0;

function showImage(index) {
  modalImage.src = images[index].src;
  modal.classList.add('active');
  currentIndex = index;
}

images.forEach((img, index) => {
  img.addEventListener('click', () => showImage(index));
});

closeModal?.addEventListener('click', () => modal.classList.remove('active'));
nextBtn?.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  modalImage.src = images[currentIndex].src;
});
prevBtn?.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImage.src = images[currentIndex].src;
});
modal?.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// FILTRAGE DES CARTES (si utilisé sur cette page)
function filterCards() {
  const input = document.getElementById("filter-input")?.value.toLowerCase();
  const cards = document.querySelectorAll("#selection-cards .card");
  cards.forEach(card => {
    const title = card.querySelector(".card-content p").textContent.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}

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
