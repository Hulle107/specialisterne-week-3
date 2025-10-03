CREATE DATABASE  IF NOT EXISTS `cereal` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cereal`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: cereal
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cereal`
--

DROP TABLE IF EXISTS `cereal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cereal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `mfr` char(1) NOT NULL,
  `type` char(1) DEFAULT NULL,
  `calories` int DEFAULT NULL,
  `protein` int DEFAULT NULL,
  `fat` int DEFAULT NULL,
  `sodium` int DEFAULT NULL,
  `fiber` float DEFAULT NULL,
  `carbo` float DEFAULT NULL,
  `sugars` int DEFAULT NULL,
  `potass` int DEFAULT NULL,
  `vitamins` int DEFAULT NULL,
  `shelf` int DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `cups` float DEFAULT NULL,
  `rating` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cereal`
--

LOCK TABLES `cereal` WRITE;
/*!40000 ALTER TABLE `cereal` DISABLE KEYS */;
INSERT INTO `cereal` VALUES (1,'100% Bran','N','C',70,4,1,130,10,5,6,280,25,3,1,0.33,68.403),(2,'100% Natural Bran','Q','C',120,3,5,15,2,8,8,135,0,3,1,1,33.9837),(3,'All-Bran','K','C',70,4,1,260,9,7,5,320,25,3,1,0.33,59.4255),(4,'All-Bran with Extra Fiber','K','C',50,4,0,140,14,8,0,330,25,3,1,0.5,93.7049),(5,'Almond Delight','R','C',110,2,2,200,1,14,8,-1,25,3,1,0.75,34.3848),(6,'Apple Cinnamon Cheerios','G','C',110,2,2,180,1.5,10.5,10,70,25,1,1,0.75,29.5095),(7,'Apple Jacks','K','C',110,2,0,125,1,11,14,30,25,2,1,1,33.1741),(8,'Basic 4','G','C',130,3,2,210,2,18,8,100,25,3,1.33,0.75,37.0386),(9,'Bran Chex','R','C',90,2,1,200,4,15,6,125,25,1,1,0.67,49.1203),(10,'Bran Flakes','P','C',90,3,0,210,5,13,5,190,25,3,1,0.67,53.3138),(11,'Cap\'n\'Crunch','Q','C',120,1,2,220,0,12,12,35,25,2,1,0.75,18.0429),(12,'Cheerios','G','C',110,6,2,290,2,17,1,105,25,1,1,1.25,50.765),(13,'Cinnamon Toast Crunch','G','C',120,1,3,210,0,13,9,45,25,2,1,0.75,19.8236),(14,'Clusters','G','C',110,3,2,140,2,13,7,105,25,3,1,0.5,40.4002),(15,'Cocoa Puffs','G','C',110,1,1,180,0,12,13,55,25,2,1,1,22.7364),(16,'Corn Chex','R','C',110,2,0,280,0,22,3,25,25,1,1,1,41.445),(17,'Corn Flakes','K','C',100,2,0,290,1,21,2,35,25,1,1,1,45.8633),(18,'Corn Pops','K','C',110,1,0,90,1,13,12,20,25,2,1,1,35.7828),(19,'Count Chocula','G','C',110,1,1,180,0,12,13,65,25,2,1,1,22.3965),(20,'Cracklin\' Oat Bran','K','C',110,3,3,140,4,10,7,160,25,3,1,0.5,40.4488),(21,'Cream of Wheat (Quick)','N','H',100,3,0,80,1,21,0,-1,0,2,1,1,64.5338),(22,'Crispix','K','C',110,2,0,220,1,21,3,30,25,3,1,1,46.8956),(23,'Crispy Wheat & Raisins','G','C',100,2,1,140,2,11,10,120,25,3,1,0.75,36.1762),(24,'Double Chex','R','C',100,2,0,190,1,18,5,80,25,3,1,0.75,44.3309),(25,'Froot Loops','K','C',110,2,1,125,1,11,13,30,25,2,1,1,32.2076),(26,'Frosted Flakes','K','C',110,1,0,200,1,14,11,25,25,1,1,0.75,31.436),(27,'Frosted Mini-Wheats','K','C',100,3,0,0,3,14,7,100,25,2,1,0.8,58.3451),(28,'Fruit & Fibre Dates, Walnuts, and Oats','P','C',120,3,2,160,5,12,10,200,25,3,1.25,0.67,40.917),(29,'Fruitful Bran','K','C',120,3,0,240,5,14,12,190,25,3,1.33,0.67,41.0155),(30,'Fruity Pebbles','P','C',110,1,1,135,0,13,12,25,25,2,1,0.75,28.0258),(31,'Golden Crisp','P','C',100,2,0,45,0,11,15,40,25,1,1,0.88,35.2524),(32,'Golden Grahams','G','C',110,1,1,280,0,15,9,45,25,2,1,0.75,23.804),(33,'Grape Nuts Flakes','P','C',100,3,1,140,3,15,5,85,25,3,1,0.88,52.0769),(34,'Grape-Nuts','P','C',110,3,0,170,3,17,3,90,25,3,1,0.25,53.371),(35,'Great Grains Pecan','P','C',120,3,3,75,3,13,4,100,25,3,1,0.33,45.8117),(36,'Honey Graham Ohs','Q','C',120,1,2,220,1,12,11,45,25,2,1,1,21.8713),(37,'Honey Nut Cheerios','G','C',110,3,1,250,1.5,11.5,10,90,25,1,1,0.75,31.0722),(38,'Honey-comb','P','C',110,1,0,180,0,14,11,35,25,1,1,1.33,28.7424),(39,'Just Right Crunchy  Nuggets','K','C',110,2,1,170,1,17,6,60,100,3,1,1,36.5237),(40,'Just Right Fruit & Nut','K','C',140,3,1,170,2,20,9,95,100,3,1.3,0.75,36.4715),(41,'Kix','G','C',110,2,1,260,0,21,3,40,25,2,1,1.5,39.2411),(42,'Life','Q','C',100,4,2,150,2,12,6,95,25,2,1,0.67,45.3281),(43,'Lucky Charms','G','C',110,2,1,180,0,12,12,55,25,2,1,1,26.7345),(44,'Maypo','A','H',100,4,1,0,0,16,3,95,25,2,1,1,54.8509),(45,'Muesli Raisins, Dates, & Almonds','R','C',150,4,3,95,3,16,11,170,25,3,1,1,37.1369),(46,'Muesli Raisins, Peaches, & Pecans','R','C',150,4,3,150,3,16,11,170,25,3,1,1,34.1398),(47,'Mueslix Crispy Blend','K','C',160,3,2,150,3,17,13,160,25,3,1.5,0.67,30.3134),(48,'Multi-Grain Cheerios','G','C',100,2,1,220,2,15,6,90,25,1,1,1,40.106),(49,'Nut&Honey Crunch','K','C',120,2,1,190,0,15,9,40,25,2,1,0.67,29.9243),(50,'Nutri-Grain Almond-Raisin','K','C',140,3,2,220,3,21,7,130,25,3,1.33,0.67,40.6923),(51,'Nutri-grain Wheat','K','C',90,3,0,170,3,18,2,90,25,3,1,1,59.6428),(52,'Oatmeal Raisin Crisp','G','C',130,3,2,170,1.5,13.5,10,120,25,3,1.25,0.5,30.4508),(53,'Post Nat. Raisin Bran','P','C',120,3,1,200,6,11,14,260,25,3,1.33,0.67,37.8406),(54,'Product 19','K','C',100,3,0,320,1,20,3,45,100,3,1,1,41.5035),(55,'Puffed Rice','Q','C',50,1,0,0,0,13,0,15,0,3,0.5,1,60.7561),(56,'Puffed Wheat','Q','C',50,2,0,0,1,10,0,50,0,3,0.5,1,63.0056),(57,'Quaker Oat Squares','Q','C',100,4,1,135,2,14,6,110,25,3,1,0.5,49.5119),(58,'Quaker Oatmeal','Q','H',100,5,2,0,2.7,-1,-1,110,0,1,1,0.67,50.8284),(59,'Raisin Bran','K','C',120,3,1,210,5,14,12,240,25,2,1.33,0.75,39.2592),(60,'Raisin Nut Bran','G','C',100,3,2,140,2.5,10.5,8,140,25,3,1,0.5,39.7034),(61,'Raisin Squares','K','C',90,2,0,0,2,15,6,110,25,3,1,0.5,55.3331),(62,'Rice Chex','R','C',110,1,0,240,0,23,2,30,25,1,1,1.13,41.9989),(63,'Rice Krispies','K','C',110,2,0,290,0,22,3,35,25,1,1,1,40.5602),(64,'Shredded Wheat','N','C',80,2,0,0,3,16,0,95,0,1,0.83,1,68.2359),(65,'Shredded Wheat \'n\'Bran','N','C',90,3,0,0,4,19,0,140,0,1,1,0.67,74.4729),(66,'Shredded Wheat spoon size','N','C',90,3,0,0,3,20,0,120,0,1,1,0.67,72.8018),(67,'Smacks','K','C',110,2,1,70,1,9,15,40,25,2,1,0.75,31.2301),(68,'Special K','K','C',110,6,0,230,1,16,3,55,25,1,1,1,53.1313),(69,'Strawberry Fruit Wheats','N','C',90,2,0,15,3,15,5,90,25,2,1,1,59.364),(70,'Total Corn Flakes','G','C',110,2,1,200,0,21,3,35,100,3,1,1,38.8397),(71,'Total Raisin Bran','G','C',140,3,1,190,4,15,14,230,100,3,1.5,1,28.5928),(72,'Total Whole Grain','G','C',100,3,1,200,3,16,3,110,100,3,1,1,46.6588),(73,'Triples','G','C',110,2,1,250,0,21,3,60,25,3,1,0.75,39.1062),(74,'Trix','G','C',110,1,1,140,0,13,12,25,25,2,1,1,27.7533),(75,'Wheat Chex','R','C',100,3,1,230,3,17,3,115,25,1,1,0.67,49.7874),(76,'Wheaties','G','C',100,3,1,200,3,17,3,110,25,1,1,1,51.5922),(77,'Wheaties Honey Gold','G','C',110,2,1,200,1,16,8,60,25,1,1,0.75,36.1876);
/*!40000 ALTER TABLE `cereal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(128) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Hulle107','delta.thiesen.1990@gmail.com','f9dd077a3ee5b8c4af4db9841c96f8ef:449a05846d1ae9159f4df604fa3db9f8f03e3f0f231a72f9159247da6a76b1ffff249a9c57235b3613e4fb41a85802f3995c8a84cf5df1f8e2704eccf6ff1e55','Delta','Thiesen');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-03 11:24:17
