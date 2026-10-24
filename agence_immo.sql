
CREATE DATABASE IF NOT EXISTS agence_immo;
USE agence_immo;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('client', 'agent', 'proprietaire', 'admin') DEFAULT 'client',
    active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE biens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(150),
    description TEXT,
    ville VARCHAR(100),
    type ENUM('Appartement', 'Maison', 'Terrain'),
    prix INT,
    disponible BOOLEAN DEFAULT TRUE,
    proprietaire_id INT,
    FOREIGN KEY (proprietaire_id) REFERENCES users(id)
);

CREATE TABLE visites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bien_id INT,
    user_id INT,
    date_visite DATE,
    heure TIME,
    FOREIGN KEY (bien_id) REFERENCES biens(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE contrats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bien_id INT,
    client_id INT,
    fichier_pdf VARCHAR(255),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bien_id) REFERENCES biens(id),
    FOREIGN KEY (client_id) REFERENCES users(id)
);

CREATE TABLE paiements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    montant INT,
    methode VARCHAR(50),
    date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
