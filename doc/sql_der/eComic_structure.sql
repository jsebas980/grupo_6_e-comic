CREATE DATABASE
  IF NOT EXISTS `eComic_db`
  /*!40100 DEFAULT CHARACTER SET latin1 */;

USE
  `eComic_db`;

-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
-- Host: localhost    Database: eComic_db
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8 */;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;

/*!40103 SET TIME_ZONE=`+00:00` */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=`NO_AUTO_VALUE_ON_ZERO` */;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------JUANDIEGO-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Table structure for table `personas`
--
DROP TABLE IF EXISTS
  `personas`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `personas` (
    `id` INT NOT NULL auto_increment,
    `nombrecompleto` VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `rol_personas`
--
DROP TABLE IF EXISTS
  `rol_personas`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `rol_personas` (
    `id` INT NOT NULL auto_increment,
    `tiporol` VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `categoria`
--
DROP TABLE IF EXISTS
  `categoria`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `categoria` (
    `id` INT NOT NULL auto_increment,
    `nombrecategoria` VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `productos_personas`
--
DROP TABLE IF EXISTS
  `productos_personas`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `productos_personas` (
    `id` INT NOT NULL auto_increment,
    `id_productos` INT NOT NULL,
    `id_personas` INT NOT NULL,
    `id_rol` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_productos`) REFERENCES PRODUCTOS (`id`),
    FOREIGN KEY (`id_personas`) REFERENCES PERSONAS (`id`),
    FOREIGN KEY (`id_rol`) REFERENCES ROL_PERSONAS (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `productos`
--
DROP TABLE IF EXISTS
  `productos`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `productos` (
    `id` INT NOT NULL auto_increment,
    `titulo` VARCHAR(200) NOT NULL,
    `temporada` VARCHAR(200) NOT NULL,
    `volumen` VARCHAR(200) NOT NULL,
    `descripcioncorta` VARCHAR(60) NOT NULL,
    `descripciondetallada` VARCHAR(200) NOT NULL,
    `precionormal` FLOAT NOT NULL,
    `publicacion` DATE NOT NULL,
    `imagen` VARCHAR(100) NOT NULL,
    `precio` FLOAT NOT NULL,
    `descontinuado` boolean DEFAULT NULL,
    `stock` INT NOT NULL,
    `id_categoria` INT NOT NULL,
    `id_pais` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_categoria`) REFERENCES CATEGORIA (`id`),
    FOREIGN KEY (`id_pais`) REFERENCES PAIS (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `carrito_productos`
--
DROP TABLE IF EXISTS
  `carrito_productos`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `carrito_productos` (
    `id` INT NOT NULL auto_increment,
    `id_productos` INT NOT NULL,
    `id_carrito` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_productos`) REFERENCES PRODUCTOS (`id`),
    FOREIGN KEY (`id_carrito`) REFERENCES CARRITO (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `detalle_factura`
--
DROP TABLE IF EXISTS
  `detalle_factura`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `detalle_factura` (
    `id` INT NOT NULL auto_increment,
    `cantidad` INT NOT NULL,
    `precio` FLOAT DEFAULT NULL,
    `subtotal` FLOAT NOT NULL,
    `oferta` boolean DEFAULT NULL,
    `descuento` FLOAT DEFAULT NULL,
    `id_factura` INT NOT NULL,
    `id_productos` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_factura`) REFERENCES FACTURA (`id`),
    FOREIGN KEY (`id_productos`) REFERENCES PRODUCTOS (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `carrito`
--
DROP TABLE IF EXISTS
  `carrito`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `carrito` (
    `id` INT NOT NULL auto_increment,
    `nombrecompleto` VARCHAR(100) NOT NULL,
    `correoelectronico` VARCHAR(100) NOT NULL,
    `direccion` VARCHAR(100) NOT NULL,
    `numerotelefono` VARCHAR(100) NOT NULL,
    `ciudad` VARCHAR(100) NOT NULL,
    `detallesadicionales` VARCHAR(600) NOT NULL,
    `id_usuario` INT NOT NULL,
    `id_pais` INT NOT NULL,
    `id_provincia` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_usuario`) REFERENCES USUARIO (`id`),
    FOREIGN KEY (`id_pais`) REFERENCES PAIS (`id`),
    FOREIGN KEY (`id_provincia`) REFERENCES PROVINCIA (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------SEBAS-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Table structure for table `estado_factura`
--
DROP TABLE IF EXISTS
  `estado_factura`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `estado_factura` (
    `id` INT NOT NULL auto_increment,
    `nombre` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `modo_pago`
--
DROP TABLE IF EXISTS
  `modo_pago`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `modo_pago` (
    `id` INT NOT NULL auto_increment,
    `nombre` VARCHAR(100) NOT NULL,
    `otrosdetalles` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `pais`
--
DROP TABLE IF EXISTS
  `pais`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `pais` (
    `id` INT NOT NULL auto_increment,
    `nombre` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `provincia`
--
DROP TABLE IF EXISTS
  `provincia`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `provincia` (
    `id` INT NOT NULL auto_increment,
    `nombre` VARCHAR(100) NOT NULL,
    `id_pais` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_pais`) REFERENCES PAIS (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `rol`
--
DROP TABLE IF EXISTS
  `rol`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `rol` (
    `id` INT NOT NULL auto_increment,
    `tiporol` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `usuario`
--
DROP TABLE IF EXISTS
  `usuario`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `usuario` (
    `id` INT NOT NULL auto_increment,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(100) NOT NULL,
    `correoelectronico` VARCHAR(100) NOT NULL,
    `contraseña` VARCHAR(100) NOT NULL,
    `numerotelefono` VARCHAR(100) NOT NULL,
    `id_pais` INT NOT NULL,
    `id_provincia` INT NOT NULL,
    `imagen` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_pais`) REFERENCES PAIS (`id`),
    FOREIGN KEY (`id_provincia`) REFERENCES PROVINCIA (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `rol_usuario`
--
DROP TABLE IF EXISTS
  `rol_usuario`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `rol_usuario` (
    `id` INT NOT NULL auto_increment,
    `fecha` DATETIME NOT NULL,
    `id_usuario` INT NOT NULL,
    `id_rol` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_usuario`) REFERENCES USUARIO (`id`),
    FOREIGN KEY (`id_rol`) REFERENCES ROL (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table `factura`
--
DROP TABLE IF EXISTS
  `factura`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `factura` (
    `id` INT NOT NULL auto_increment,
    `id_usuario` INT NOT NULL,
    `id_estadofactura` INT NOT NULL,
    `envio` VARCHAR(100) NOT NULL,
    `impuesto` INT NOT NULL,
    `total` FLOAT NOT NULL,
    `id_modopago` INT NOT NULL,
    `fecha` DATETIME NOT NULL,
    `nombrecompleto` VARCHAR(100) NOT NULL,
    `correoelectronico` VARCHAR(100) NOT NULL,
    `direccion` VARCHAR(100) NOT NULL,
    `numerotelefono` VARCHAR(100) NOT NULL,
    `id_pais` INT NOT NULL,
    `id_provincia` INT NOT NULL,
    `ciudad` VARCHAR(100) NOT NULL,
    `detalleadicionales` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_usuario`) REFERENCES USUARIO (`id`),
    FOREIGN KEY (`id_estadofactura`) REFERENCES ESTADO_FACTURA (`id`),
    FOREIGN KEY (`id_modopago`) REFERENCES MODO_PAGO (`id`)
  ) engine = innodb DEFAULT charset = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-18 17:36:45