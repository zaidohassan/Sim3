INSERT INTO sim3users (username, password)
VALUES ($1, $2)
RETURNING *