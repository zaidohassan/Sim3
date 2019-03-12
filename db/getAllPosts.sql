SELECT p.title , p.author_id, u.username , u.profilepic, p.id
FROM sim3users u
JOIN sim3posts p
ON p.author_id  = u.id  