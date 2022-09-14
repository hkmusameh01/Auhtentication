BEGIN;

DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS comments cascade;
DROP TABLE IF EXISTS posts cascade;
DROP TABLE IF EXISTS user_vote_comment cascade;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  user_id INT,
  content TEXT NOT NULL,
  -- is_voting BOOLEAN DEFAULT false,
  votingNumber INT DEFAULT 0,
  CONSTRAINT fk_user_post FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  user_id INT,
  post_id INT,
  content TEXT NOT NULL,
  CONSTRAINT fk_user_comment FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_post_comment FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE user_vote_comment(
  user_id INT,
  post_id INT,
  is_voting BOOLEAN DEFAULT false,
  CONSTRAINT pkey__vote PRIMARY KEY (user_id, post_id),
  CONSTRAINT fk_user_votes FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_comments FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
);

COMMIT;