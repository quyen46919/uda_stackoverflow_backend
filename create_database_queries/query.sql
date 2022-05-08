-- MySQL Workbench Synchronization
-- Generated: 2022-05-08 11:04
-- Model: New Model
-- Version: 1.0
-- Project: UDA_STACKOVERFLOW
-- Author: CHAU QUYEN

drop database if exists uda_stackoverflow;
create database uda_stackoverflow;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `hash_password` VARCHAR(45) NOT NULL,  
  `status` TINYINT(1) NULL DEFAULT 1,
  `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `auth_token` VARCHAR(200) NULL DEFAULT NULL,
  `auth_refresh_token` VARCHAR(200) NULL DEFAULT NULL,
  `is_darkmode` TINYINT(1) NULL DEFAULT 0,
  `language` ENUM('Vietnamese', 'English') NULL DEFAULT 'Vietnamese',
  `disable_notification` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_questions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NULL DEFAULT NULL,
  `content` MEDIUMTEXT NULL DEFAULT NULL,
  `is_resolved` TINYINT(1) NOT NULL DEFAULT 0,
  `team_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` TINYINT(1) NOT NULL DEFAULT 0,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_uda_questions_uda_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_uda_questions_uda_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `uda_stackoverflow`.`uda_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_answers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `content` MEDIUMTEXT NULL DEFAULT NULL,
  `is_corrected` TINYINT(1) NULL DEFAULT 0,
  `status` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT(11) NOT NULL,
  `question_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_uda_answers_uda_users1_idx` (`user_id` ASC),
  INDEX `fk_uda_answers_uda_questions1_idx` (`question_id` ASC),
  CONSTRAINT `fk_uda_answers_uda_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `uda_stackoverflow`.`uda_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_uda_answers_uda_questions1`
    FOREIGN KEY (`question_id`)
    REFERENCES `uda_stackoverflow`.`uda_questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_tags` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  `status` TINYINT(1) NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_tags_in_question` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `question_id` INT(11) NOT NULL,
  `tag_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_uda_tags_in_question_uda_questions1_idx` (`question_id` ASC),
  INDEX `fk_uda_tags_in_question_uda_tags1_idx` (`tag_id` ASC),
  CONSTRAINT `fk_uda_tags_in_question_uda_questions1`
    FOREIGN KEY (`question_id`)
    REFERENCES `uda_stackoverflow`.`uda_questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_uda_tags_in_question_uda_tags1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `uda_stackoverflow`.`uda_tags` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_teams` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `status` TINYINT(1) NULL DEFAULT 1,
  `team_admin_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_member_of_team` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `join_time` DATETIME NULL DEFAULT NULL,
  `out_time` DATETIME NULL DEFAULT NULL,
  `role` ENUM('Trưởng nhóm', 'Phó nhóm', 'Thành viên') NULL DEFAULT 'Thành viên',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `member_id` INT(11) NOT NULL,
  `team_id` INT(11) NOT NULL,
  `status` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_uda_member_of_team_uda_users1_idx` (`member_id` ASC),
  INDEX `fk_uda_member_of_team_uda_teams1_idx` (`team_id` ASC),
  CONSTRAINT `fk_uda_member_of_team_uda_users1`
    FOREIGN KEY (`member_id`)
    REFERENCES `uda_stackoverflow`.`uda_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_uda_member_of_team_uda_teams1`
    FOREIGN KEY (`team_id`)
    REFERENCES `uda_stackoverflow`.`uda_teams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_boards` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `status` TINYINT(1) NULL DEFAULT 1,
  `created_user_id` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `team_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_uda_boards_uda_teams1_idx` (`team_id` ASC),
  CONSTRAINT `fk_uda_boards_uda_teams1`
    FOREIGN KEY (`team_id`)
    REFERENCES `uda_stackoverflow`.`uda_teams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_board_column_order` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `status` TINYINT(1) NULL DEFAULT 1,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `board_id` INT(11) NOT NULL,
  `column_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_uda_board_column_order_uda_boards1_idx` (`board_id` ASC),
  INDEX `fk_uda_board_column_order_uda_columns1_idx` (`column_id` ASC),
  CONSTRAINT `fk_uda_board_column_order_uda_boards1`
    FOREIGN KEY (`board_id`)
    REFERENCES `uda_stackoverflow`.`uda_boards` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_uda_board_column_order_uda_columns1`
    FOREIGN KEY (`column_id`)
    REFERENCES `uda_stackoverflow`.`uda_columns` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_columns` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `status` TINYINT(1) NULL DEFAULT 1,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_column_card_order` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `status` TINYINT(1) NULL DEFAULT 1,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `column_id` INT(11) NOT NULL,
  `card_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_uda_column_card_order_uda_columns1_idx` (`column_id` ASC),
  INDEX `fk_uda_column_card_order_uda_cards1_idx` (`card_id` ASC),
  CONSTRAINT `fk_uda_column_card_order_uda_columns1`
    FOREIGN KEY (`column_id`)
    REFERENCES `uda_stackoverflow`.`uda_columns` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_uda_column_card_order_uda_cards1`
    FOREIGN KEY (`card_id`)
    REFERENCES `uda_stackoverflow`.`uda_cards` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_cards` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  `status` TINYINT(1) NULL DEFAULT 1,
  `column_card_order_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_card_tags` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `bg_color` VARCHAR(20) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_tags_in_card` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `card_id` INT(11) NOT NULL,
  `tag_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_uda_tags_in_card_uda_cards1_idx` (`card_id` ASC),
  INDEX `fk_uda_tags_in_card_uda_card_tags1_idx` (`tag_id` ASC),
  CONSTRAINT `fk_uda_tags_in_card_uda_cards1`
    FOREIGN KEY (`card_id`)
    REFERENCES `uda_stackoverflow`.`uda_cards` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_uda_tags_in_card_uda_card_tags1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `uda_stackoverflow`.`uda_card_tags` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `uda_stackoverflow`.`uda_card_images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `status` TINYINT(1) NULL DEFAULT 1,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `image_file` LONGTEXT NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `card_id` INT(11) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_uda_card_images_uda_cards1_idx` (`card_id` ASC),
  CONSTRAINT `fk_uda_card_images_uda_cards1`
    FOREIGN KEY (`card_id`)
    REFERENCES `uda_stackoverflow`.`uda_cards` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
