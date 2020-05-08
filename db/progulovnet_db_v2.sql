-- MySQL Script generated by MySQL Workbench
-- Чт 07 май 2020 18:55:08
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`subjects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`subjects` ;

CREATE TABLE IF NOT EXISTS `mydb`.`subjects` (
  `subjects_id` INT NOT NULL AUTO_INCREMENT,
  `subjects_name` VARCHAR(255) NOT NULL,
  `subjects_programe` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`subjects_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`group` ;

CREATE TABLE IF NOT EXISTS `mydb`.`group` (
  `group_id` INT NOT NULL AUTO_INCREMENT,
  `group_number` VARCHAR(255) NOT NULL,
  `group_programe` VARCHAR(255) NULL,
  `group_description` VARCHAR(255) NULL,
  PRIMARY KEY (`group_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_firstname` VARCHAR(255) NOT NULL,
  `user_lastname` VARCHAR(255) NOT NULL,
  `user_patronymic` VARCHAR(255) NOT NULL,
  `user_password_hash` VARCHAR(32) NOT NULL,
  `user_password_salt` VARCHAR(32) NULL,
  `user_password_refreshtoken` VARCHAR(32) NULL,
  `user_password_redreshsent` DATETIME NULL,
  `user_email` VARCHAR(255) NULL,
  `user_access_token` VARCHAR(32) NULL,
  `user_access_tokenvalid` DATETIME NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`lessons`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`lessons` ;

CREATE TABLE IF NOT EXISTS `mydb`.`lessons` (
  `lessons_id` INT NOT NULL AUTO_INCREMENT,
  `lessons_date` DATETIME NOT NULL,
  `subjects_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`lessons_id`),
  INDEX `fk_lessons_subjects1_idx` (`subjects_id` ASC),
  INDEX `fk_lessons_group1_idx` (`group_id` ASC),
  INDEX `fk_lessons_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_lessons_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `mydb`.`subjects` (`subjects_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lessons_group1`
    FOREIGN KEY (`group_id`)
    REFERENCES `mydb`.`group` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lessons_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`attendance`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`attendance` ;

CREATE TABLE IF NOT EXISTS `mydb`.`attendance` (
  `attendance_id` INT NOT NULL AUTO_INCREMENT,
  `lessons_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `presence` INT NOT NULL,
  PRIMARY KEY (`attendance_id`),
  INDEX `fk_attendance_lessons1_idx` (`lessons_id` ASC),
  INDEX `fk_attendance_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_attendance_lessons1`
    FOREIGN KEY (`lessons_id`)
    REFERENCES `mydb`.`lessons` (`lessons_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_attendance_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`role` ;

CREATE TABLE IF NOT EXISTS `mydb`.`role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role_code` INT NOT NULL,
  `role_title` VARCHAR(255) NOT NULL,
  `role_description` VARCHAR(255) NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_has_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user_has_role` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user_has_role` (
  `user_has_role_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  `subjects_id` INT NOT NULL,
  `uhr_granted` DATETIME NOT NULL,
  `uhr_revoked` DATETIME NULL,
  PRIMARY KEY (`user_has_role_id`),
  INDEX `fk_user_has_role_user1_idx` (`user_id` ASC),
  INDEX `fk_user_has_role_role1_idx` (`role_id` ASC),
  INDEX `fk_user_has_role_group1_idx` (`group_id` ASC),
  INDEX `fk_user_has_role_subjects1_idx` (`subjects_id` ASC),
  CONSTRAINT `fk_user_has_role_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_role_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `mydb`.`role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_role_group1`
    FOREIGN KEY (`group_id`)
    REFERENCES `mydb`.`group` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_role_subjects1`
    FOREIGN KEY (`subjects_id`)
    REFERENCES `mydb`.`subjects` (`subjects_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;