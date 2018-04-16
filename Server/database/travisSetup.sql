# Create database user
DROP USER 'admin'@'localhost';
flush privileges;
CREATE USER 'admin'@'localhost';
# GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'admin'@'localhost';

# Create DB
CREATE DATABASE IF NOT EXISTS `hospitalHorror`; # DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `hospitalHorror`;