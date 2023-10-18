


INSERT INTO users (name, email, password)
VALUES ('Megan', 'megan@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kimmy', 'kimmy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Tessa', 'tess@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Megans Spiritual Retreat', 'This is a description of a really nice place', 'n/a', 'n/a', 69, 2, 1, 2, 'Canada', '20th Street', 'Vancouver', 'BC', '12345', true),
(2, 'Kimmys anger room', 'This is a description of a really angry place', 'n/a', 'n/a', 99, 2, 1, 2, 'Canada', '12th Street', 'Vancouver', 'BC', '12345', true),
(3, 'Tess Dog Retreat', 'This is a description of a puppy kennel', 'n/a', 'n/a', 50, 0, 1, 2, 'Canada', 'Tempe crescent', 'Vancouver', 'BC', '12345', true),
(4, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 93061, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', true),
(5, 'Blank corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 85234, 6, 6, 7, 'Canada', '651 Nami Road', 'Bohbatev', 'Alberta', '83680', true),
(6, 'Habit mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 46058, 0, 5, 6, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', '44583', true);



INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2023-06-19', '2024-01-01', 2, 1),
('2023-06-19', '2024-01-01', 1, 3),
('2023-06-19', '2024-01-01', 3, 2),
('2018-09-11', '2018-09-26', 2, 3), 
('2019-01-04', '2019-02-01', 2, 2),
('2023-10-01', '2023-10-14', 1, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 7, 5, 'message'),
(3, 1, 8, 5, 'message'),
(2, 3, 9, 5, 'message'),
(6, 2, 10, 3, 'messages'),
(2, 2, 11, 4, 'messages'),
(3, 1, 12, 4, 'messages');

