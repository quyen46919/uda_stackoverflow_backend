-- DROP DATABASE uda_stackoverflow;

USE uda_stackoverflow;


UPDATE UDA_USERS SET ROLE = "user" WHERE id = 1 and email = "quyenviettam1@gmail.com";

-- fix phpmyadmin account error
SELECT * FROM mysql.user WHERE User = 'root';
DELETE FROM mysql.user WHERE User = 'root';

-- create phpmyadmin user
create user nodeuser@localhost identified by 'nodeuser@1234';
grant all privileges on node.* to nodeuser@localhost;
ALTER USER 'nodeuser'@localhost IDENTIFIED WITH mysql_native_password BY 'nodeuser@1234';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password';

-- INSERT DATA
INSERT INTO UDA_USERS(username, email, hash_password, role) VALUES 
('Nguyễn Châu Quyền', 'quyen46919@donga.edu.vn', '123123', 'admin'),
('Nguyễn Châu Phát', 'phat47092@donga.edu.vn', '123123', 'admin'),
('Hoàng Hữu Tài', 'tai40921@donga.edu.vn', '123123', 'user'),
('Hoàng Hữu Nghĩa', 'nghia45612@donga.edu.vn', '123123', 'user'),
('Dương Bình Phương', 'phuong45125@donga.edu.vn', '123123', 'user'),
('Nguyễn Hoàng Nguyên', 'nguyen47721@donga.edu.vn', '123123', 'user');
SELECT * FROM uda_images;
-- ALTER TABLE UDA_USERS MODIFY status TINYINT(1) DEFAULT 0;
 ALTER TABLE UDA_USERS ADD UNIQUE (email);
-- UPDATE UDA_USERS SET status = 1 WHERE email = 'masekikurisu@donga.edu.vn';
DELETE FROM UDA_USERS WHERE email = 'quyenviettamm1@gmail.com';

ALTER TABLE `uda_stackoverflow`.`uda_users` 
ADD COLUMN `reset_password_token` VARCHAR(255) NULL DEFAULT NULL AFTER `avatar`;

INSERT INTO UDA_QUESTIONS(title, content, user_id) VALUES 
('Tôi không thể sử dụng window.scrollTop(0,0) trong React được', "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", 1),
('Tôi muốn trở thành Fullstack web developer thì cần học những gì?', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 1),
('Không thể cài đặt MySQL ở terminal', "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.", 2),
('Không thể sử dụng Synchronize model của MySQLWorkbench', "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", 3),
('Tôi muốn học NodeJS thì nên bắt đầu từ đâu', "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", 4);
SELECT * FROM UDA_QUESTIONS;

INSERT INTO UDA_TAGS(name, description) VALUES
('Javascript', 'JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries.'),
('Java', 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.'),
('HTML', 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.'),
('CSS', 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.'),
('ReactJS', 'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.'),
('NodeJS', 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.');
SELECT * FROM UDA_TAGS;

INSERT INTO UDA_TAGS_IN_QUESTION(question_id, tag_id) VALUES
(1, 1), (1, 2), (1, 4), (2, 2), (2, 3), (2, 5), (3, 3), (3, 6);
SELECT * FROM UDA_TAGS_IN_QUESTION;

INSERT INTO UDA_ANSWERS(content, user_id, question_id) VALUES 
('Insert the missing parts in the JOIN clause to join the two tables Orders and Customers, using the CustomerID field in both tables as the relationship between the two tables.', 1, 1),
('Then, we can create the following SQL statement (that contains an INNER JOIN), that selects records that have matching values in both tables', 2, 1),
('Aliases are used to give a table, or a column in a table, a temporary name.
Aliases are often used to make column names more readable.
An alias only exists for the duration of that query.
An alias is created with the AS keyword.', 4, 2),
('The following SQL statement creates two aliases, one for the CustomerID column and one for the CustomerName column:ssad hslad.', 3, 2),
('The following SQL statement creates two aliases, one for the CustomerName column and one for the ContactName column. Note: Single or double quotation marks are required if the alias name contains spaces', 2, 1);
SELECT * FROM UDA_ANSWERS;

-- QUERY JOIN
-- Lấy ra những câu hỏi của một user
SELECT * FROM UDA_QUESTIONS q LEFT JOIN UDA_USERS u ON q.user_id = u.id
WHERE u.id = 1;
-- Lấy ra những câu trả lời của một câu hỏi
SELECT * FROM UDA_QUESTIONS q LEFT JOIN UDA_ANSWERS a ON q.id = a.question_id
WHERE q.id = 1;

-- Lấy ra full thông tin chỉ tiết của một câu hỏi
SELECT
    q.id,
    q.title,
    q.content,
    q.status,
    q.team_id,
    q.is_resolved,
    u.id as user_id,
    u.username,
    u.avatar,
    GROUP_CONCAT(DISTINCT tag_list.name) as tags,
    q.is_resolved,
    GROUP_CONCAT(DISTINCT JSON_OBJECT(
		'id', a.id,
		'content', a.content,
        'created_at', a.created_at,
		'is_corrected', a.is_corrected,
        'post_user_id', a.post_user_id,
        'user_avatar', a.avatar,
        'username', a.username
	) separator "///") as answers
FROM 
    UDA_QUESTIONS AS q
    INNER JOIN UDA_USERS as u
    INNER JOIN (
		SELECT a.id, a.content, a.is_corrected, a.created_at, a.question_id, u.username, u.id as post_user_id, u.avatar
		FROM UDA_ANSWERS a LEFT JOIN UDA_USERS u ON a.user_id = u.id
	) AS a ON a.question_id = q.id
    INNER JOIN (
		SELECT name, question_id FROM UDA_TAGS t 
        LEFT JOIN UDA_TAGS_IN_QUESTION tiq ON t.id = tiq.tag_id
    ) AS tag_list ON q.id = tag_list.question_id
WHERE q.id = 1 and q.status = 1;

-- tạo câu hỏi mới
INSERT INTO UDA_QUESTIONS (title, content, user_id) 
VALUES ("What is the of use Web3.providers.HttpProvider()", "I don't unde My Guontran itss.HttpProvider('Address')?", 1);

INSERT INTO UDA_QUESTIONS (title, content, team_id, user_id) VALUES ('What is the of use Web3.providers.HttpProvider', 'I dont understand the use of Web3.providers.HttpProvider. My Guess: So when establishing a private network every node should give a different rpcport which identifies it and so it connects to the network. Am I wrong? For example, the above code is used in Frontend for a website in order to connect frontend and deploy a contract in Ethereum Private Network. So the frontend code must be generic which means it should not add specific Ethereum node address in its code. Then what is the use of Web3.providers.HttpProvide?', 2, 3);

-- select tất cả câu hỏi + thông tin người đăng
SELECT q.id, q.title, q.content, q.is_resolved, q.team_id, q.created_at, q.status, u.id as user_id, u.username, u.email, u.avatar
FROM UDA_QUESTIONS q JOIN UDA_USERS u ON  q.user_id = u.id
WHERE q.status = 1;

-- xóa câu hỏi
UPDATE UDA_QUESTIONS q
JOIN UDA_USERS u ON q.user_id = u.id
SET q.status = 2, q.status_message = "Người dùng đã xóa câu hỏi này"
WHERE q.id = 52 AND u.email = "tai40921@donga.edu.vn";

UPDATE UDA_QUESTIONS q
JOIN UDA_USERS u ON q.user_id = u.id
SET q.status = 2, q.status_message = "Người dùng đã xóa câu hỏi này"
WHERE q.id = 49 AND u.email = "quyenviettam1@gmail.com";

