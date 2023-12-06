create database volunteer_campaign_management;
use volunteer_campaign_management;

create table IF NOT EXISTS Role(
role_id int primary key not null auto_increment,
name nvarchar(255) not null,
description nvarchar(255) not null
);

create table IF NOT EXISTS Profile(
profile_id int primary key not null auto_increment,
first_name nvarchar(255) not null,
last_name nvarchar(255) not null,
avatar text not null,
address nvarchar(255) not null,
status boolean not null
);

create table IF NOT EXISTS Department(
department_id int primary key not null auto_increment,
name nvarchar(255) not null,
description nvarchar(255) not null
);

create table IF NOT EXISTS User(
user_id int primary key not null auto_increment,
password varchar(255) not null,
email varchar(255) not null,
phone varchar(20) not null,
role_id int not null,
profile_id int not null,
department_id int not null,
status boolean not null,
FOREIGN KEY (role_id) REFERENCES Role(role_id),
FOREIGN KEY (profile_id) REFERENCES Profile(profile_id),
FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

create table IF NOT EXISTS Current_Status(
current_Status_id int primary key not null auto_increment,
name nvarchar(255) not null,
description nvarchar(255) not null
);

create table IF NOT EXISTS Campaign(
campaign_id int primary key not null auto_increment,
name nvarchar(255) not null,
start_date date not null,
end_date date not null,
description nvarchar(255) not null,
title nvarchar(255) not null,
location nvarchar(255) not null,
current_Status_id int,
FOREIGN KEY (current_Status_id) REFERENCES Current_Status(current_Status_id)
);

create table IF NOT EXISTS TaskReport(
taskreport_id int primary key not null auto_increment,
name nvarchar(255) not null,
description nvarchar(255) not null,
title nvarchar(255) not null,
due_date date not null,
note text not null,
current_Status_id int not null,
campaign_id int not null,
FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id),
FOREIGN KEY (current_Status_id) REFERENCES Current_Status(current_Status_id)
);

create table IF NOT EXISTS Issues(
issue_id int primary key not null auto_increment,
title nvarchar(255) not null,
description nvarchar(255) not null,
priority boolean not null,
assignee text not null,
due_date date not null,
current_Status_id int not null,
user_id int not null,
taskreport_id int not null,
FOREIGN KEY (user_id) REFERENCES User(user_id),
FOREIGN KEY (taskreport_id) REFERENCES TaskReport(taskreport_id),
FOREIGN KEY (current_Status_id) REFERENCES Current_Status(current_Status_id)
);

create table IF NOT EXISTS FinancialReport(
financialreport_id INT PRIMARY KEY AUTO_INCREMENT,
name nvarchar(255) not null,
amount decimal(19,4) not null,
total_expenses decimal(19,4) not null,
description nvarchar(255) not null,
created_at date not null,
note text not null,
campaign_id int not null,
user_id int not null,
FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id),
FOREIGN KEY (user_id) REFERENCES User(user_id)
);

create table IF NOT EXISTS Donors(
donor_id int key not null auto_increment,
name nvarchar(255) not null,
image text not null,
amount decimal(19,4) not null,
donate_date date not null,
description nvarchar(255) not null,
campaign_id int not null,
FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id)
);

create table IF NOT EXISTS Milestiones(
milestione_id int primary key not null auto_increment,
name nvarchar(255) not null,
description nvarchar(255) not null,
create_at date not null,
end_date date not null,
campaign_id int not null,
current_Status_id int not null,
FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id),
FOREIGN KEY (current_Status_id) REFERENCES Current_Status(current_Status_id)
);

create table IF NOT EXISTS Media(
media_id int primary key not null auto_increment,
campaign_id int not null,
image text not null,
video varchar(255) not null,
FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id)
);

create table IF NOT EXISTS RequestVolunteer(
id int primary key not null auto_increment,
name nvarchar(255) not null,
email varchar(255) not null,
phone varchar(20) not null,
date_of_birth date not null,
address nvarchar(255) not null,
department_request nvarchar(255) not null,
time_free nvarchar(255) not null,
status boolean not null,
campaign_id int not null,
FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id)
);

create table IF NOT EXISTS Story(
story_id int primary key not null auto_increment,
name nvarchar(255) not null,
content nvarchar(255) not null,
title nvarchar(255) not null,
created_at date not null,
campaign_id int not null,
FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id)
);

create table IF NOT EXISTS News(
new_id int primary key not null auto_increment,
title nvarchar(255) not null,
content nvarchar(255) not null,
created_date date not null
);

create table IF NOT EXISTS NewsMedia(
new_id int primary key not null auto_increment,
media_id int not null,
FOREIGN KEY (new_id) REFERENCES News(new_id),
FOREIGN KEY (media_id) REFERENCES Media(media_id)
);

create table IF NOT EXISTS StoryMedia(
story_id int not null auto_increment,
media_id int not null,
FOREIGN KEY (story_id) REFERENCES Story(story_id),
FOREIGN KEY (media_id) REFERENCES Media(media_id)
);
 
create table IF NOT EXISTS GeneralReport(
generalreport_id int primary key not null,
attachment varchar(255) not null,
created_at date not null,
campaign_id int not null,
current_Status_id int not null,
FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id),
FOREIGN KEY (current_Status_id) REFERENCES Current_Status(current_Status_id)
);

INSERT INTO Role (role_id, name, description)
VALUES 
(1, 'Admin', 'Người quản lý tài khoản của hệ thống'),
(2, 'trưởng nhóm', 'Người sử dụng hệ thống VCMS phê duyệt hoặc từ chối chiến dịch và quản lý báo cáo tổng hợp '),
(3, 'trưởng ban kế hoạch', 'Người sử dụng hệ thống VCMS tạo chiến dịch, quản lý báo cáo công việc và các mốc quan trọng'),
(4, 'trưởng ban sự kiện', 'Người sử dụng hệ thống VCMS quản lý tin tức, câu chuyện và phương tiện truyền thông'),
(5, 'kế toán', 'Người sử dụng hệ thống VCMS quản lý báo cáo tài chính');

INSERT INTO Profile (profile_id, first_name, last_name,avatar,address, status)
VALUES 
(1, 'Thành', 'Nguyễn Khắc','D:\Project_1\project\image\imageUser\image_admin.jpg','Đống Đa-Hà Nội',1),
(2, 'Tuấn Anh', 'Trương','D:\Project_1\project\image\imageUser\image_TruongNhom.jpg','Qùy Hợp-Nghệ An',1),
(3, 'Oanh Nhã', 'Phan Thị ','D:\Project_1\project\image\imageUser\image_KeHoach.JPG','Đống Đa-Hà Nội',1),
(4, 'Thương', 'Trần Thị','D:\Project_1\project\image\imageUser\image_SuKien.jpg','Đống Đa-Hà Nội',1),
(5, 'Lan Anh', 'Lương Thị','D:\Project_1\project\image\imageUser\image_KeToan.JPG','Đống Đa-Hà Nội',1);

INSERT INTO Department (department_id, name, description)
VALUES 
(1, 'ban kế hoạch', 'Tìm kiếm các chương trình, chiến dịch hay mô hình tình nguyện phù hợp với Đội trong quá trình hoạt động.
'),
(2, 'ban truyền thông&sự kiện', 'nhiệm vụ thông tin liên lạc và tuyên truyền trong và ngoài Đội, trách  nhiệm chính là xây dựng và đảm bảo hình ảnh của Đội thông qua các hình thức truyền thông khác nhau.
Thực hiện nhiệm vụ chính là tổ chức các hoạt động, chương trình, sự kiện của Đội.'),
(3, 'ban hậu cần', 'Chịu trách nhiệm về các hoạt động văn thể, học tập, đời sống, nhận và giải đáp thắc mắc các vấn đề được đưa ra của các thành viên.');

INSERT INTO User (user_id, password, email,phone,role_id,profile_id,department_id,status)
VALUES 
(1, '123456789', 'admin123@gmail.com','0373225156',1,1,1,1),
(2, '123456789', 'tuananh123@gmail.com','0369146287',2,2,1,1),
(3, '123456789', 'oanh123@gmail.com','0853331556',3,3,1,1),
(4, '123456789', 'thuong123@gmail.com','0366556451',4,4,2,1),
(5, '123456789', 'lan123@gmail.com','0369146287',5,5,3,1);


INSERT INTO Current_Status(current_Status_id, name, description)
VALUES 
(1, 'bắt đầu', 'trạng thái mới bắt đầu'),
(2, 'chưa hoàn thành', 'những công việc chưa hoàn thành'),
(3, 'hoàn thành', 'những công việc đã hoàn thành');

INSERT INTO Campaign (campaign_id, name, start_date,end_date, description,title, location, current_Status_id)
VALUES 
(1, 'Mùa hè Xanh năm 2019', '2019-07-07','2019-07-18','','','Xã Thanh Đức - Huyện Thanh Chương',3),
(2, 'Mùa hè Xanh năm 2020', '2020-07-11','2020-07-23','','','Xã Châu Tiến - Huyện Quỳ Hợp',3),
(3, 'Mùa hè Xanh năm 2022', '2022-07-18','2022-07-29','','','Xã Nga My - Huyện Tương Dương',3),
(4, 'Mùa hè Xanh năm 2023', '2023-07-27','2023-08-07','','','Xã Bắc Sơn - Huyện Quỳ Hợp',3);

INSERT INTO TaskReport (taskreport_id, name, description,title,due_date, note, current_Status_id,campaign_id)
VALUES 
(1, 'Tổ chức Khám phát thuốc miễn phí','Khám sơ bộ các yếu tố sinh tồn để sàng lọc bệnh nhân.Khám trực tiếp và chẩn đoán bệnh, đưa ra khuyến nghị và kê đơn thuốc cho bệnh nhân.
Phát thuốc miễn phí cho bệnh nhân','khám thuốc cho người nghèo','2023-08-01','note1',3,4),
(2, 'Vệ sinh môi trường','Trồng cây, hoa, dọn dẹp vệ sinh, cải tạo đường góp phần xây dựng nông thôn mới','Môi trường xanh','2023-08-05','note1',3,4);


INSERT INTO Issues (issue_id, title, description,priority, assignee,due_date, current_Status_id, user_id, taskreport_id)
VALUES 
(1, 'thiếu ngân sách', 'không đủ ngân sách để thực hiện mua thuốc phát như dự kiến',1,'ban kế hoạch','2019-07-15',3,5,1),
(2,'thiếu tình nguyện viện' , 'không đủ tình nguyện viên dự kiến',2,'ban kế hoạch','2023-07-25',3,3,2);

INSERT INTO FinancialReport (financialreport_id, name, amount,total_expenses, description, created_at, note,campaign_id,user_id)
VALUES 
(1, 'mua thuốc', 10000000,20000000,'cần mua để khám phát thuốc miễn phí cho 100 người nghèo','2023-08-01','note1',4,3),
(2, 'mua dụng cụ lao động', 10000000,20000000,'cần mua để khám phát thuốc miễn phí cho 100 người nghèo','2023-08-01','note1',4,2),
(3, 'tiền xe di chuyển', 10000000,30000000,'tiền xe di chuyển từ hà nội đến địa điểm tình nguyện đã thuê 5 xe ô tô lớn','2023-07-27','note1',4,3);

INSERT INTO GeneralReport (generalreport_id, attachment, created_at, campaign_id,current_Status_id)
VALUES 
(1, '', '2019-07-18',2,3),
(2, '', '2020-07-23',2,3),
(3, '', '2022-07-29',3,3),
(4, '', '2023-08-07',4,3);

INSERT INTO Donors (donor_id, name, image, amount,donate_date, description, campaign_id)
VALUES 
(1, 'Lê Phùng Thành', '',1000000,'2023-07-28','ủng hộ chiến dịch mùa hè xanh',4),
(2, 'Phan Văn Tân', '',1000000,'2023-07-28','ủng hộ chiến dịch mùa hè xanh',4);

INSERT INTO Milestiones (milestione_id, name, description, create_at,end_date, campaign_id, current_Status_id)
VALUES 
(1, 'khởi tạo chiến dịch', 'Bắt đầu các cuộc họp, lên ý kiến,ý tưởng,phân công công việc trong chiến dịch','2023-07-20','2023-07-27',4,3),
(2, 'Thực hiện chiến dịch', 'Đến địa điểm thực hiện, thực hiện các task được giao trong chiến dịch ','2023-07-27','2023-08-01',4,3),
(3, 'kết thúc chiến dịch', 'Tổng kết chiến dịch và khen thưởng','2023-08-02','2023-08-07',4,3);

INSERT INTO RequestVolunteer (id, name, email, phone,date_of_birth, address, department_request, time_free,status,campaign_id)
VALUES 
(1, 'Nguyễn Thị An', 'annguyen008@gmail,com','0835652456','2000-07-08','Hà Nội','ban truyền thông','chơi game',1,4),
(2, 'Nguyễn Thị Bình An', 'binhannguyen001@gmail,com','0956787345','2001-07-10','Hà Nội','ban truyền thông','nghe nhạc',1,4);

INSERT INTO Story (story_id, name, content, title, created_at, campaign_id) 
VALUES 
(1, 'câu chuyện mùa hè xanh 2018', '', '', '2018-07-01', 1);
