const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lighthousebnb'
});

// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {})

const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */



const getUserWithEmail = function (email) {
  const values = [email];
  const queryString = `SELECT * FROM users WHERE email = $1`;


  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });


};



/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const values = [id];
  const queryString = `SELECT * FROM users WHERE id = $1`;


  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });


};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  console.log('user input: ', user);
  const { name, email, password } = user;

  const values = [name, email, password];
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  `
  return pool
  .query(queryString, values)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

// SELECT reservations.id, title, cost_per_night, start_date, AVG(rating) AS average_rating
// FROM reservations
// JOIN properties ON properties.id = property_id
// JOIN property_reviews ON reservation_id = reservations.id
// WHERE reservations.guest_id = 2
// GROUP BY reservations.id, properties.title, properties.cost_per_night
// ORDER BY start_date
// LIMIT 10;


const getAllReservations = function (guest_id, limit = 10) {

  values = [guest_id, limit];

  const queryString = `
  SELECT reservations.id, title, number_of_bedrooms, number_of_bathrooms, parking_spaces, thumbnail_photo_url, cost_per_night, start_date, AVG(rating) AS average_rating
  FROM reservations
  JOIN properties ON properties.id = property_id
  JOIN property_reviews ON reservation_id = reservations.id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.title, properties.cost_per_night, number_of_bedrooms, number_of_bathrooms, parking_spaces, thumbnail_photo_url
  ORDER BY start_date
  LIMIT $2;
  `

  return pool
  .query(queryString, values)
  .then((result) => {
    console.log(result);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};



/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};



// const getAllProperties = (options, limit = 10) => {
//   console.log(options);
  
//   const queryString = `
//     SELECT * FROM properties LIMIT $1
//     `
//   return pool
    

//     .query(queryString, [limit])
//     .then((result) => {
//       console.log(result.rows);
//       return result.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };


// SELECT properties.id, title, cost_per_night, AVG(rating) AS average_rating
// FROM properties
// JOIN property_reviews ON property_id = properties.id
// WHERE city LIKE '%ancouve%'
// GROUP BY properties.id
// HAVING AVG(rating) > 4
// ORDER BY cost_per_night
// LIMIT 10;





/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {

  const {
    title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code,
    owner_id
  } = property;
  
  const values = [
    title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code,
    owner_id
  ];

  console.log('this is the values array for input: ', values);

  // values = [guest_id, limit];

  const queryString = `
  INSERT INTO properties (title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code, owner_id)
  VALUES ($1, $2, $3, $4, $5, $6 * 100, $7, $8, $9, $10, $11, $12, $13, $14)
  `

  return pool
  .query(queryString, values)
  .then((result) => {
    console.log(result);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
