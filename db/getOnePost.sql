SELECT p.title , p.img, p.content, u.username , u.profilepic
FROM sim3users u
JOIN sim3posts p
ON p.author_id  = u.id  
WHERE p.id = $1