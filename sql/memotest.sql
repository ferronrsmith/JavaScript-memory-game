SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

SHOW WARNINGS;
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `player_stats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `player_stats` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `player_stats` (
  `idplayer_stats` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL DEFAULT NULL ,
  `time` INT(11) NOT NULL ,
  PRIMARY KEY (`idplayer_stats`) )
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `idplayer_stats_UNIQUE` ON `player_stats` (`idplayer_stats` ASC) ;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `sushi_game_stats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sushi_game_stats` ;

SHOW WARNINGS;
CREATE  TABLE IF NOT EXISTS `sushi_game_stats` (
  `idsushi_game_stats` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL DEFAULT NULL ,
  `clicks` INT(11) NOT NULL ,
  PRIMARY KEY (`idsushi_game_stats`) )
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;

SHOW WARNINGS;
CREATE UNIQUE INDEX `idsushi_game_stats_UNIQUE` ON `sushi_game_stats` (`idsushi_game_stats` ASC) ;

SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure AddResult
-- -----------------------------------------------------
DROP procedure IF EXISTS `AddResult`;
SHOW WARNINGS;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddResult`(nm varchar(45),tt INT)
BEGIN
    DECLARE count INT;
    SET @count := (select count(*) from player_stats where name = nm); 
   if(@count < 1)
     then insert into player_stats (name,time) values (nm,tt);
   else update player_stats set time = tt where name = nm;
   end if;
END$$

$$
DELIMITER ;

SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure GetAllResults
-- -----------------------------------------------------
DROP procedure IF EXISTS `GetAllResults`;
SHOW WARNINGS;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllResults`()
BEGIN
    select name,time from player_stats order by time ASC;
END$$

$$
DELIMITER ;

SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure GetTopTenResults
-- -----------------------------------------------------
DROP procedure IF EXISTS `GetTopTenResults`;
SHOW WARNINGS;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTopTenResults`()
BEGIN
    select name,time from player_stats order by time ASC limit 0,10;
END$$

$$
DELIMITER ;

SHOW WARNINGS;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
