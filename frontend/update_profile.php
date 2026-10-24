<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstName = $_POST["firstName"] ?? '';
    $lastName = $_POST["lastName"] ?? '';
    $email = $_POST["email"] ?? '';
    $phone = $_POST["phone"] ?? '';
    $address = $_POST["address"] ?? '';

    // Simule une réponse (ici on ne sauvegarde rien)
    echo "Profil de $firstName $lastName mis à jour avec succès !";
} else {
    echo "Requête invalide.";
}
?>