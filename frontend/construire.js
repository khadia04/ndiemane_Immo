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
    // // Modal filter 
    
    // document.addEventListener('DOMContentLoaded', () => {
    //   const modal = document.getElementById('filterModal');
    //   const toggle = document.getElementById('filterToggle');
    //   const closeBtn = document.getElementById('closeBtn');
    //   const closeIcon = document.getElementById('modalClose');

    //   function closeModal() {
    //     modal.classList.remove('show');
    //   }

    //   toggle.addEventListener('click', () => {
    //     modal.classList.add('show');
    //   });

    //   closeBtn.addEventListener('click', closeModal);
    //   closeIcon.addEventListener('click', closeModal);

    //   window.addEventListener('click', (e) => {
    //     if (e.target === modal) {
    //       closeModal();
    //     }
    //   });
    // });
  //   // Modal section  presentation
  //    document.addEventListener('DOMContentLoaded', () => {
  //   const openBtn = document.getElementById('openModal');
  //   const modal = document.getElementById('modal');
  //   const closeBtn = document.getElementById('closeModal');

  //   openBtn.addEventListener('click', () => {
  //     modal.classList.add('show');
  //   });

  //   closeBtn.addEventListener('click', () => {
  //     modal.classList.remove('show');
  //   });
    
  //   window.addEventListener('click', (e) => {
  //     if (e.target === modal) {
  //       modal.classList.remove('show');
  //     }
  //   });
  // });
// Animation des cartes
  document.querySelectorAll('.card').forEach((el, i) => {
    setTimeout(() => {
      el.style.animationDelay = `${i * 0.2}s`;
      el.classList.add('animated');
    }, 100);
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

        /* script du menu toggle: en mode responsive */
        const toggle = document.getElementById("menuToggle");
        const closeBtn = document.getElementById("closeMenu");
        const navMenu = document.getElementById("navMenu");

        toggle.addEventListener("click", () => {
          navMenu.classList.add("active");
        });

        // closeBtn.addEventListener("click", () => {
        // navMenu.classList.remove("active");
        // });



    // // Filtre des cartes
    // function filterCards() {
    //   const input = document.getElementById("filter-input").value.toLowerCase();
    //   const cards = document.querySelectorAll("#selection-cards .card");
    //   cards.forEach(card => {
    //     const title = card.querySelector(".card-content p").textContent.toLowerCase();
    //     card.style.display = title.includes(input) ? "block" : "none";
    //   });
    // }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });

    // // Modal filter 
    // document.addEventListener('DOMContentLoaded', () => {
    //   const modal = document.getElementById('filterModal');
    //   const toggle = document.getElementById('filterToggle');
    //   const closeBtn = document.getElementById('closeBtn');
    //   const closeIcon = document.getElementById('modalClose');

    //   function closeModal() {
    //     modal.classList.remove('show');
    //   }

    //   toggle.addEventListener('click', () => {
    //     modal.classList.add('show');
    //   });

    //   closeBtn.addEventListener('click', closeModal);
    //   closeIcon.addEventListener('click', closeModal);

    //   window.addEventListener('click', (e) => {
    //     if (e.target === modal) {
    //       closeModal();
    //     }
    //   });
    // });
  //   // Modal section  presentation
  //    document.addEventListener('DOMContentLoaded', () => {
  //   const openBtn = document.getElementById('openModal');
  //   const modal = document.getElementById('modal');
  //   const closeBtn = document.getElementById('closeModal');

  //   openBtn.addEventListener('click', () => {
  //     modal.classList.add('show');
  //   });

  //   closeBtn.addEventListener('click', () => {
  //     modal.classList.remove('show');
  //   });

  //   window.addEventListener('click', (e) => {
  //     if (e.target === modal) {
  //       modal.classList.remove('show');
  //     }
  //   });
  // });

  document.querySelectorAll('.card').forEach((el, i) => {
    setTimeout(() => {
      el.style.animationDelay = `${i * 0.2}s`;
      el.classList.add('animated');
    }, 100);
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
