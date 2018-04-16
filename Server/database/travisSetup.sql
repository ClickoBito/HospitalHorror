# Create database user
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'root'@'localhost';

# Create DB
CREATE DATABASE IF NOT EXISTS `hospitalHorror` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `hospitalHorror`;