CREATE DATABASE
  IF NOT EXISTS `eComic_db`
  /*!40100 DEFAULT CHARACTER SET latin1 */
;

USE
  `eComic_db`;

-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
-- Host: localhost    Database: eComic_db
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8 */
;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE=`+00:00` */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=`NO_AUTO_VALUE_ON_ZERO` */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

-- ------------------------JUANDIEGO-------------------------------------------
-- Table structure for table `personas`
DROP TABLE
  IF EXISTS `personas`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `personas` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombrecompleto` varchar(200) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `rol_personas`
DROP TABLE
  IF EXISTS `rol_personas`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `rol_personas` (
    `id` int NOT NULL AUTO_INCREMENT,
    `tiporol` varchar(200) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `categoria`
DROP TABLE
  IF EXISTS `categoria`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `categoria` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombrecategoria` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `productos_personas`
DROP TABLE
  IF EXISTS `productos_personas`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `productos_personas` (
    `id` int NOT NULL AUTO_INCREMENT,
    `id_productos` int NOT NULL,
    `id_personas` int NOT NULL,
    `id_rol` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_productos`) REFERENCES productos (`id`),
    FOREIGN KEY (`id_personas`) REFERENCES personas (`id`),
    FOREIGN KEY (`id_rol`) REFERENCES rol_personas (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `productos`
DROP TABLE
  IF EXISTS `productos`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `productos` (
    `id` int NOT NULL AUTO_INCREMENT,
    `titulo` varchar(200) NOT NULL,
    `temporada` varchar(200) NOT NULL,
    `volumen` varchar(200) NOT NULL,
    `descripcioncorta` varchar(60) NOT NULL,
    `descripciondetallada` varchar(200) NOT NULL,
    `precionormal` float NOT NULL,
    `publicacion` date NOT NULL,
    `imagen` varchar(100) NOT NULL,
    `precio` float NOT NULL,
    `descontinuado` boolean DEFAULT NULL,
    `stock` int NOT NULL,
    `id_categoria` int NOT NULL,
    `id_pais` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_categoria`) REFERENCES categoria (`id`),
    FOREIGN KEY (`id_pais`) REFERENCES pais (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `carrito_productos`
DROP TABLE
  IF EXISTS `carrito_productos`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `carrito_productos` (
    `id` int NOT NULL AUTO_INCREMENT,
    `id_productos` int NOT NULL,
    `id_carrito` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_productos`) REFERENCES productos (`id`),
    FOREIGN KEY (`id_carrito`) REFERENCES carrito (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `detalle_factura`
DROP TABLE
  IF EXISTS `detalle_factura`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `detalle_factura` (
    `id` int NOT NULL AUTO_INCREMENT,
    `cantidad` int NOT NULL,
    `precio` float DEFAULT NULL,
    `subtotal` float NOT NULL,
    `oferta` boolean DEFAULT NULL,
    `descuento` float DEFAULT NULL,
    `id_factura` int NOT NULL,
    `id_productos` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_factura`) REFERENCES factura (`id`),
    FOREIGN KEY (`id_productos`) REFERENCES productos (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `carrito`
DROP TABLE
  IF EXISTS `carrito`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `carrito` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombrecompleto` varchar(100) NOT NULL,
    `correoelectronico` varchar(100) NOT NULL,
    `direccion` varchar(100) NOT NULL,
    `numerotelefono` varchar(100) NOT NULL,
    `ciudad` varchar(100) NOT NULL,
    `detallesadicionales` varchar(600) NOT NULL,
    `id_usuario` int NOT NULL,
    `id_pais` int NOT NULL,
    `id_provincia` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_usuario`) REFERENCES usuario (`id`),
    FOREIGN KEY (`id_pais`) REFERENCES pais (`id`),
    FOREIGN KEY (`id_provincia`) REFERENCES provincia (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- ------------------------SEBAS-------------------------------------------
-- Table structure for table `estado_factura`
DROP TABLE
  IF EXISTS `estado_factura`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `estado_factura` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `modo_pago`
DROP TABLE
  IF EXISTS `modo_pago`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `modo_pago` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `otrosdetalles` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `pais`
DROP TABLE
  IF EXISTS `pais`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `pais` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `provincia`
DROP TABLE
  IF EXISTS `provincia`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `provincia` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `id_pais` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_pais`) REFERENCES pais (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `rol`
DROP TABLE
  IF EXISTS `rol`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `rol` (
    `id` int NOT NULL AUTO_INCREMENT,
    `tiporol` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `usuario`
DROP TABLE
  IF EXISTS `usuario`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `usuario` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `apellido` varchar(100) NOT NULL,
    `correoelectronico` varchar(100) NOT NULL,
    `contraseña` varchar(100) NOT NULL,
    `numerotelefono` varchar(100) NOT NULL,
    `id_pais` int NOT NULL,
    `id_provincia` int NOT NULL,
    `imagen` varchar(50) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`id_pais`) REFERENCES pais(`id`),
    FOREIGN KEY(`id_provincia`) REFERENCES provincia(`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `rol_usuario`
DROP TABLE
  IF EXISTS `rol_usuario`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `rol_usuario` (
    `id` int NOT NULL AUTO_INCREMENT,
    `fecha` datetime NOT NULL,
    `id_usuario` int NOT NULL,
    `id_rol` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`id_usuario`) REFERENCES usuario(`id`),
    FOREIGN KEY(`id_rol`) REFERENCES rol(`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

-- Table structure for table `factura`
DROP TABLE
  IF EXISTS `factura`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!40101 SET character_set_client = utf8 */
;

CREATE TABLE
  `factura` (
    `id` int NOT NULL AUTO_INCREMENT,
    `id_usuario` int NOT NULL,
    `id_estadofactura` int NOT NULL,
    `envio` varchar(100) NOT NULL,
    `impuesto` int NOT NULL,
    `total` float NOT NULL,
    `id_modopago` int NOT NULL,
    `fecha` datetime NOT NULL,
    `nombrecompleto` varchar(100) NOT NULL,
    `correoelectronico` varchar(100) NOT NULL,
    `direccion` varchar(100) NOT NULL,
    `numerotelefono` varchar(100) NOT NULL,
    `id_pais` int NOT NULL,
    `id_provincia` int NOT NULL,
    `ciudad` varchar(100) NOT NULL,
    `detalleadicionales` varchar(200) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`id_usuario`) REFERENCES usuario(`id`),
    FOREIGN KEY(`id_estadofactura`) REFERENCES estado_factura(`id`),
    FOREIGN KEY(`id_modopago`) REFERENCES modo_pago(`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2019-12-18 17:36:45