-- 乐居商城商品数据插入脚本
-- 基于data.txt中的图像资源生成商品数据

USE leju_simple;

-- 首先插入商品分类
INSERT INTO categories (name, parent_id, sort_order, status) VALUES
('自然风景', 0, 1, 1),
('城市建筑', 0, 2, 1),
('人物肖像', 0, 3, 1),
('科技数码', 0, 4, 1),
('美食佳肴', 0, 5, 1),
('艺术抽象', 0, 6, 1),
('交通工具', 0, 7, 1);

-- 插入商品数据
-- 自然风景类商品 (20张图片)
INSERT INTO products (name, description, price, stock, category_id, main_image, is_hot, is_new) VALUES
('山水画卷', '精美的自然山水风景画，展现大自然的壮丽与宁静', 299.00, 50, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop', 1, 1),
('森林晨光', '清晨阳光透过森林的温暖画面，充满生机与希望', 199.00, 30, 1, 'https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1920&q=80', 0, 1),
('雪山奇景', '巍峨雪山的壮丽景色，展现大自然的雄伟与神秘', 399.00, 25, 1, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920&auto=format&fit=crop', 1, 0),
('绿意盎然', '充满生机的绿色植物景观，带来清新的视觉享受', 159.00, 40, 1, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop', 0, 0),
('湖光山色', '宁静的湖泊与远山的完美结合，如诗如画', 259.00, 35, 1, 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop', 0, 0),
('瀑布飞流', '气势磅礴的瀑布景观，展现大自然的磅礴力量', 349.00, 20, 1, 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1920&auto=format&fit=crop', 1, 0),
('云海奇观', '云雾缭绕的山峰，如仙境般的梦幻景象', 279.00, 30, 1, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop', 0, 0),
('秋色斑斓', '金秋时节的绚丽色彩，大自然的调色板', 189.00, 45, 1, 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&auto=format&fit=crop', 0, 0),
('海岸风光', '蔚蓝海岸线的美丽景色，海天一色的壮阔', 229.00, 35, 1, 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1920&auto=format&fit=crop', 0, 0),
('星空璀璨', '璀璨的星空夜景，宇宙的浩瀚与神秘', 329.00, 25, 1, 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1920&auto=format&fit=crop', 1, 0),
('花海盛开', '绚丽多彩的花海景观，春天的浪漫与美好', 179.00, 50, 1, 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1920&auto=format&fit=crop', 0, 0),
('草原风光', '广袤草原的壮美景色，自由与辽阔的象征', 209.00, 40, 1, 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1920&auto=format&fit=crop', 0, 0),
('峡谷奇景', '深邃峡谷的震撼景观，大自然的鬼斧神工', 369.00, 20, 1, 'https://images.unsplash.com/photo-1464822759844-d150baec8c9a?q=80&w=1920&auto=format&fit=crop', 1, 0),
('极光幻境', '梦幻极光的奇幻景象，大自然的魔法表演', 499.00, 15, 1, 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1920&auto=format&fit=crop', 1, 1),
('田园风光', '宁静田园的温馨画面，回归自然的宁静', 149.00, 55, 1, 'https://images.unsplash.com/photo-1418065460487-3d7dc4980f03?q=80&w=1920&auto=format&fit=crop', 0, 0),
('沙漠奇观', '广袤沙漠的壮美景色，生命的顽强与坚韧', 289.00, 30, 1, 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?q=80&w=1920&auto=format&fit=crop', 0, 0),
('雨林探秘', '神秘雨林的原始景观，地球的绿色肺腑', 319.00, 25, 1, 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1920&auto=format&fit=crop', 0, 0),
('冰川奇景', '千年冰川的壮丽景观，地球历史的见证', 429.00, 18, 1, 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1920&auto=format&fit=crop', 1, 0);

-- 城市建筑类商品 (15张图片)
INSERT INTO products (name, description, price, stock, category_id, main_image, is_hot, is_new) VALUES
('现代都市', '现代都市的繁华景象，展现城市的活力与魅力', 199.00, 40, 2, 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop', 1, 0),
('古典建筑', '古典建筑的优雅与庄重，历史的厚重感', 299.00, 25, 2, 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?q=80&w=1920&auto=format&fit=crop', 0, 0),
('摩天大楼', '高耸入云的摩天大楼，现代建筑的奇迹', 259.00, 30, 2, 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop', 0, 0),
('城市夜景', '璀璨的城市夜景，灯火阑珊的美丽', 229.00, 35, 2, 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1920&auto=format&fit=crop', 1, 0),
('历史街区', '充满历史韵味的老街区，时光的记忆', 179.00, 45, 2, 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1920&auto=format&fit=crop', 0, 0),
('商业中心', '繁华的商业中心，现代都市的心脏', 209.00, 40, 2, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop', 0, 0),
('城市公园', '城市中的绿色绿洲，都市生活的休闲空间', 159.00, 50, 2, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1920&auto=format&fit=crop', 0, 0),
('艺术建筑', '充满艺术感的现代建筑，设计的魅力', 279.00, 30, 2, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1920&auto=format&fit=crop', 0, 0),
('工业遗址', '工业遗址的沧桑美感，历史的见证', 189.00, 35, 2, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop', 0, 0),
('城市天际线', '城市天际线的壮美景色，都市的轮廓', 249.00, 30, 2, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop', 0, 0),
('现代住宅', '现代住宅的设计美学，生活的艺术', 199.00, 40, 2, 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop', 0, 0),
('城市广场', '城市广场的开放空间，市民的聚集地', 169.00, 45, 2, 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?q=80&w=1920&auto=format&fit=crop', 0, 0),
('创意园区', '充满创意的文化园区，艺术的摇篮', 239.00, 30, 2, 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1920&auto=format&fit=crop', 0, 0),
('城市交通', '繁忙的城市交通，都市生活的脉搏', 189.00, 40, 2, 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1920&auto=format&fit=crop', 0, 0),
('城市绿化', '城市的绿色生态，可持续发展的体现', 159.00, 50, 2, 'https://images.unsplash.com/photo-1500916434205-0c7749693ae4?q=80&w=1920&auto=format&fit=crop', 0, 0);

-- 人物肖像类商品 (15张图片)
INSERT INTO products (name, description, price, stock, category_id, main_image, is_hot, is_new) VALUES
('商务精英', '成功商务人士的专业形象，职场的力量感', 199.00, 35, 3, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop', 1, 0),
('时尚模特', '时尚模特的魅力风采，美的艺术表现', 259.00, 25, 3, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1920&auto=format&fit=crop', 1, 0),
('成熟男士', '成熟男士的稳重气质，岁月的沉淀', 189.00, 40, 3, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1920&auto=format&fit=crop', 0, 0),
('优雅女性', '优雅女性的知性美，内在与外在的完美结合', 229.00, 30, 3, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1920&auto=format&fit=crop', 0, 0),
('青春活力', '年轻人的青春活力，生命的蓬勃朝气', 179.00, 45, 3, 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=1920&auto=format&fit=crop', 0, 0),
('职场女性', '职场女性的专业魅力，新时代的力量', 209.00, 35, 3, 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1920&auto=format&fit=crop', 0, 0),
('艺术气质', '充满艺术气质的人物，灵魂的深度', 249.00, 25, 3, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1920&auto=format&fit=crop', 0, 0),
('温馨笑容', '温暖人心的笑容，幸福的情感表达', 169.00, 50, 3, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1920&auto=format&fit=crop', 0, 0),
('成熟魅力', '成熟人士的魅力，人生的智慧', 199.00, 35, 3, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1920&auto=format&fit=crop', 0, 0),
('成功人士', '成功人士的自信风采，成就的体现', 239.00, 30, 3, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1920&auto=format&fit=crop', 0, 0),
('知性美', '知性女性的内在美，智慧的光芒', 219.00, 35, 3, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1920&auto=format&fit=crop', 0, 0),
('青春风采', '年轻人的青春风采，梦想的起点', 189.00, 40, 3, 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1920&auto=format&fit=crop', 0, 0),
('商务形象', '专业的商务形象，职场的成功要素', 199.00, 35, 3, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop', 0, 0),
('时尚达人', '时尚达人的潮流品味，潮流的引领者', 269.00, 25, 3, 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?q=80&w=1920&auto=format&fit=crop', 1, 0),
('生活瞬间', '生活中的美好瞬间，真实的感动', 159.00, 45, 3, 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1920&auto=format&fit=crop', 0, 0);

-- 科技数码类商品 (10张图片)
INSERT INTO products (name, description, price, stock, category_id, main_image, is_hot, is_new) VALUES
('智能设备', '最新智能科技设备，未来生活的体验', 899.00, 20, 4, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1920&auto=format&fit=crop', 1, 1),
('数码产品', '高品质数码产品，科技与艺术的结合', 599.00, 30, 4, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1920&auto=format&fit=crop', 0, 0),
('办公设备', '高效办公设备，提升工作效率', 399.00, 40, 4, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1920&auto=format&fit=crop', 0, 0),
('数据分析', '专业数据分析工具，洞察数据价值', 699.00, 25, 4, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop', 0, 0),
('智能制造', '智能制造设备，工业4.0的未来', 1299.00, 15, 4, 'https://images.unsplash.com/photo-1581092795360-1d7649908946?q=80&w=1920&auto=format&fit=crop', 1, 0),
('移动设备', '便携移动设备，随时随地的工作伙伴', 799.00, 25, 4, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop', 0, 0),
('智能家居', '智能家居系统，科技改变生活', 999.00, 20, 4, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920&auto=format&fit=crop', 1, 0),
('虚拟现实', 'VR虚拟现实设备，沉浸式体验', 1499.00, 15, 4, 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1920&auto=format&fit=crop', 1, 1),
('人工智能', 'AI人工智能设备，未来的智能助手', 1999.00, 10, 4, 'https://images.unsplash.com/photo-1573152939625-759985889d07?q=80&w=1920&auto=format&fit=crop', 1, 1),
('量子计算', '量子计算设备，计算能力的革命', 2999.00, 8, 4, 'https://images.unsplash.com/photo-1589985270822-9d2981889cae?q=80&w=1920&auto=format&fit=crop', 1, 1);

-- 美食佳肴类商品 (10张图片)
INSERT INTO products (name, description, price, stock, category_id, main_image, is_hot, is_new) VALUES
('精致甜点', '精美可口的甜点，甜蜜的幸福滋味', 89.00, 60, 5, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1920&auto=format&fit=crop', 1, 0),
('健康沙拉', '新鲜健康的蔬菜沙拉，营养美味的选择', 69.00, 70, 5, 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1920&auto=format&fit=crop', 0, 0),
('美味汉堡', '经典美味的汉堡，满足味蕾的享受', 49.00, 80, 5, 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1920&auto=format&fit=crop', 1, 0),
('营养早餐', '营养丰富的早餐搭配，美好一天的开始', 59.00, 75, 5, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1920&auto=format&fit=crop', 0, 0),
('精致料理', '精心制作的料理，厨师的匠心之作', 129.00, 50, 5, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1920&auto=format&fit=crop', 0, 0),
('特色小吃', '地方特色小吃，文化的味道传承', 39.00, 90, 5, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&auto=format&fit=crop', 0, 0),
('健康饮品', '天然健康饮品，身体的滋养选择', 29.00, 100, 5, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop', 0, 0),
('美味披萨', '正宗美味的披萨，意大利的风味', 79.00, 65, 5, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1920&auto=format&fit=crop', 1, 0),
('精致蛋糕', '精美制作的蛋糕，庆祝的甜蜜时刻', 99.00, 55, 5, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1920&auto=format&fit=crop', 0, 0),
('传统美食', '传统经典美食，文化的味道记忆', 89.00, 60, 5, 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1920&auto=format&fit=crop', 0, 0);

-- 艺术抽象类商品 (10张图片)
INSERT INTO products (name, description, price, stock, category_id, main_image, is_hot, is_new) VALUES
('抽象艺术', '现代抽象艺术作品，艺术的无限可能', 599.00, 20, 6, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1920&auto=format&fit=crop', 1, 0),
('创意设计', '充满创意的设计作品，思维的碰撞', 399.00, 30, 6, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1920&auto=format&fit=crop', 0, 0),
('现代艺术', '现代艺术风格作品，时代的艺术表达', 499.00, 25, 6, 'https://images.unsplash.com/photo-1518562180175-34a163b1c934?q=80&w=1920&auto=format&fit=crop', 0, 0),
('创意插画', '独特创意的插画作品，想象力的展现', 299.00, 35, 6, 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1920&auto=format&fit=crop', 0, 0),
('艺术摄影', '艺术摄影作品，光影的艺术魅力', 399.00, 30, 6, 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920&auto=format&fit=crop', 0, 0),
('创意海报', '创意海报设计，视觉的冲击力', 199.00, 45, 6, 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop', 0, 0),
('艺术装置', '现代艺术装置，空间的创意表达', 799.00, 20, 6, 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1920&auto=format&fit=crop', 1, 0),
('创意雕塑', '创意雕塑作品，立体的艺术语言', 699.00, 25, 6, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1920&auto=format&fit=crop', 0, 0),
('艺术绘画', '艺术绘画作品，色彩的情感表达', 449.00, 30, 6, 'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?q=80&w=1920&auto=format&fit=crop', 0, 0),
('创意艺术', '创意艺术表现，艺术的无限创意', 549.00, 25, 6, 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1920&auto=format&fit=crop', 0, 0);

-- 交通工具类商品 (10张图片)
INSERT INTO products (name, description, price, stock, category_id, main_image, is_hot, is_new) VALUES
('现代汽车', '现代汽车设计，科技与美学的结合', 2999.00, 15, 7, 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop', 1, 0),
('豪华跑车', '豪华跑车的速度与激情，极致的驾驶体验', 5999.00, 10, 7, 'https://images.unsplash.com/photo-1544620347-e08208961901?q=80&w=1920&auto=format&fit=crop', 1, 1),
('经典老爷车', '经典老爷车的复古魅力，历史的见证', 3999.00, 8, 7, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop', 0, 0),
('摩托车', '摩托车的自由与激情，道路的征服者', 1999.00, 20, 7, 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1920&auto=format&fit=crop', 0, 0),
('自行车', '环保健康的自行车，绿色出行的选择', 599.00, 50, 7, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1920&auto=format&fit=crop', 0, 0),
('游艇', '豪华游艇的海洋之旅，海上的奢华体验', 9999.00, 5, 7, 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920&auto=format&fit=crop', 1, 1),
('私人飞机', '私人飞机的天空之旅，自由的翱翔', 19999.00, 3, 7, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1920&auto=format&fit=crop', 1, 1),
('火车', '现代火车的舒适旅程，陆地的移动宫殿', 1499.00, 25, 7, 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop', 0, 0),
('直升机', '直升机的空中视角，俯瞰大地的壮美', 8999.00, 8, 7, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1920&auto=format&fit=crop', 1, 0),
('电动汽车', '环保电动汽车，绿色出行的未来', 3999.00, 20, 7, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop', 1, 0);

-- 插入完成提示
SELECT '商品数据插入完成！' AS message;
SELECT COUNT(*) AS total_products FROM products;
SELECT category_id, COUNT(*) as product_count FROM products GROUP BY category_id ORDER BY category_id;
