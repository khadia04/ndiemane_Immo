FROM php:8.2-apache

# Activer mod_rewrite pour Apache
RUN a2enmod rewrite

# Modifier le port d'écoute d'Apache
RUN sed -i 's/Listen 80/Listen 8080/' /etc/apache2/ports.conf
RUN sed -i 's/:80/:8080/' /etc/apache2/sites-enabled/000-default.conf

# Changer le DocumentRoot pour pointer vers le dossier public de Laravel
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-enabled/000-default.conf

# Copier tout le backend (contenant le dossier public/)
COPY . /var/www/html/

# Donner les droits à Apache (www-data) sur tous les fichiers
RUN chown -R www-data:www-data /var/www/html

EXPOSE 8080

CMD ["apache2-foreground"]
