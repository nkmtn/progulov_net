INSERT INTO `mydb`.`group` (group_number, group_programe, group_description) VALUES ('22300', '09.00.00', NULL), ('22399', '09.00.00', NULL);

INSERT INTO `mydb`.`role` (role_code, role_title, role_description) VALUES ('0', 'student', NULL), ('1', 'directorate', NULL),
('2', 'lecturer', NULL), ('3', 'headman', NULL);

INSERT INTO `mydb`.`subjects` (subjects_name, subjects_programe) VALUES ('Теория производства ПО', '09.00.00'), ('Модели разработки ПО', '09.00.00'), ('Web-технологии II', '09.00.00');

INSERT INTO `mydb`.`user` (user_login, user_firstname, user_lastname, user_patronymic, user_password_hash)
VALUES ('test','test','test','test','test'),
('admin','very','cool','boss','admin'),
('209270','dolorem','sit','corporis','202537'),
('8311','quas','a','sed','973963'),
('826722','non','laboriosam','voluptatem','333'),
('9','harum','beatae','exercitationem','70361531'),
('651358','voluptatem','debitis','et','129356925'),
('39358303','qui','quibusdam','voluptatibus','14810'),
('74947641','culpa','aperiam','sit','40612'),
('5508023','non','eos','in','4004'),
('3','aspernatur','libero','sequi','152'),
('664600315','voluptas','dolores','ea','44'),
('8534','itaque','nemo','libero','79'),
('75','dicta','officia','ipsa','47'),
('53107219','doloremque','quia','pariatur','375874'),
('148620','nesciunt','maiores','illum','935296'),
('1318730','fuga','omnis','molestias','2119'),
('130','quia','consequatur','voluptatum','24'),
('318656','est','excepturi','ut','60'),
('56664','tenetur','fugit','consequatur','924878280'),
('58','nulla','voluptas','mollitia','70'),
('775598555','dicta','provident','enim','231111'),
('695','et','rerum','nihil','78'),
('3315260','sunt','veniam','qui','82639'),
('5284018','dolores','magni','sed','472323'),
('90750','est','tenetur','vero','8'),
('162950808','repellat','impedit','inventore','17'),
('54','animi','libero','cupiditate','275'),
('72','ducimus','tempora','non','60365923'),
('8625456','at','aut','laudantium','584839'),
('9354165','enim','voluptatem','nihil','35533'),
('6858008','consequatur','qui','tempora','221'),
('146830511','ut','laudantium','corrupti','30'),
('91913924','aperiam','at','maiores','1546'),
('7','autem','nobis','provident','9947934'),
('46255','est','vero','voluptas','970218'),
('18565','ex','nulla','nulla','86723'),
('875075417','perspiciatis','recusandae','sit','61659047'),
('14152198','placeat','velit','rerum','7835'),
('9242','odio','non','pariatur','9031386'),
('81370','est','provident','veniam','8925771'),
('59385','doloribus','ipsum','autem','192785'),
('386458','consequatur','possimus','exercitationem','5230'),
('745735339','magnam','minima','sit','61483'),
('6385','vitae','et','animi','4656853'),
('934335647','cumque','dolorem','dolor','56'),
('622','deleniti','iusto','velit','749988199'),
('92','autem','eligendi','laudantium','569'),
('88546','in','eum','et','49034123'),
('32008875','architecto','voluptatibus','dolores','73807');

INSERT INTO `mydb`.`user` (user_login, user_firstname, user_lastname, user_patronymic, user_password_hash)
VALUES ('aborod','Александр','Бородин','Владимирович','aborod01'),
    ('dimitrov','Вячеслав','Димитров','Михайлович','dimitrov02'),
    ('kulakov','Кирилл','Кулаков','Александрович','kulakov03');

INSERT INTO `mydb`.`lessons` (lessons_date, subjects_id, group_id, user_id) VALUES ('2020-05-20 9:10:05.123', '1', '1', '53'),
('2020-05-20 10:10:05.123', '2', '1', '52'), ('2020-05-20 15:10:05.123', '3', '1', '53'),
('2020-05-22 9:10:05.123', '3', '1', '53'), ('2020-05-22 10:10:05.123', '2', '1', '52'),
('2020-05-22 15:10:05.123', '1', '1', '53'), ('2020-05-20 9:10:05.123', '1', '2', '53'),
('2020-05-20 10:10:05.123', '2', '2', '52'), ('2020-05-20 15:10:05.123', '3', '2', '53');

INSERT INTO `mydb`.`user_has_role` (user_id, role_id, group_id, subjects_id, uhr_granted) VALUES ('51', '3', NULL, NULL, '2018-01-01 12:10:05.123'),
('52', '3', NULL, NULL, '2018-01-01 12:10:05.123'),
('53', '3', NULL, NULL, '2018-01-01 12:10:05.123');

INSERT INTO `mydb`.`user_has_role` (user_id, role_id, group_id, subjects_id, uhr_granted) VALUES ('53', '3', NULL, '1', '2018-01-01 12:10:05.123'),
('52', '3', NULL, '2', '2018-01-01 12:10:05.123'),
('53', '3', NULL, '3', '2018-01-01 12:10:05.123');

INSERT INTO `mydb`.`user_has_role` (user_id, role_id, group_id, subjects_id, uhr_granted) VALUES ('1', '2', NULL, NULL, '2018-01-01 12:10:05.123'),
                                          ('2', '2', NULL, NULL, '2018-01-01 12:10:05.123'),
                                          ('3', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('4', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('5', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('6', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('7', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('8', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('9', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('10', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('11', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('12', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('13', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('14', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('15', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('16', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('17', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('18', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('19', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('20', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('21', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('22', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('23', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('24', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('25', '1', '1', NULL, '2018-01-01 12:10:05.123'),
                                          ('26', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('27', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('28', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('29', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('30', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('31', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('32', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('33', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('34', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('35', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('36', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('37', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('38', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('39', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('40', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('41', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('42', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('43', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('44', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('45', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('46', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('47', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('48', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('49', '1', '2', NULL, '2018-01-01 12:10:05.123'),
                                          ('50', '1', '2', NULL, '2018-01-01 12:10:05.123');

INSERT INTO `mydb`.`attendance` (lessons_id, user_id, presence) VALUES ('1', '3', '0'), ('1', '4', '1'), ('1', '5', '1'),
('1', '6', '1'), ('1', '7', '1'), ('1', '8', '1'), ('1', '9', '0'), ('1', '10', '0'), ('1', '11', '0'), ('1', '12', '1'),
('1', '13', '0'), ('1', '14', '1'), ('1', '15', '0'), ('1', '16', '0'), ('1', '17', '1'), ('1', '18', '0'),
('1', '19', '0'), ('1', '20', '0'), ('1', '21', '1'), ('1', '22', '1'), ('1', '23', '0'), ('1', '24', '1'),('1', '25', '1'),
('2', '3', '0'), ('2', '4', '1'), ('2', '5', '0'), ('2', '6', '1'), ('2', '7', '0'), ('2', '8', '1'), ('2', '9', '0'),
('2', '10', '1'), ('2', '11', '0'), ('2', '12', '0'), ('2', '13', '1'), ('2', '14', '1'), ('2', '15', '0'), ('2', '16', '0'),
('2', '17', '1'), ('2', '18', '0'), ('2', '19', '1'), ('2', '20', '0'), ('2', '21', '0'), ('2', '22', '0'), ('2', '23', '1'),
('2', '24', '0'),('2', '25', '1'), ('3', '3', '1'), ('3', '4', '0'), ('3', '5', '1'), ('3', '6', '1'), ('3', '7', '1'),
('3', '8', '0'), ('3', '9', '1'), ('3', '10', '1'), ('3', '11', '0'), ('3', '12', '0'), ('3', '13', '1'), ('3', '14', '0'),
('3', '15', '1'), ('3', '16', '1'), ('3', '17', '1'), ('3', '18', '0'), ('3', '19', '1'), ('3', '20', '1'), ('3', '21', '0'),
('3', '22', '1'), ('3', '23', '0'), ('3', '24', '1'), ('3', '25', '0'), ('4', '26', '1'), ('4', '27', '1'), ('4', '28', '0'),
('4', '29', '0'), ('4', '30', '1'), ('4', '31', '1'), ('4', '32', '1'), ('4', '33', '0'), ('4', '34', '1'), ('4', '35', '0'),
('4', '36', '0'), ('4', '37', '1'), ('4', '38', '0'), ('4', '39', '1'), ('4', '40', '0'), ('4', '41', '1'), ('4', '42', '1'),
('4', '43', '0'), ('4', '44', '0'), ('4', '45', '0'), ('4', '46', '1'), ('4', '47', '0'), ('4', '48', '1'), ('4', '49', '0'),
('4', '50', '0'), ('5', '26', '1'), ('5', '27', '1'), ('5', '28', '0'), ('5', '29', '0'), ('5', '30', '0'), ('5', '31', '1'),
('5', '32', '1'), ('5', '33', '0'), ('5', '34', '1'), ('5', '35', '0'), ('5', '36', '0'), ('5', '37', '0'), ('5', '38', '0'),
('5', '39', '0'), ('5', '40', '0'), ('5', '41', '0'), ('5', '42', '1'), ('5', '43', '1'), ('5', '44', '0'), ('5', '45', '0'),
('5', '46', '0'), ('5', '47', '0'), ('5', '48', '0'), ('5', '49', '1'), ('5', '50', '1'), ('6', '26', '0'), ('6', '27', '0'),
('6', '28', '0'), ('6', '29', '1'), ('6', '30', '1'), ('6', '31', '1'), ('6', '32', '0'), ('6', '33', '0'), ('6', '34', '1'),
('6', '35', '0'), ('6', '36', '1'), ('6', '37', '0'), ('6', '38', '1'), ('6', '39', '1'), ('6', '40', '1'), ('6', '41', '0'),
('6', '42', '0'), ('6', '43', '1'), ('6', '44', '0'), ('6', '45', '0'), ('6', '46', '0'), ('6', '47', '1'), ('6', '48', '1'),
('6', '49', '1'), ('6', '50', '1');

INSERT INTO `mydb`.`attendance` (lessons_id, user_id, presence) VALUES ('9', '3', '1'), ('9', '4', '0'), ('9', '5', '0'),
('9', '6', '0'), ('9', '7', '1'), ('9', '8', '0'), ('9', '9', '1'), ('9', '10', '1'), ('9', '11', '0'), ('9', '12', '1'),
('9', '13', '0'), ('9', '14', '0'), ('9', '15', '0'), ('9', '16', '1'), ('9', '17', '1'), ('9', '18', '1'), ('9', '19', '0'),
('9', '20', '0'), ('9', '21', '0'), ('9', '22', '1'), ('9', '23', '1'), ('9', '24', '0'), ('8', '3', '1'), ('8', '4', '1'),
('8', '5', '1'), ('8', '6', '1'), ('8', '7', '1'), ('8', '8', '1'), ('8', '9', '1'), ('8', '10', '0'), ('8', '11', '0'),
('8', '12', '1'), ('8', '13', '0'), ('8', '14', '0'), ('8', '15', '1'), ('8', '16', '1'), ('8', '17', '1'), ('8', '18', '0'),
('8', '19', '0'), ('8', '20', '1'), ('8', '21', '1'), ('8', '22', '0'), ('8', '23', '1'), ('8', '24', '0'), ('7', '3', '1'),
('7', '4', '1'), ('7', '5', '1'), ('7', '6', '1'), ('7', '7', '1'), ('7', '8', '0'), ('7', '9', '0'), ('7', '10', '0'),
('7', '11', '1'), ('7', '12', '1'), ('7', '13', '0'), ('7', '14', '1'), ('7', '15', '1'), ('7', '16', '0'), ('7', '17', '0'),
('7', '18', '1'), ('7', '19', '1'), ('7', '20', '1'), ('7', '21', '1'), ('7', '22', '0'), ('7', '23', '0'), ('7', '24', '0');