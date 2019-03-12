SELECT * FROM sim3users
WHERE username = $1
AND
password = $2;