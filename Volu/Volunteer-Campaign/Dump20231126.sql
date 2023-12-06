-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: volunteer_campaign_management
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `campaign_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `current_Status_id` int DEFAULT NULL,
  PRIMARY KEY (`campaign_id`),
  KEY `FK9p2rpfp74kqw8tqek8xn3t042` (`current_Status_id`),
  CONSTRAINT `campaign_ibfk_1` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`),
  CONSTRAINT `FK9p2rpfp74kqw8tqek8xn3t042` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (1,'Mùa hè Xanh năm 2019','2019-07-07','2019-07-18','hello 2','Sự kiện 1','Xã Thanh Đức - Huyện Thanh Chương',1),(2,'Mùa hè Xanh năm 2020','2020-07-11','2020-07-23','','Sự kiện 2','Xã Châu Tiến - Huyện Quỳ Hợp',3),(3,'Mùa hè Xanh năm 2022','2022-07-18','2022-07-29','','Sự kiện 3','Xã Nga My - Huyện Tương Dương',3),(4,'Mùa hè Xanh năm 2023','2023-07-27','2023-08-07','hello','','Xã Bắc Sơn - Huyện Quỳ Hợp',3);
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `current_status`
--

DROP TABLE IF EXISTS `current_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_status` (
  `current_Status_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`current_Status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_status`
--

LOCK TABLES `current_status` WRITE;
/*!40000 ALTER TABLE `current_status` DISABLE KEYS */;
INSERT INTO `current_status` VALUES (1,'bắt đầu','trạng thái mới bắt đầu'),(2,'chưa hoàn thành','những công việc chưa hoàn thành'),(3,'hoàn thành','những công việc đã hoàn thành');
/*!40000 ALTER TABLE `current_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'ban kế hoạch','Tìm kiếm các chương trình, chiến dịch hay mô hình tình nguyện phù hợp với Đội trong quá trình hoạt động.\n'),(2,'ban truyền thông&sự kiện','nhiệm vụ thông tin liên lạc và tuyên truyền trong và ngoài Đội, trách  nhiệm chính là xây dựng và đảm bảo hình ảnh của Đội thông qua các hình thức truyền thông khác nhau.\nThực hiện nhiệm vụ chính là tổ chức các hoạt động, chương trình, sự kiện của Đội.'),(3,'ban hậu cần','Chịu trách nhiệm về các hoạt động văn thể, học tập, đời sống, nhận và giải đáp thắc mắc các vấn đề được đưa ra của các thành viên.');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donors`
--

DROP TABLE IF EXISTS `donors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donors` (
  `donor_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `image` text NOT NULL,
  `amount` decimal(19,4) NOT NULL,
  `donate_date` date NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `campaign_id` int NOT NULL,
  PRIMARY KEY (`donor_id`),
  KEY `campaign_id` (`campaign_id`),
  CONSTRAINT `donors_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donors`
--

LOCK TABLES `donors` WRITE;
/*!40000 ALTER TABLE `donors` DISABLE KEYS */;
INSERT INTO `donors` VALUES (1,'Lê Phùng Thành 12','',1000000.0000,'2023-07-28','ủng hộ chiến dịch mùa hè xanh',4),(2,'Phan Văn Tân','',1000000.0000,'2023-07-28','ủng hộ chiến dịch mùa hè xanh',4),(3,'ádfsadf','',100000000.0000,'2023-11-08','sdf',1);
/*!40000 ALTER TABLE `donors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financialreport`
--

DROP TABLE IF EXISTS `financialreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financialreport` (
  `financialreport_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `amount` decimal(19,4) NOT NULL,
  `total_expenses` decimal(19,4) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` date NOT NULL,
  `note` text NOT NULL,
  `campaign_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`financialreport_id`),
  KEY `campaign_id` (`campaign_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `financialreport_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`),
  CONSTRAINT `financialreport_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financialreport`
--

LOCK TABLES `financialreport` WRITE;
/*!40000 ALTER TABLE `financialreport` DISABLE KEYS */;
INSERT INTO `financialreport` VALUES (1,'mua thuốc 1',10000000.0000,20000000.0000,'cần mua để khám phát thuốc miễn phí cho 100 người nghèo','2023-08-01','note12',4,3),(2,'mua dụng cụ lao động',10000000.0000,20000000.0000,'cần mua để khám phát thuốc miễn phí cho 100 người nghèo','2023-08-01','note1',4,2),(3,'tiền xe di chuyển',10000000.0000,30000000.0000,'tiền xe di chuyển từ hà nội đến địa điểm tình nguyện đã thuê 5 xe ô tô lớn','2023-07-27','note1',4,3),(7,'Tên báo cáo tài chính',10000000.0000,10000000.0000,'mô tả','2023-11-08','Ghi chú',2,2),(11,'ádf',100000000.0000,1000000000.0000,'sdfsdf','2023-11-08','ádfsdaf',1,2);
/*!40000 ALTER TABLE `financialreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generalreport`
--

DROP TABLE IF EXISTS `generalreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generalreport` (
  `generalreport_id` int NOT NULL AUTO_INCREMENT,
  `attachment` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `campaign_id` int NOT NULL,
  `current_Status_id` int NOT NULL,
  PRIMARY KEY (`generalreport_id`),
  KEY `campaign_id` (`campaign_id`),
  KEY `FK3ddfod1qrmwf3y3nwvhjshilh` (`current_Status_id`),
  CONSTRAINT `FK3ddfod1qrmwf3y3nwvhjshilh` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`),
  CONSTRAINT `generalreport_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`),
  CONSTRAINT `generalreport_ibfk_2` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generalreport`
--

LOCK TABLES `generalreport` WRITE;
/*!40000 ALTER TABLE `generalreport` DISABLE KEYS */;
INSERT INTO `generalreport` VALUES (1,'sss','2019-07-18',2,3),(2,'','2020-07-23',2,3),(3,'','2022-07-29',3,3),(4,'','2023-08-07',4,3),(5,'dd','2023-11-26',1,1);
/*!40000 ALTER TABLE `generalreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issues` (
  `issue_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `priority` tinyint(1) NOT NULL,
  `assignee` text NOT NULL,
  `due_date` date NOT NULL,
  `current_Status_id` int NOT NULL,
  `user_id` int NOT NULL,
  `taskreport_id` int NOT NULL,
  PRIMARY KEY (`issue_id`),
  KEY `user_id` (`user_id`),
  KEY `taskreport_id` (`taskreport_id`),
  KEY `FKtd40d8dg6c23i9ia6vxx6gnwm` (`current_Status_id`),
  CONSTRAINT `FKtd40d8dg6c23i9ia6vxx6gnwm` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`),
  CONSTRAINT `issues_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `issues_ibfk_2` FOREIGN KEY (`taskreport_id`) REFERENCES `taskreport` (`taskreport_id`),
  CONSTRAINT `issues_ibfk_3` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues`
--

LOCK TABLES `issues` WRITE;
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
INSERT INTO `issues` VALUES (1,'thiếu ngân sách','không đủ ngân sách để thực hiện mua thuốc phát như dự kiến',1,'ban kế hoạch','2019-07-15',3,5,1),(2,'thiếu tình nguyện viện','không đủ tình nguyện viên dự kiến',2,'ban kế hoạch','2023-07-25',3,3,2);
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `media_id` int NOT NULL AUTO_INCREMENT,
  `campaign_id` int NOT NULL,
  `image` text NOT NULL,
  `video` varchar(255) NOT NULL,
  PRIMARY KEY (`media_id`),
  KEY `campaign_id` (`campaign_id`),
  CONSTRAINT `media_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_entity`
--

DROP TABLE IF EXISTS `media_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_entity` (
  `media_id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`media_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_entity`
--

LOCK TABLES `media_entity` WRITE;
/*!40000 ALTER TABLE `media_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `media_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestiones`
--

DROP TABLE IF EXISTS `milestiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milestiones` (
  `milestione_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_at` date NOT NULL,
  `end_date` date NOT NULL,
  `campaign_id` int NOT NULL,
  `current_Status_id` int NOT NULL,
  PRIMARY KEY (`milestione_id`),
  KEY `campaign_id` (`campaign_id`),
  KEY `FKr10eibavrm9c250ba5qlvgdh3` (`current_Status_id`),
  CONSTRAINT `FKr10eibavrm9c250ba5qlvgdh3` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`),
  CONSTRAINT `milestiones_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`),
  CONSTRAINT `milestiones_ibfk_2` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestiones`
--

LOCK TABLES `milestiones` WRITE;
/*!40000 ALTER TABLE `milestiones` DISABLE KEYS */;
INSERT INTO `milestiones` VALUES (1,'khởi tạo chiến dịch','Bắt đầu các cuộc họp, lên ý kiến,ý tưởng,phân công công việc trong chiến dịch','2023-07-20','2023-07-27',4,3),(2,'Thực hiện chiến dịch','Đến địa điểm thực hiện, thực hiện các task được giao trong chiến dịch ','2023-07-27','2023-08-01',4,3),(3,'kết thúc chiến dịch','Tổng kết chiến dịch và khen thưởng','2023-08-02','2023-08-07',4,3),(5,'ấdf','ádfdf','2023-11-08','2023-11-22',1,1),(6,'sdfsf','skdjf','2023-11-15','2023-11-23',1,2),(7,'kết thúc chiến dịch','Tổng kết chiến dịch và khen thưởng','2023-08-12','2023-08-07',4,3),(8,'kết thúc chiến dịch','Tổng kết chiến dịch và khen thưởng','2023-08-12','2023-08-07',4,3),(9,'kết thúc chiến dịch','Tổng kết chiến dịch và khen thưởng','2023-08-12','2023-08-07',4,3),(10,'kết thúc chiến dịch','Tổng kết chiến dịch và khen thưởng','2023-08-12','2023-08-07',4,3),(11,'kết thúc chiến dịch','Tổng kết chiến dịch và khen thưởng','2023-08-12','2023-08-07',4,3),(12,'kết thúc chiến dịch','Tổng kết chiến dịch và khen thưởng','2023-08-12','2023-08-07',4,3),(13,'admin','sdf','2023-11-26','2023-11-15',1,3);
/*!40000 ALTER TABLE `milestiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_entity`
--

DROP TABLE IF EXISTS `new_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_entity` (
  `new_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`new_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_entity`
--

LOCK TABLES `new_entity` WRITE;
/*!40000 ALTER TABLE `new_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `new_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `new_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_date` date NOT NULL,
  PRIMARY KEY (`new_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsmedia`
--

DROP TABLE IF EXISTS `newsmedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsmedia` (
  `new_id` int NOT NULL AUTO_INCREMENT,
  `media_id` int NOT NULL,
  PRIMARY KEY (`new_id`),
  KEY `media_id` (`media_id`),
  CONSTRAINT `newsmedia_ibfk_1` FOREIGN KEY (`new_id`) REFERENCES `news` (`new_id`),
  CONSTRAINT `newsmedia_ibfk_2` FOREIGN KEY (`media_id`) REFERENCES `media` (`media_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsmedia`
--

LOCK TABLES `newsmedia` WRITE;
/*!40000 ALTER TABLE `newsmedia` DISABLE KEYS */;
/*!40000 ALTER TABLE `newsmedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `avatar` text NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'Thành','Nguyễn Khắc','D:Project_1projectimageimageUserimage_admin.jpg','Đống Đa-Hà Nội',1),(2,'Tuấn Anh','Trương','D:Project_1projectimageimageUserimage_TruongNhom.jpg','Qùy Hợp-Nghệ An',1),(3,'Oanh Nhã','Phan Thị ','D:Project_1projectimageimageUserimage_KeHoach.JPG','Đống Đa-Hà Nội',1),(4,'Thương','Trần Thị','D:Project_1projectimageimageUserimage_SuKien.jpg','Đống Đa-Hà Nội',1),(5,'Lan Anh','Lương Thị','D:Project_1projectimageimageUserimage_KeToan.JPG','Đống Đa-Hà Nội',1);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requestvolunteer`
--

DROP TABLE IF EXISTS `requestvolunteer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requestvolunteer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `date_of_birth` date NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `department_request` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `time_free` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `campaign_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campaign_id` (`campaign_id`),
  CONSTRAINT `requestvolunteer_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requestvolunteer`
--

LOCK TABLES `requestvolunteer` WRITE;
/*!40000 ALTER TABLE `requestvolunteer` DISABLE KEYS */;
INSERT INTO `requestvolunteer` VALUES (1,'Nguyễn Thị An','annguyen008@gmail,com','0835652456','2000-07-08','Hà Nội','ban truyền thông','chơi game',1,4),(2,'Nguyễn Thị Bình An','binhannguyen001@gmail,com','0956787345','2001-07-10','Hà Nội','ban truyền thông','nghe nhạc',1,4);
/*!40000 ALTER TABLE `requestvolunteer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin','Người quản lý tài khoản của hệ thống'),(2,'trưởng nhóm','Người sử dụng hệ thống VCMS phê duyệt hoặc từ chối chiến dịch và quản lý báo cáo tổng hợp '),(3,'trưởng ban kế hoạch','Người sử dụng hệ thống VCMS tạo chiến dịch, quản lý báo cáo công việc và các mốc quan trọng'),(4,'trưởng ban sự kiện','Người sử dụng hệ thống VCMS quản lý tin tức, câu chuyện và phương tiện truyền thông'),(5,'kế toán','Người sử dụng hệ thống VCMS quản lý báo cáo tài chính');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story`
--

DROP TABLE IF EXISTS `story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `story` (
  `story_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` date NOT NULL,
  `campaign_id` int NOT NULL,
  PRIMARY KEY (`story_id`),
  KEY `campaign_id` (`campaign_id`),
  CONSTRAINT `story_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
INSERT INTO `story` VALUES (1,'câu chuyện mùa hè xanh 2018','','','2018-07-01',1);
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storymedia`
--

DROP TABLE IF EXISTS `storymedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storymedia` (
  `story_id` int NOT NULL AUTO_INCREMENT,
  `media_id` int NOT NULL,
  KEY `story_id` (`story_id`),
  KEY `media_id` (`media_id`),
  CONSTRAINT `storymedia_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `story` (`story_id`),
  CONSTRAINT `storymedia_ibfk_2` FOREIGN KEY (`media_id`) REFERENCES `media` (`media_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storymedia`
--

LOCK TABLES `storymedia` WRITE;
/*!40000 ALTER TABLE `storymedia` DISABLE KEYS */;
/*!40000 ALTER TABLE `storymedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskreport`
--

DROP TABLE IF EXISTS `taskreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taskreport` (
  `taskreport_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `due_date` date NOT NULL,
  `note` text NOT NULL,
  `current_Status_id` int NOT NULL,
  `campaign_id` int NOT NULL,
  PRIMARY KEY (`taskreport_id`),
  KEY `campaign_id` (`campaign_id`),
  KEY `FKqn862r2cqx9i5qul97ohmqsob` (`current_Status_id`),
  CONSTRAINT `FKqn862r2cqx9i5qul97ohmqsob` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`),
  CONSTRAINT `taskreport_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`),
  CONSTRAINT `taskreport_ibfk_2` FOREIGN KEY (`current_Status_id`) REFERENCES `current_status` (`current_Status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskreport`
--

LOCK TABLES `taskreport` WRITE;
/*!40000 ALTER TABLE `taskreport` DISABLE KEYS */;
INSERT INTO `taskreport` VALUES (1,'Tổ chức Khám phát thuốc miễn phí','Khám sơ bộ các yếu tố sinh tồn để sàng lọc bệnh nhân.Khám trực tiếp và chẩn đoán bệnh, đưa ra khuyến nghị và kê đơn thuốc cho bệnh nhân.\nPhát thuốc miễn phí cho bệnh nhân','khám thuốc cho người nghèo','2023-08-01','note1',3,4),(2,'Vệ sinh môi trường','Trồng cây, hoa, dọn dẹp vệ sinh, cải tạo đường góp phần xây dựng nông thôn mới','Môi trường xanh','2023-08-05','note1',3,4);
/*!40000 ALTER TABLE `taskreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role_id` int NOT NULL,
  `profile_id` int NOT NULL,
  `department_id` int NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  KEY `profile_id` (`profile_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`),
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'123456789','admin123@gmail.com','0373225156',1,1,1,1),(2,'123456789','tuananh123@gmail.com','0369146287',2,2,1,0),(3,'123456789','oanh123@gmail.com','0853331556',3,3,1,0),(4,'123456789','thuong123@gmail.com','0366556451',4,4,2,1),(5,'123456789','lan123@gmail.com','0369146287',5,5,3,1);
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

-- Dump completed on 2023-11-26 15:29:04
