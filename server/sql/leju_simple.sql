/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80042 (8.0.42)
 Source Host           : localhost:3306
 Source Schema         : leju_simple

 Target Server Type    : MySQL
 Target Server Version : 80042 (8.0.42)
 File Encoding         : 65001

 Date: 13/08/2025 10:02:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cart_items
-- ----------------------------
DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE `cart_items`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户ID',
  `product_id` int NOT NULL COMMENT '商品ID',
  `quantity` int NOT NULL DEFAULT 1 COMMENT '商品数量',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_product_unique`(`user_id` ASC, `product_id` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_product_id`(`product_id` ASC) USING BTREE,
  INDEX `idx_is_deleted`(`is_deleted` ASC) USING BTREE,
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart_items
-- ----------------------------

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `parent_id` int NULL DEFAULT 0 COMMENT '父分类ID，0表示顶级分类',
  `sort_order` int NULL DEFAULT 0 COMMENT '排序权重',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '0-禁用，1-启用',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_parent_id`(`parent_id` ASC) USING BTREE,
  INDEX `idx_sort_order`(`sort_order` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE,
  INDEX `idx_is_deleted`(`is_deleted` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, '家具', 0, 1, 1, '2025-08-13 09:11:19', '2025-08-13 09:11:19', 0);
INSERT INTO `categories` VALUES (2, '灯具', 0, 2, 1, '2025-08-13 09:11:19', '2025-08-13 09:11:19', 0);
INSERT INTO `categories` VALUES (3, '沙发', 1, 1, 1, '2025-08-13 09:11:19', '2025-08-13 09:11:19', 0);
INSERT INTO `categories` VALUES (4, '餐桌', 1, 2, 1, '2025-08-13 09:11:19', '2025-08-13 09:11:19', 0);
INSERT INTO `categories` VALUES (5, '台灯', 2, 1, 1, '2025-08-13 09:11:19', '2025-08-13 09:11:19', 0);
INSERT INTO `categories` VALUES (6, '自然风景', 0, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `categories` VALUES (7, '城市建筑', 0, 2, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `categories` VALUES (8, '人物肖像', 0, 3, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `categories` VALUES (9, '科技数码', 0, 4, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `categories` VALUES (10, '美食佳肴', 0, 5, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `categories` VALUES (11, '艺术抽象', 0, 6, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `categories` VALUES (12, '交通工具', 0, 7, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);

-- ----------------------------
-- Table structure for order_items
-- ----------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL COMMENT '订单ID',
  `product_id` int NOT NULL COMMENT '商品ID',
  `product_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名称',
  `product_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `price` decimal(10, 2) NOT NULL COMMENT '商品单价',
  `quantity` int NOT NULL COMMENT '商品数量',
  `subtotal` decimal(10, 2) NOT NULL COMMENT '小计金额',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_order_id`(`order_id` ASC) USING BTREE,
  INDEX `idx_product_id`(`product_id` ASC) USING BTREE,
  INDEX `idx_is_deleted`(`is_deleted` ASC) USING BTREE,
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_items
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单号',
  `user_id` int NOT NULL COMMENT '下单用户ID',
  `total_amount` decimal(10, 2) NOT NULL COMMENT '订单总金额',
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '订单状态：0-待付款，1-已支付，2-已发货，3-已完成，4-已取消',
  `shipping_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '收货地址',
  `shipping_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收货人姓名',
  `shipping_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收货人电话',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '订单备注',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `order_no`(`order_no` ASC) USING BTREE,
  INDEX `idx_order_no`(`order_no` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE,
  INDEX `idx_is_deleted`(`is_deleted` ASC) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for product_images
-- ----------------------------
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL COMMENT '商品ID',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图片URL',
  `sort_order` int NULL DEFAULT 0 COMMENT '排序权重',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_product_id`(`product_id` ASC) USING BTREE,
  INDEX `idx_sort_order`(`sort_order` ASC) USING BTREE,
  INDEX `idx_is_deleted`(`is_deleted` ASC) USING BTREE,
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_images
-- ----------------------------

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名称',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '商品描述',
  `price` decimal(10, 2) NOT NULL COMMENT '商品价格',
  `stock` int NOT NULL DEFAULT 0 COMMENT '库存数量',
  `category_id` int NOT NULL COMMENT '商品分类ID',
  `main_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '主图URL',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '0-下架，1-上架',
  `is_hot` tinyint NULL DEFAULT 0 COMMENT '是否热销：0-否，1-是',
  `is_new` tinyint NULL DEFAULT 0 COMMENT '是否新品：0-否，1-是',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_name`(`name` ASC) USING BTREE,
  INDEX `idx_category_id`(`category_id` ASC) USING BTREE,
  INDEX `idx_price`(`price` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE,
  INDEX `idx_is_hot`(`is_hot` ASC) USING BTREE,
  INDEX `idx_is_new`(`is_new` ASC) USING BTREE,
  INDEX `idx_is_deleted`(`is_deleted` ASC) USING BTREE,
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 92 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (4, '山水画卷', '精美的自然山水风景画，展现大自然的壮丽与宁静', 299.00, 50, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop', 1, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (5, '森林晨光', '清晨阳光透过森林的温暖画面，充满生机与希望', 199.00, 30, 1, 'https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1920&q=80', 1, 0, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (6, '雪山奇景', '巍峨雪山的壮丽景色，展现大自然的雄伟与神秘', 399.00, 25, 1, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (7, '绿意盎然', '充满生机的绿色植物景观，带来清新的视觉享受', 159.00, 40, 1, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (8, '湖光山色', '宁静的湖泊与远山的完美结合，如诗如画', 259.00, 35, 1, 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (9, '瀑布飞流', '气势磅礴的瀑布景观，展现大自然的磅礴力量', 349.00, 20, 1, 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (10, '云海奇观', '云雾缭绕的山峰，如仙境般的梦幻景象', 279.00, 30, 1, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (11, '秋色斑斓', '金秋时节的绚丽色彩，大自然的调色板', 189.00, 45, 1, 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (12, '海岸风光', '蔚蓝海岸线的美丽景色，海天一色的壮阔', 229.00, 35, 1, 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (13, '星空璀璨', '璀璨的星空夜景，宇宙的浩瀚与神秘', 329.00, 25, 1, 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (14, '花海盛开', '绚丽多彩的花海景观，春天的浪漫与美好', 179.00, 50, 1, 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (15, '草原风光', '广袤草原的壮美景色，自由与辽阔的象征', 209.00, 40, 1, 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (16, '峡谷奇景', '深邃峡谷的震撼景观，大自然的鬼斧神工', 369.00, 20, 1, 'https://images.unsplash.com/photo-1464822759844-d150baec8c9a?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (17, '极光幻境', '梦幻极光的奇幻景象，大自然的魔法表演', 499.00, 15, 1, 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1920&auto=format&fit=crop', 1, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (18, '田园风光', '宁静田园的温馨画面，回归自然的宁静', 149.00, 55, 1, 'https://images.unsplash.com/photo-1418065460487-3d7dc4980f03?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (19, '沙漠奇观', '广袤沙漠的壮美景色，生命的顽强与坚韧', 289.00, 30, 1, 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (20, '雨林探秘', '神秘雨林的原始景观，地球的绿色肺腑', 319.00, 25, 1, 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (21, '冰川奇景', '千年冰川的壮丽景观，地球历史的见证', 429.00, 18, 1, 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (22, '现代都市', '现代都市的繁华景象，展现城市的活力与魅力', 199.00, 40, 2, 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (23, '古典建筑', '古典建筑的优雅与庄重，历史的厚重感', 299.00, 25, 2, 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (24, '摩天大楼', '高耸入云的摩天大楼，现代建筑的奇迹', 259.00, 30, 2, 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (25, '城市夜景', '璀璨的城市夜景，灯火阑珊的美丽', 229.00, 35, 2, 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (26, '历史街区', '充满历史韵味的老街区，时光的记忆', 179.00, 45, 2, 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (27, '商业中心', '繁华的商业中心，现代都市的心脏', 209.00, 40, 2, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (28, '城市公园', '城市中的绿色绿洲，都市生活的休闲空间', 159.00, 50, 2, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (29, '艺术建筑', '充满艺术感的现代建筑，设计的魅力', 279.00, 30, 2, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (30, '工业遗址', '工业遗址的沧桑美感，历史的见证', 189.00, 35, 2, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (31, '城市天际线', '城市天际线的壮美景色，都市的轮廓', 249.00, 30, 2, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (32, '现代住宅', '现代住宅的设计美学，生活的艺术', 199.00, 40, 2, 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (33, '城市广场', '城市广场的开放空间，市民的聚集地', 169.00, 45, 2, 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (34, '创意园区', '充满创意的文化园区，艺术的摇篮', 239.00, 30, 2, 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (35, '城市交通', '繁忙的城市交通，都市生活的脉搏', 189.00, 40, 2, 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (36, '城市绿化', '城市的绿色生态，可持续发展的体现', 159.00, 50, 2, 'https://images.unsplash.com/photo-1500916434205-0c7749693ae4?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (37, '商务精英', '成功商务人士的专业形象，职场的力量感', 199.00, 35, 3, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (38, '时尚模特', '时尚模特的魅力风采，美的艺术表现', 259.00, 25, 3, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (39, '成熟男士', '成熟男士的稳重气质，岁月的沉淀', 189.00, 40, 3, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (40, '优雅女性', '优雅女性的知性美，内在与外在的完美结合', 229.00, 30, 3, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (41, '青春活力', '年轻人的青春活力，生命的蓬勃朝气', 179.00, 45, 3, 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (42, '职场女性', '职场女性的专业魅力，新时代的力量', 209.00, 35, 3, 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (43, '艺术气质', '充满艺术气质的人物，灵魂的深度', 249.00, 25, 3, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (44, '温馨笑容', '温暖人心的笑容，幸福的情感表达', 169.00, 50, 3, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (45, '成熟魅力', '成熟人士的魅力，人生的智慧', 199.00, 35, 3, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (46, '成功人士', '成功人士的自信风采，成就的体现', 239.00, 30, 3, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (47, '知性美', '知性女性的内在美，智慧的光芒', 219.00, 35, 3, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (48, '青春风采', '年轻人的青春风采，梦想的起点', 189.00, 40, 3, 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (49, '商务形象', '专业的商务形象，职场的成功要素', 199.00, 35, 3, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (50, '时尚达人', '时尚达人的潮流品味，潮流的引领者', 269.00, 25, 3, 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (51, '生活瞬间', '生活中的美好瞬间，真实的感动', 159.00, 45, 3, 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (52, '智能设备', '最新智能科技设备，未来生活的体验', 899.00, 20, 4, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1920&auto=format&fit=crop', 1, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (53, '数码产品', '高品质数码产品，科技与艺术的结合', 599.00, 30, 4, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (54, '办公设备', '高效办公设备，提升工作效率', 399.00, 40, 4, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (55, '数据分析', '专业数据分析工具，洞察数据价值', 699.00, 25, 4, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (56, '智能制造', '智能制造设备，工业4.0的未来', 1299.00, 15, 4, 'https://images.unsplash.com/photo-1581092795360-1d7649908946?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (57, '移动设备', '便携移动设备，随时随地的工作伙伴', 799.00, 25, 4, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (58, '智能家居', '智能家居系统，科技改变生活', 999.00, 20, 4, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (59, '虚拟现实', 'VR虚拟现实设备，沉浸式体验', 1499.00, 15, 4, 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1920&auto=format&fit=crop', 1, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (60, '人工智能', 'AI人工智能设备，未来的智能助手', 1999.00, 10, 4, 'https://images.unsplash.com/photo-1573152939625-759985889d07?q=80&w=1920&auto=format&fit=crop', 1, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (61, '量子计算', '量子计算设备，计算能力的革命', 2999.00, 8, 4, 'https://images.unsplash.com/photo-1589985270822-9d2981889cae?q=80&w=1920&auto=format&fit=crop', 1, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (62, '精致甜点', '精美可口的甜点，甜蜜的幸福滋味', 89.00, 60, 5, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (63, '健康沙拉', '新鲜健康的蔬菜沙拉，营养美味的选择', 69.00, 70, 5, 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (64, '美味汉堡', '经典美味的汉堡，满足味蕾的享受', 49.00, 80, 5, 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (65, '营养早餐', '营养丰富的早餐搭配，美好一天的开始', 59.00, 75, 5, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (66, '精致料理', '精心制作的料理，厨师的匠心之作', 129.00, 50, 5, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (67, '特色小吃', '地方特色小吃，文化的味道传承', 39.00, 90, 5, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (68, '健康饮品', '天然健康饮品，身体的滋养选择', 29.00, 100, 5, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (69, '美味披萨', '正宗美味的披萨，意大利的风味', 79.00, 65, 5, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (70, '精致蛋糕', '精美制作的蛋糕，庆祝的甜蜜时刻', 99.00, 55, 5, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (71, '传统美食', '传统经典美食，文化的味道记忆', 89.00, 60, 5, 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (72, '抽象艺术', '现代抽象艺术作品，艺术的无限可能', 599.00, 20, 6, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (73, '创意设计', '充满创意的设计作品，思维的碰撞', 399.00, 30, 6, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (74, '现代艺术', '现代艺术风格作品，时代的艺术表达', 499.00, 25, 6, 'https://images.unsplash.com/photo-1518562180175-34a163b1c934?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (75, '创意插画', '独特创意的插画作品，想象力的展现', 299.00, 35, 6, 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (76, '艺术摄影', '艺术摄影作品，光影的艺术魅力', 399.00, 30, 6, 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (77, '创意海报', '创意海报设计，视觉的冲击力', 199.00, 45, 6, 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (78, '艺术装置', '现代艺术装置，空间的创意表达', 799.00, 20, 6, 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (79, '创意雕塑', '创意雕塑作品，立体的艺术语言', 699.00, 25, 6, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (80, '艺术绘画', '艺术绘画作品，色彩的情感表达', 449.00, 30, 6, 'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (81, '创意艺术', '创意艺术表现，艺术的无限创意', 549.00, 25, 6, 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (82, '现代汽车', '现代汽车设计，科技与美学的结合', 2999.00, 15, 7, 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (83, '豪华跑车', '豪华跑车的速度与激情，极致的驾驶体验', 5999.00, 10, 7, 'https://images.unsplash.com/photo-1544620347-e08208961901?q=80&w=1920&auto=format&fit=crop', 1, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (84, '经典老爷车', '经典老爷车的复古魅力，历史的见证', 3999.00, 8, 7, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (85, '摩托车', '摩托车的自由与激情，道路的征服者', 1999.00, 20, 7, 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (86, '自行车', '环保健康的自行车，绿色出行的选择', 599.00, 50, 7, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (87, '游艇', '豪华游艇的海洋之旅，海上的奢华体验', 9999.00, 5, 7, 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920&auto=format&fit=crop', 1, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (88, '私人飞机', '私人飞机的天空之旅，自由的翱翔', 19999.00, 3, 7, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1920&auto=format&fit=crop', 1, 1, 1, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (89, '火车', '现代火车的舒适旅程，陆地的移动宫殿', 1499.00, 25, 7, 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop', 1, 0, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (90, '直升机', '直升机的空中视角，俯瞰大地的壮美', 8999.00, 8, 7, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);
INSERT INTO `products` VALUES (91, '电动汽车', '环保电动汽车，绿色出行的未来', 3999.00, 20, 7, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop', 1, 1, 0, '2025-08-13 09:57:24', '2025-08-13 09:57:24', 0);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` tinyint NOT NULL DEFAULT 0 COMMENT '0-普通用户，1-管理员',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE,
  INDEX `idx_username`(`username` ASC) USING BTREE,
  INDEX `idx_email`(`email` ASC) USING BTREE,
  INDEX `idx_role`(`role` ASC) USING BTREE,
  INDEX `idx_is_deleted`(`is_deleted` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@leju.com', NULL, 1, '2025-08-13 09:11:19', '2025-08-13 09:11:19', NULL, 0);
INSERT INTO `users` VALUES (2, 'user1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user1@leju.com', NULL, 0, '2025-08-13 09:11:19', '2025-08-13 09:11:19', NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
