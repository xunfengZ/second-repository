/*
Navicat MySQL Data Transfer

Source Server         : 2010
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : tmall

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2020-10-27 10:03:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('1', 'first', '123123');
INSERT INTO `userinfo` VALUES ('2', 'az1', 'zxczxc');
INSERT INTO `userinfo` VALUES ('11', 'zfefa', '123456qwe');
INSERT INTO `userinfo` VALUES ('4', 'zxz', '114346');
INSERT INTO `userinfo` VALUES ('5', 'zxc', '123123');
INSERT INTO `userinfo` VALUES ('6', '111', '123123');
INSERT INTO `userinfo` VALUES ('7', '萨达', '123123');
INSERT INTO `userinfo` VALUES ('8', '1114', '123456');
INSERT INTO `userinfo` VALUES ('9', '11141', 'asdasd');
