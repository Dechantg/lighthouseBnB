

SELECT properties.city, count(reservations.id) AS reservation_count
FROM properties
JOIN reservations ON property_id = properties.id
GROUP BY city
ORDER BY reservation_count DESC;