CREATE DATABASE  IF NOT EXISTS `proyectont` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `proyectont`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyectont
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idProducto` int(10) unsigned DEFAULT NULL,
  `idUsuario` int(10) unsigned DEFAULT NULL,
  `comentario` varchar(250) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idProducto` (`idProducto`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (2,2,12,'Mi Favorito','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(3,2,7,'Muy bello, SIUUUUUUUUU','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(4,2,13,'Precio?','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(5,3,12,'Me lo regalo mi señora, me gusta','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(6,3,7,'Me encanta este reloj','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(7,3,13,'Genial!','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(8,4,12,'','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(9,4,7,'No me gusta nada','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(10,4,13,'Malisimo este','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(11,5,12,'Impresionante trabajo','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(12,5,7,'Increíble diseño','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(13,5,13,'¿Cuál es la disponibilidad??','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(14,6,12,'Una maravilla de producto','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(15,6,7,'Excelente calidad','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(16,6,13,'¿Puedo ver más fotos?','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(17,7,12,'Sin duda, el mejor','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(18,7,7,'¿Hacen envíos internacionales?','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(19,7,13,'¿Tienen descuentos por cantidad?','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(20,8,12,'¡Lo necesito en mi vida!','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(21,8,7,'¿Hay diferentes colores disponibles?','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(22,8,13,'Es resistente al Agua?','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(23,9,12,'Un diseño unico','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(24,9,7,'Sin palabras, 10/10','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(25,9,13,'Combina con mi muñeca','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(26,10,12,'Esta bien','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(27,10,7,'Increible','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(28,10,13,'Tengo uno igual','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(29,11,12,'Me esperaba mas por el precio que tiene','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(30,11,7,'Normalito','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42'),(31,11,13,'Se puede pagar en cuotas?','2024-04-22 23:22:42','2024-04-22 23:22:42','2024-04-22 23:22:42');
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idUsuario` int(10) unsigned DEFAULT NULL,
  `nombreProducto` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `imagen` varchar(250) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,7,'Rolex Submariner','Un clásico reloj de buceo con un diseño icónico.','rolex-submariner.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12'),(3,7,'Casio G-Shock','Un reloj resistente a los golpes y con muchas funciones, ideal para actividades al aire libre.','casio-g-shock.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12'),(4,7,'Omega Speedmaster','Conocido como el \"Moonwatch\", este reloj ha sido usado en misiones espaciales.','omega-speedmaster.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12'),(5,7,'Apple Watch Series 7','Un reloj inteligente que ofrece seguimiento de la salud y fitness, así como notificaciones inteligentes.','apple-watch.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12'),(6,7,'Seiko SKX007','Un reloj de buceo asequible y muy apreciado por los entusiastas de los relojes.','seiko-skx007.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12'),(7,7,'Tag Heuer Carrera','Un elegante reloj deportivo con un diseño sofisticado.','tag-heuer-carrera.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12'),(8,7,'Timex Weekender','Un reloj casual y asequible con un diseño clásico.','timex-weekender.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12'),(9,7,'Citizen Eco-Drive','Un reloj que se carga con la luz solar, eliminando la necesidad de cambiar la batería.','citizen-eco-drive.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12'),(10,7,'Fossil Gen 6','Un reloj inteligente con estilo clásico y funciones modernas.','fossil-gen-6.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12'),(11,7,'Audemars Piguet Royal Oak','Un reloj de lujo con un diseño distintivo de brazalete integrado.','audemars-piguet-royal-oak.jpg','2024-04-22 23:14:12','2024-04-22 23:14:12','2024-04-22 23:14:12');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `usuario` varchar(250) NOT NULL,
  `contrasenia` varchar(250) NOT NULL,
  `fecha` date NOT NULL,
  `dni` int(11) NOT NULL,
  `fotoPerfil` varchar(250) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (7,'juanqueirolocuchuttini@gmail.com','Cruz','juancruz','1999-12-15',42255481,'cristiano.jpg','2024-04-22 23:04:04','2024-04-22 23:04:04','2024-04-22 23:04:04'),(12,'nanoalonso@gmail.com','Fernando','magic33','1981-07-29',33333333,'nano.jpg','2024-04-22 23:08:45','2024-04-22 23:08:45','2024-04-22 23:08:45'),(13,'Javier@gmail.com','Javier','libertad','1986-09-20',33333334,'javier.jpg','2024-04-22 23:08:45','2024-04-22 23:08:45','2024-04-22 23:08:45'),(14,'Tomasgarcia@gmail.com','Tomasgarci','tomas1234','2005-01-05',46572133,'ruta/a/la/foto.jpg','2024-04-22 23:08:45','2024-04-22 23:08:45','2024-04-22 23:08:45'),(15,'Euge@gmail.com','Euge','Euge1','2009-09-02',46570193,'ruta/a/la/foto.jpg','2024-04-22 23:08:45','2024-04-22 23:08:45','2024-04-22 23:08:45');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'proyectont'
--

--
-- Dumping routines for database 'proyectont'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22 20:41:44
