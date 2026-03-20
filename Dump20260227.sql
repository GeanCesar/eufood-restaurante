CREATE DATABASE  IF NOT EXISTS `db_eufood` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_eufood`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: db_eufood
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `tb_cardapio_item_sub_item`
--

DROP TABLE IF EXISTS `tb_cardapio_item_sub_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_cardapio_item_sub_item` (
  `uuid` varchar(255) NOT NULL,
  `uuid_categoria_subitem` varchar(255) DEFAULT NULL,
  `uuid_item_principal` varchar(255) DEFAULT NULL,
  `uuid_sub_item` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FK6avyv9nxygvnqw696xmktdbj` (`uuid_categoria_subitem`),
  KEY `FK496xmxgtnp06xxdmwk2h0vnaq` (`uuid_item_principal`),
  KEY `FKsndv5rxsy7frjisccwns5p6dd` (`uuid_sub_item`),
  CONSTRAINT `FK496xmxgtnp06xxdmwk2h0vnaq` FOREIGN KEY (`uuid_item_principal`) REFERENCES `tb_item_cardapio` (`uuid`),
  CONSTRAINT `FK6avyv9nxygvnqw696xmktdbj` FOREIGN KEY (`uuid_categoria_subitem`) REFERENCES `tb_categoria_sub_item_cardapio` (`uuid`),
  CONSTRAINT `FKsndv5rxsy7frjisccwns5p6dd` FOREIGN KEY (`uuid_sub_item`) REFERENCES `tb_item_cardapio` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cardapio_item_sub_item`
--

LOCK TABLES `tb_cardapio_item_sub_item` WRITE;
/*!40000 ALTER TABLE `tb_cardapio_item_sub_item` DISABLE KEYS */;
INSERT INTO `tb_cardapio_item_sub_item` VALUES ('051c9193-1430-4dfa-ae46-9ec80ac34944','08ef89d2-155a-463f-9a5c-1d6e3feadf1f','a6d0fb50-1d7e-42a0-9ef7-6dfc08de4507','48808635-86b5-4bf4-a415-a5bafdd2001c'),('2764328f-1acf-4dd8-88b7-870ccc8f2996','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','a15e38ee-869f-4ec4-a0f3-a30e1225169b'),('3e000988-5ebc-4ad4-a7ee-e0e61bcaa06e','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','654c7a82-1d4f-4aee-8b38-335f8bbb16aa'),('4da1bf9e-4030-48dc-8de7-3e89cfed3d4b','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','bb7088d3-5920-4d1a-a65c-439a48c94d01'),('5d2b0ab5-43f9-4d18-9c4a-ddbcfe0c9d5c','d650339f-39f1-48ac-850c-53f9f4fe6f38','b461dce3-890e-4184-8bb4-4db4e42f87ed','3f1a7794-24a8-4c55-97e0-f06ff2890eaa'),('617f673c-2b48-4342-823c-7707e26b18d4','d650339f-39f1-48ac-850c-53f9f4fe6f38','b461dce3-890e-4184-8bb4-4db4e42f87ed','4b9daf64-5573-4c07-b585-c4a113077083'),('6b73ce82-3a51-4abb-9eeb-e21fa7c0a50a','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','26049745-7979-4fed-96f8-4ff332064ab0'),('91714b61-f9d0-4741-b89f-4105bad3cc01','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','57223645-099b-4e28-befd-113213c66667'),('91a84ec5-7064-410b-8b88-b384f5429100','08ef89d2-155a-463f-9a5c-1d6e3feadf1f','a6d0fb50-1d7e-42a0-9ef7-6dfc08de4507','fa1a6f00-6c2c-425e-81ae-5cf5759ccc07'),('9cd51f49-e968-4e21-9e5f-09ae60206cbf','08ef89d2-155a-463f-9a5c-1d6e3feadf1f','a6d0fb50-1d7e-42a0-9ef7-6dfc08de4507','ec444429-f776-4b6a-a2a5-cfdf0897f157'),('a1b19f6c-0f79-44ef-8047-73dd5aee938e','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','311b6f67-8cb2-4c01-9184-d3d832453b83'),('a7b41db7-ffda-48a3-8efe-9f85711b4967','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','ee7f87d6-e2fc-457c-a720-2bf68928f7a7'),('b1adc3f7-a79c-4d85-9f65-bd7e1654e57b','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','68cb3d4e-98a9-487a-95f8-9ff977c43c5f'),('c3045a89-3387-40ce-b9d9-a1a9b632e8bc','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','5d2ac6f6-bd96-426c-b283-eeef4f235633'),('f50cfa60-b5dd-4670-8498-fbb2fc9594d1','5269bc95-e547-4b10-af00-8b97f70d8d5e','39e8ce30-dc2d-4597-907b-75d9a2fc6c43','27d383af-e374-4889-b095-c963edbe0c8b');
/*!40000 ALTER TABLE `tb_cardapio_item_sub_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_categoria_item_cardapio`
--

DROP TABLE IF EXISTS `tb_categoria_item_cardapio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_categoria_item_cardapio` (
  `uuid` varchar(255) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `ordem` int NOT NULL,
  `restaurante_uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FKok8v5crcp3rcsk17wehhxdf7w` (`restaurante_uuid`),
  CONSTRAINT `FKok8v5crcp3rcsk17wehhxdf7w` FOREIGN KEY (`restaurante_uuid`) REFERENCES `tb_restaurante` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_categoria_item_cardapio`
--

LOCK TABLES `tb_categoria_item_cardapio` WRITE;
/*!40000 ALTER TABLE `tb_categoria_item_cardapio` DISABLE KEYS */;
INSERT INTO `tb_categoria_item_cardapio` VALUES ('195e39c6-8d56-4a05-96fe-8b378d41d3f2','Acompanhamentos',2,'1d77cd66-78c4-4d7a-847b-242f354f25e9'),('490af147-d4fc-488c-acbe-67a0b571e79c','Sanduiches',1,'1d77cd66-78c4-4d7a-847b-242f354f25e9'),('a605e52f-e0d1-4b9b-9fa9-1e72f1f6d75d','Fresh Burritos',1,'246d99ff-71a3-4ba8-b4e9-adc39dc9fd38');
/*!40000 ALTER TABLE `tb_categoria_item_cardapio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_categoria_sub_item_cardapio`
--

DROP TABLE IF EXISTS `tb_categoria_sub_item_cardapio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_categoria_sub_item_cardapio` (
  `uuid` varchar(255) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `quantidade_maxima` int NOT NULL,
  `quantidade_minima` int NOT NULL,
  `restaurante_uuid` varchar(255) DEFAULT NULL,
  `ordem` int NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FK61f5u2b0u5d5oqic0bwyvdlwb` (`restaurante_uuid`),
  CONSTRAINT `FK61f5u2b0u5d5oqic0bwyvdlwb` FOREIGN KEY (`restaurante_uuid`) REFERENCES `tb_restaurante` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_categoria_sub_item_cardapio`
--

LOCK TABLES `tb_categoria_sub_item_cardapio` WRITE;
/*!40000 ALTER TABLE `tb_categoria_sub_item_cardapio` DISABLE KEYS */;
INSERT INTO `tb_categoria_sub_item_cardapio` VALUES ('08ef89d2-155a-463f-9a5c-1d6e3feadf1f','Escolha o Molho',2,2,'1d77cd66-78c4-4d7a-847b-242f354f25e9',1),('5269bc95-e547-4b10-af00-8b97f70d8d5e','Deseja adicionar algum ingrediente?',7,0,'1d77cd66-78c4-4d7a-847b-242f354f25e9',1),('d650339f-39f1-48ac-850c-53f9f4fe6f38','Selecione: Tortilla',1,1,'246d99ff-71a3-4ba8-b4e9-adc39dc9fd38',1);
/*!40000 ALTER TABLE `tb_categoria_sub_item_cardapio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_item_cardapio`
--

DROP TABLE IF EXISTS `tb_item_cardapio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_item_cardapio` (
  `uuid` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `valor` decimal(38,2) DEFAULT NULL,
  `restaurante_uuid` varchar(255) DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `descricao` text,
  `categoria_uuid` varchar(255) DEFAULT NULL,
  `tipo_item` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FK6ayt4rpb2265qht0bk39ddvdr` (`restaurante_uuid`),
  KEY `FKrlief89boptoxy3ua2rnkby5w_idx` (`categoria_uuid`),
  CONSTRAINT `FK6ayt4rpb2265qht0bk39ddvdr` FOREIGN KEY (`restaurante_uuid`) REFERENCES `tb_restaurante` (`uuid`),
  CONSTRAINT `FKrlief89boptoxy3ua2rnkby5w` FOREIGN KEY (`categoria_uuid`) REFERENCES `tb_categoria_item_cardapio` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_item_cardapio`
--

LOCK TABLES `tb_item_cardapio` WRITE;
/*!40000 ALTER TABLE `tb_item_cardapio` DISABLE KEYS */;
INSERT INTO `tb_item_cardapio` VALUES ('26049745-7979-4fed-96f8-4ff332064ab0','Adicionar: Molho Tasty',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Molho Tasty.png','',NULL,'SUBITEM'),('27d383af-e374-4889-b095-c963edbe0c8b','Adicionar: Carne Chicken',6.50,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Chicken.png','',NULL,'SUBITEM'),('311b6f67-8cb2-4c01-9184-d3d832453b83','Adicionar: Alface',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Alface.png','',NULL,'SUBITEM'),('39e8ce30-dc2d-4597-907b-75d9a2fc6c43','Brabo Brabíssimo Frango',45.90,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Brabo Brabíssimo Frango.png','O novo sanduíche é composto por dois empanados com frango, a méquinese, a exclusiva maionese especial com sabor de carne defumada, molho do Cbo (o saboroso molho emulsionado com especiarias e derivados lácteos), alface, fatias de bacon, queijo processado sabor cheddar, cebola crispy, tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória','490af147-d4fc-488c-acbe-67a0b571e79c','ITEM'),('3ad26f8d-5496-4d54-88ac-89a10ef365d7','McFritas Cheddar Bacon',18.90,'1d77cd66-78c4-4d7a-847b-242f354f25e9','BatatasBacon.png','A batata frita mais famosa do mundo, agora com molho com queijo tipo cheddar e bacon crispy. Não dá para resistir, experimente!','195e39c6-8d56-4a05-96fe-8b378d41d3f2','ITEM'),('3f1a7794-24a8-4c55-97e0-f06ff2890eaa','Tortilla integral',0.00,'246d99ff-71a3-4ba8-b4e9-adc39dc9fd38','Tortilla integral.jpeg','Tortilla legítima de farinha de trigo integral',NULL,'SUBITEM'),('48808635-86b5-4bf4-a415-a5bafdd2001c','Sem Molho',0.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Sem molho.png','',NULL,'SUBITEM'),('4b9daf64-5573-4c07-b585-c4a113077083','Tortilla tradicional',0.00,'246d99ff-71a3-4ba8-b4e9-adc39dc9fd38','Tortilla tradicional.jpeg','Tortilla legítima de farinha de trigo tradicional',NULL,'SUBITEM'),('57223645-099b-4e28-befd-113213c66667','Adicionar: Bacon',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Bacon.png','',NULL,'SUBITEM'),('5d2ac6f6-bd96-426c-b283-eeef4f235633','Adicionar: Fatia Queijo Cheddar',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Queijo Cheedar.png','',NULL,'SUBITEM'),('5db3ebd7-d87d-4586-9279-b77f32facfbb','Adicionar: Queijo sabor Emental',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Emental.png','',NULL,'SUBITEM'),('654c7a82-1d4f-4aee-8b38-335f8bbb16aa','Adicionar: Tomate',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Tomate.png','',NULL,'SUBITEM'),('68cb3d4e-98a9-487a-95f8-9ff977c43c5f','Adicionar: Molho do Cbo',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Molho CBO.png','',NULL,'SUBITEM'),('94ed5e4a-b524-4448-a5f1-cf39b4b3d410','Adicionar: Picles',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Picles.png','',NULL,'SUBITEM'),('a15e38ee-869f-4ec4-a0f3-a30e1225169b','Adicionar: Maionese',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Maionese.png','',NULL,'SUBITEM'),('a6d0fb50-1d7e-42a0-9ef7-6dfc08de4507','Chicken McNuggets 10 unidades',22.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Nuggets.png','Crocantes, leves e deliciosos. Os frangos empanados mais irresistíveis do Mcdonald’s. Composto por 10 unidades','195e39c6-8d56-4a05-96fe-8b378d41d3f2','ITEM'),('b461dce3-890e-4184-8bb4-4db4e42f87ed','Barbacoa Vinaigrette',56.90,'246d99ff-71a3-4ba8-b4e9-adc39dc9fd38','Burrito vinagrete.png','Base de folhas frescas temperadas com nosso molho refrescante Spicy Vinaigrette, com recheio de Barbacoa desfiada, salsa roxa, guacamole e sour cream.','a605e52f-e0d1-4b9b-9fa9-1e72f1f6d75d','ITEM'),('b847c472-9ce4-4c65-acd0-2eb1fa33b0be','Adicionar: Molho lácteo com queijo tipo cheddar',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Molho cheddar.png','',NULL,'SUBITEM'),('bb7088d3-5920-4d1a-a65c-439a48c94d01','Adicionar: Cebola Crispy',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Crispy.png','',NULL,'SUBITEM'),('c61f00b0-72fc-4443-8fa5-521fc1bb9026','Adicionar: Carne 100% Bovina',9.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Carne bovina.png','',NULL,'SUBITEM'),('e0b8a054-dfc2-4e53-8ad1-a71b5f535a6f','Novo Brabo Clubhouse',45.90,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Novo Brabo Clubhouse.png','Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, alface e tomate, fatias de bacon, queijo processado sabor emental, molho especial e cebola ao molho shoyu, tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória!','490af147-d4fc-488c-acbe-67a0b571e79c','ITEM'),('e496d41f-42b7-4a4b-b51b-4e82ffb8ff2f','Duplo Burger Bacon',27.50,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Duplo Burger Baconpng.png','Dois hambúrgueres (100% carne bovina), queijo cheddar, cebola, fatias de bacon, ketchup, mostarda e pão com gergelim','490af147-d4fc-488c-acbe-67a0b571e79c','ITEM'),('e7463e6c-a945-4c90-a1a9-10ec7f8cba89','Mccrispy Chicken Bacon Ranch',36.90,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Mccrispy Chicken Bacon Ranch.png','Composto por pão tipo brioche com batata, o novo molho Ranch (um delicioso molho emulsionado à base de especiarias e creme de leite), bacon em fatias, alface americana, tomate e carne 100% de peito de frango, temperada e empanada','490af147-d4fc-488c-acbe-67a0b571e79c','ITEM'),('ea850f9a-3dab-46c5-98d3-441ad60d71c0','Adicionar: Frango Crispy',7.50,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Frango crispy.png','',NULL,'SUBITEM'),('ebf8f0d7-9530-4ba1-9f90-216656927570','Adicionar: Molho Especial',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Molho especial.png','',NULL,'SUBITEM'),('ec444429-f776-4b6a-a2a5-cfdf0897f157','Molho Ranch',2.50,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Molho Ranch.png','',NULL,'SUBITEM'),('ee7f87d6-e2fc-457c-a720-2bf68928f7a7','Adicionar: Mequinese',3.00,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Molho mequinese.png','',NULL,'SUBITEM'),('fa1a6f00-6c2c-425e-81ae-5cf5759ccc07','Molho Barbecue',2.50,'1d77cd66-78c4-4d7a-847b-242f354f25e9','Molho barbecue.png','',NULL,'SUBITEM');
/*!40000 ALTER TABLE `tb_item_cardapio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_pedido`
--

DROP TABLE IF EXISTS `tb_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_pedido` (
  `uuid` varchar(255) NOT NULL,
  `data_hora` datetime(6) DEFAULT NULL,
  `valor_total` decimal(38,2) DEFAULT NULL,
  `uuid_restaurante` varchar(255) NOT NULL,
  `uuid_usuario` varchar(255) NOT NULL,
  `valor_frete` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FKrlocms8h4douw2e9tkr4ss7ro` (`uuid_restaurante`),
  KEY `FK8h2msn8ac937aif0cj8ic27v9` (`uuid_usuario`),
  CONSTRAINT `FK8h2msn8ac937aif0cj8ic27v9` FOREIGN KEY (`uuid_usuario`) REFERENCES `tb_usuario` (`uuid`),
  CONSTRAINT `FKrlocms8h4douw2e9tkr4ss7ro` FOREIGN KEY (`uuid_restaurante`) REFERENCES `tb_restaurante` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_pedido`
--

LOCK TABLES `tb_pedido` WRITE;
/*!40000 ALTER TABLE `tb_pedido` DISABLE KEYS */;
INSERT INTO `tb_pedido` VALUES ('236a7cff-254f-44a8-8bc5-0203a6b89dde','2026-02-18 13:04:42.796000',26.99,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('3c3fe674-f026-471e-b4c2-761a14fe5ed9','2026-02-19 11:13:02.809000',102.79,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('3f90868f-6f18-49c7-80b8-f3d83e51dbfe','2026-02-11 12:41:02.217000',53.89,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('592dbad6-ace0-49f6-b462-e0189525d0a0','2026-02-10 14:21:38.159000',120.79,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('5ca3c862-2960-4790-bead-b305f164869b','2026-02-19 10:34:02.502000',68.89,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('61ea0b3e-21d2-4516-bebc-478cd6980307','2026-02-10 16:19:13.211000',56.89,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('70b2807b-6711-49fb-97c3-d701c53715e4','2026-02-10 13:52:55.282000',114.79,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('7651757a-cd5a-4022-b767-604e62fe614e','2026-02-10 14:21:00.716000',151.69,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('8760349d-1bf9-4983-870a-24eeed186771','2026-02-10 15:27:45.797000',130.29,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('9f7857f9-9c44-47f8-98b0-06bd9eeb24d2','2026-02-24 15:16:26.453000',75.89,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('c16a2f04-9e31-49ab-89ad-ecb3fc063978','2026-02-11 15:44:54.165000',473.29,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('ce4961ac-c260-41b9-bef9-32332a13e7a9','2026-02-10 15:57:20.834000',72.79,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('db3a9d12-b0c3-40d3-8587-19a316019e8e','2026-02-10 15:11:05.890000',53.89,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('e216961d-fa8c-475a-9e84-6902a4021cc1','2026-02-10 13:55:16.972000',108.79,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('e9a278df-9d2a-4f07-8a1a-1174142b3efe','2026-02-11 15:49:30.211000',26.99,'1d77cd66-78c4-4d7a-847b-242f354f25e9','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99),('f3de97a2-d136-4141-81c3-ca4f1bd3fd38','2026-02-18 13:03:29.149000',61.89,'246d99ff-71a3-4ba8-b4e9-adc39dc9fd38','ebb8c0e0-673e-4b60-9be8-6541c0047b5a',4.99);
/*!40000 ALTER TABLE `tb_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_pedido_item`
--

DROP TABLE IF EXISTS `tb_pedido_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_pedido_item` (
  `uuid` varchar(255) NOT NULL,
  `desconto` decimal(38,2) DEFAULT NULL,
  `preco` decimal(38,2) DEFAULT NULL,
  `quantidade` decimal(38,2) DEFAULT NULL,
  `uuid_item` varchar(255) DEFAULT NULL,
  `valor_total` decimal(38,2) DEFAULT NULL,
  `uuid_pedido` varchar(255) NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FK47lmsw3yt8iix47wh3tlh833b` (`uuid_pedido`),
  CONSTRAINT `FK47lmsw3yt8iix47wh3tlh833b` FOREIGN KEY (`uuid_pedido`) REFERENCES `tb_pedido` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_pedido_item`
--

LOCK TABLES `tb_pedido_item` WRITE;
/*!40000 ALTER TABLE `tb_pedido_item` DISABLE KEYS */;
INSERT INTO `tb_pedido_item` VALUES ('00a964f4-3c52-4666-beff-79a4be7890a7',0.00,18.90,1.00,'3ad26f8d-5496-4d54-88ac-89a10ef365d7',18.90,'ce4961ac-c260-41b9-bef9-32332a13e7a9'),('0f2157a1-76d4-412a-893f-962cf142278f',0.00,22.00,1.00,'a6d0fb50-1d7e-42a0-9ef7-6dfc08de4507',22.00,'236a7cff-254f-44a8-8bc5-0203a6b89dde'),('14d5f3b3-8c22-4c2d-942d-b2675a616629',0.00,22.00,1.00,'a6d0fb50-1d7e-42a0-9ef7-6dfc08de4507',22.00,'9f7857f9-9c44-47f8-98b0-06bd9eeb24d2'),('407b50ee-cd1d-4e6a-b128-f14e47ae0fe8',0.00,45.90,1.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',48.90,'9f7857f9-9c44-47f8-98b0-06bd9eeb24d2'),('4158a816-6048-4b96-b753-de06b893b737',0.00,45.90,1.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',51.90,'61ea0b3e-21d2-4516-bebc-478cd6980307'),('4217ab51-b483-412b-bf6b-a4d12066ac8c',0.00,45.90,7.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',468.30,'c16a2f04-9e31-49ab-89ad-ecb3fc063978'),('43557e23-db16-4794-9c71-7162dafd4a12',0.00,45.90,2.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',115.80,'592dbad6-ace0-49f6-b462-e0189525d0a0'),('593d2957-4709-46b8-a137-cad10dc61e7f',0.00,45.90,2.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',109.80,'70b2807b-6711-49fb-97c3-d701c53715e4'),('5e2dac72-5dd1-4db0-a426-904bcc2c3281',0.00,56.90,1.00,'b461dce3-890e-4184-8bb4-4db4e42f87ed',56.90,'f3de97a2-d136-4141-81c3-ca4f1bd3fd38'),('5f2bbea8-789c-4374-98d8-424e491dcceb',0.00,45.90,1.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',54.90,'8760349d-1bf9-4983-870a-24eeed186771'),('6e578583-bcca-4346-80e9-0eeeb3b142a2',0.00,45.90,2.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',97.80,'3c3fe674-f026-471e-b4c2-761a14fe5ed9'),('6f3128f9-a50a-445e-9bf8-b0c16b3c7db1',0.00,45.90,1.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',63.90,'5ca3c862-2960-4790-bead-b305f164869b'),('8f293a72-8315-4d6a-96c9-20bf6fd5f88a',0.00,45.90,1.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',48.90,'3f90868f-6f18-49c7-80b8-f3d83e51dbfe'),('92de2498-1d02-4f4f-94c9-12871c184a27',0.00,45.90,2.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',103.80,'e216961d-fa8c-475a-9e84-6902a4021cc1'),('caaedf72-2418-4be1-bc50-cdea70bb5442',0.00,45.90,3.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',146.70,'7651757a-cd5a-4022-b767-604e62fe614e'),('e48444d9-dbad-4b2f-a212-0861fb77b8f6',0.00,45.90,1.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',48.90,'db3a9d12-b0c3-40d3-8587-19a316019e8e'),('e6f43101-a53a-4b20-9414-2ae868254418',0.00,22.00,1.00,'a6d0fb50-1d7e-42a0-9ef7-6dfc08de4507',24.50,'8760349d-1bf9-4983-870a-24eeed186771'),('ecb2cb84-66bb-4d64-9000-895cffe2c1d3',0.00,45.90,1.00,'e0b8a054-dfc2-4e53-8ad1-a71b5f535a6f',45.90,'8760349d-1bf9-4983-870a-24eeed186771'),('ef3a97f4-be35-4ddf-afa9-42df95028313',0.00,45.90,1.00,'39e8ce30-dc2d-4597-907b-75d9a2fc6c43',48.90,'ce4961ac-c260-41b9-bef9-32332a13e7a9'),('f85f3109-2953-420e-a76f-d2eb6a931bcd',0.00,22.00,1.00,'a6d0fb50-1d7e-42a0-9ef7-6dfc08de4507',22.00,'e9a278df-9d2a-4f07-8a1a-1174142b3efe');
/*!40000 ALTER TABLE `tb_pedido_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_pedido_status`
--

DROP TABLE IF EXISTS `tb_pedido_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_pedido_status` (
  `uuid` varchar(255) NOT NULL,
  `data_hora` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `uuid_pedido` varchar(255) NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FKmyvwj8i7ddr1tk4u40hg09i2` (`uuid_pedido`),
  CONSTRAINT `FKmyvwj8i7ddr1tk4u40hg09i2` FOREIGN KEY (`uuid_pedido`) REFERENCES `tb_pedido` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_pedido_status`
--

LOCK TABLES `tb_pedido_status` WRITE;
/*!40000 ALTER TABLE `tb_pedido_status` DISABLE KEYS */;
INSERT INTO `tb_pedido_status` VALUES ('23af7e79-3109-4956-8025-1978d521b4cd','2026-02-10 14:21:38.159000','AGUARDANDO_PAGAMENTO','592dbad6-ace0-49f6-b462-e0189525d0a0'),('28cebdf6-506a-41f1-8969-70f68c7623d0','2026-02-10 15:57:20.834000','AGUARDANDO_PAGAMENTO','ce4961ac-c260-41b9-bef9-32332a13e7a9'),('29adb6b7-b9d8-4461-92bf-ce404d61ec20','2026-02-18 13:03:29.149000','AGUARDANDO_PAGAMENTO','f3de97a2-d136-4141-81c3-ca4f1bd3fd38'),('31b055e6-7dfc-44c7-90f1-cf20018edaf1','2026-02-24 15:16:26.453000','AGUARDANDO_PAGAMENTO','9f7857f9-9c44-47f8-98b0-06bd9eeb24d2'),('43a992b0-8df9-4ea4-9f79-23395fa46bba','2026-02-11 15:49:30.211000','AGUARDANDO_PAGAMENTO','e9a278df-9d2a-4f07-8a1a-1174142b3efe'),('6af35c23-cc85-40e7-8008-91c06a10a128','2026-02-10 15:11:05.890000','AGUARDANDO_PAGAMENTO','db3a9d12-b0c3-40d3-8587-19a316019e8e'),('79ecdfc4-2e30-4ce7-939f-708e088273b8','2026-02-19 11:13:02.809000','AGUARDANDO_PAGAMENTO','3c3fe674-f026-471e-b4c2-761a14fe5ed9'),('984b34e8-c3cb-4799-ad74-553b1b0baf0e','2026-02-10 13:52:55.282000','AGUARDANDO_PAGAMENTO','70b2807b-6711-49fb-97c3-d701c53715e4'),('b361d34c-c181-4fec-a1a8-ff01319c65cb','2026-02-10 14:21:00.716000','AGUARDANDO_PAGAMENTO','7651757a-cd5a-4022-b767-604e62fe614e'),('b53e9f41-7ad2-420b-b9ee-c3eafa5dd8d7','2026-02-10 13:55:16.972000','AGUARDANDO_PAGAMENTO','e216961d-fa8c-475a-9e84-6902a4021cc1'),('b77461ee-4fbb-43f3-952f-42fc1b71b388','2026-02-18 13:04:42.796000','AGUARDANDO_PAGAMENTO','236a7cff-254f-44a8-8bc5-0203a6b89dde'),('c2e54ff8-05da-4cb5-9ba1-3c0bad3d54ca','2026-02-10 15:27:45.797000','AGUARDANDO_PAGAMENTO','8760349d-1bf9-4983-870a-24eeed186771'),('c48c30fa-2ebd-4620-a9b3-e36a402a7f1d','2026-02-19 10:34:02.502000','AGUARDANDO_PAGAMENTO','5ca3c862-2960-4790-bead-b305f164869b'),('e7bb7d42-2069-495c-a38c-5c4ddaba6bc9','2026-02-11 15:44:54.165000','AGUARDANDO_PAGAMENTO','c16a2f04-9e31-49ab-89ad-ecb3fc063978'),('ed2bd09b-a902-45c1-9dfd-17bddd15df0f','2026-02-11 12:41:02.217000','AGUARDANDO_PAGAMENTO','3f90868f-6f18-49c7-80b8-f3d83e51dbfe'),('f090d775-49c3-4920-a67d-403d7ddaa35b','2026-02-10 16:19:13.211000','AGUARDANDO_PAGAMENTO','61ea0b3e-21d2-4516-bebc-478cd6980307');
/*!40000 ALTER TABLE `tb_pedido_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_pedido_sub_item`
--

DROP TABLE IF EXISTS `tb_pedido_sub_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_pedido_sub_item` (
  `uuid` varchar(255) NOT NULL,
  `preco` decimal(38,2) DEFAULT NULL,
  `quantidade` decimal(38,2) DEFAULT NULL,
  `uuid_item` varchar(255) DEFAULT NULL,
  `valor_total` decimal(38,2) DEFAULT NULL,
  `uuid_item_principal` varchar(255) NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FK10a5obtixyub92nwjdqv5wkkw` (`uuid_item_principal`),
  CONSTRAINT `FK10a5obtixyub92nwjdqv5wkkw` FOREIGN KEY (`uuid_item_principal`) REFERENCES `tb_pedido_item` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_pedido_sub_item`
--

LOCK TABLES `tb_pedido_sub_item` WRITE;
/*!40000 ALTER TABLE `tb_pedido_sub_item` DISABLE KEYS */;
INSERT INTO `tb_pedido_sub_item` VALUES ('09bc0b53-d57a-4769-b014-f3eba01c6a32',0.00,2.00,'48808635-86b5-4bf4-a415-a5bafdd2001c',0.00,'0f2157a1-76d4-412a-893f-962cf142278f'),('1332dbf6-a542-4583-934d-c3e6d9caacd9',3.00,1.00,'654c7a82-1d4f-4aee-8b38-335f8bbb16aa',3.00,'593d2957-4709-46b8-a137-cad10dc61e7f'),('18e46857-82a5-4a15-8d6a-0be0ae85dffb',3.00,6.00,'a15e38ee-869f-4ec4-a0f3-a30e1225169b',18.00,'6f3128f9-a50a-445e-9bf8-b0c16b3c7db1'),('271dce1f-2b54-48ca-b2da-33d3ce2bf8ac',3.00,1.00,'654c7a82-1d4f-4aee-8b38-335f8bbb16aa',3.00,'4158a816-6048-4b96-b753-de06b893b737'),('2fbeacab-b701-4557-b225-f1f161a00008',3.00,1.00,'a15e38ee-869f-4ec4-a0f3-a30e1225169b',3.00,'4158a816-6048-4b96-b753-de06b893b737'),('318ef251-ebae-4b56-89d9-21539b143b82',0.00,1.00,'48808635-86b5-4bf4-a415-a5bafdd2001c',0.00,'e6f43101-a53a-4b20-9414-2ae868254418'),('3fca1bc2-6e16-422a-a597-8dce6cadc093',3.00,1.00,'654c7a82-1d4f-4aee-8b38-335f8bbb16aa',3.00,'ef3a97f4-be35-4ddf-afa9-42df95028313'),('5437a8c4-4d3b-43cf-b534-f71a550e0860',0.00,1.00,'4b9daf64-5573-4c07-b585-c4a113077083',0.00,'5e2dac72-5dd1-4db0-a426-904bcc2c3281'),('54bae8ab-e068-4be5-ade7-9002ed237221',3.00,3.00,'654c7a82-1d4f-4aee-8b38-335f8bbb16aa',9.00,'4217ab51-b483-412b-bf6b-a4d12066ac8c'),('5e8bf4f4-48f3-4959-8bd4-a9c423dc1676',3.00,1.00,'a15e38ee-869f-4ec4-a0f3-a30e1225169b',3.00,'8f293a72-8315-4d6a-96c9-20bf6fd5f88a'),('627da7ac-e5e9-4123-91c2-e37a0ab8474c',3.00,3.00,'a15e38ee-869f-4ec4-a0f3-a30e1225169b',9.00,'5f2bbea8-789c-4374-98d8-424e491dcceb'),('65317d2a-0e16-466c-9dd6-255834c14cda',3.00,1.00,'a15e38ee-869f-4ec4-a0f3-a30e1225169b',3.00,'407b50ee-cd1d-4e6a-b128-f14e47ae0fe8'),('665e5b2a-2eee-43aa-bb45-da678c2aea8f',3.00,1.00,'a15e38ee-869f-4ec4-a0f3-a30e1225169b',3.00,'e48444d9-dbad-4b2f-a212-0861fb77b8f6'),('7be1ba7b-94e0-4587-afc0-069305ba2d4f',3.00,2.00,'26049745-7979-4fed-96f8-4ff332064ab0',6.00,'92de2498-1d02-4f4f-94c9-12871c184a27'),('9b2e4ea3-ae2f-4a92-8dd8-acd44a81731e',3.00,2.00,'a15e38ee-869f-4ec4-a0f3-a30e1225169b',6.00,'593d2957-4709-46b8-a137-cad10dc61e7f'),('9d8d7b75-7e90-4eb6-bd0f-4827475c3eb7',2.50,1.00,'ec444429-f776-4b6a-a2a5-cfdf0897f157',2.50,'e6f43101-a53a-4b20-9414-2ae868254418'),('a766e604-eb0e-4a7a-861a-75b895c6e383',0.00,2.00,'48808635-86b5-4bf4-a415-a5bafdd2001c',0.00,'f85f3109-2953-420e-a76f-d2eb6a931bcd'),('c88333fb-e168-478b-b447-890866456424',3.00,4.00,'a15e38ee-869f-4ec4-a0f3-a30e1225169b',12.00,'4217ab51-b483-412b-bf6b-a4d12066ac8c'),('c9d37686-11d4-4d3c-a8fb-3a99d9466adc',3.00,1.00,'a15e38ee-869f-4ec4-a0f3-a30e1225169b',3.00,'6e578583-bcca-4346-80e9-0eeeb3b142a2'),('d21750d6-ef88-48e0-90d4-fd4e0dfdcae4',3.00,4.00,'654c7a82-1d4f-4aee-8b38-335f8bbb16aa',12.00,'43557e23-db16-4794-9c71-7162dafd4a12'),('fc090137-ea1a-4c02-be71-01fb7b116587',0.00,2.00,'48808635-86b5-4bf4-a415-a5bafdd2001c',0.00,'14d5f3b3-8c22-4c2d-942d-b2675a616629'),('fef10708-a5c0-4cb8-8f3e-1904737dcfbc',3.00,1.00,'26049745-7979-4fed-96f8-4ff332064ab0',3.00,'caaedf72-2418-4be1-bc50-cdea70bb5442');
/*!40000 ALTER TABLE `tb_pedido_sub_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_restaurante`
--

DROP TABLE IF EXISTS `tb_restaurante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_restaurante` (
  `uuid` varchar(255) NOT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `usuario_uuid` varchar(255) DEFAULT NULL,
  `imagem_perfil` varchar(255) DEFAULT NULL,
  `imagem_capa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FKjocvk7srht3yybjv6he3sy35b` (`usuario_uuid`),
  CONSTRAINT `FKjocvk7srht3yybjv6he3sy35b` FOREIGN KEY (`usuario_uuid`) REFERENCES `tb_usuario` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_restaurante`
--

LOCK TABLES `tb_restaurante` WRITE;
/*!40000 ALTER TABLE `tb_restaurante` DISABLE KEYS */;
INSERT INTO `tb_restaurante` VALUES ('1d77cd66-78c4-4d7a-847b-242f354f25e9',NULL,'McDonald\'s','918982e1-87bb-42bf-bd23-ff8a9066d297','202408251256_DWBA.png','capa.png'),('246d99ff-71a3-4ba8-b4e9-adc39dc9fd38',NULL,'Guaco Vila Mariana','918982e1-87bb-42bf-bd23-ff8a9066d297','Guaco.jpg',NULL),('71534479-25a2-493b-a84e-ad69dd2ed94a',NULL,'Mana Poke','918982e1-87bb-42bf-bd23-ff8a9066d297','mana_poke.jpg',NULL),('d0da06db-1a22-440f-bc12-876af39cc086',NULL,'Habibs','918982e1-87bb-42bf-bd23-ff8a9066d297','Habibs.jpg',NULL);
/*!40000 ALTER TABLE `tb_restaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario`
--

DROP TABLE IF EXISTS `tb_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuario` (
  `uuid` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `ultimo_login` datetime(6) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `UKotubkl566p8beblhen4sg5op0` (`telefone`),
  UNIQUE KEY `UKspmnyb4dsul95fjmr5kmdmvub` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario`
--

LOCK TABLES `tb_usuario` WRITE;
/*!40000 ALTER TABLE `tb_usuario` DISABLE KEYS */;
INSERT INTO `tb_usuario` VALUES ('87dd3e72-266f-4035-80c7-a81f9039ebf9','Gean Cesar P','$2a$10$sxig7IpotsEEZYW3wpLmfemVeCnCBBu/sMtPXQKSq6.97El01BAJW','11971233112','2026-01-23 16:58:48.635000','USUARIO',NULL),('918982e1-87bb-42bf-bd23-ff8a9066d297','Zé','$2a$10$68qcBvJZ3xieU/5mOb5b8elLnJBXKKwXlcZWLcEI2lMN/lGaJfR7a','11123456789','2026-02-27 14:55:15.081000','RESTAURANTE',NULL),('ebb8c0e0-673e-4b60-9be8-6541c0047b5a','Gean Cesar','$2a$10$y5hTm.19e/9cz.molIfJ5O/4PcfdEFo.g6AmgW2rRNQc.XOB4eZn.','11971233111','2026-02-26 16:59:30.009000','ADMIN',NULL);
/*!40000 ALTER TABLE `tb_usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-27 16:50:02
