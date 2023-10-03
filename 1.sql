select u.id user_Id, u.username username, u.email email, A.artist_id artist_id, A.tagline tagline, A.track_name track_name, A.track_isrc track_isrc
from users u left outer join
    (select a.id as artist_id, a.user_id, a.tagline, t.name as track_name, t.isrc as track_isrc
    from artists a
        left join tracks t on a.id = t.artist_id) A on A.user_id = u.id;