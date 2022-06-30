const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`];

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort 

FROM teachers 

JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id

JOIN students ON student_id = students.id

JOIN cohorts ON cohort_id = cohorts.id

WHERE cohorts.name LIKE $1

ORDER BY teachers.name ;
`, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    })
  }).catch(err => console.error('query error', err.stack));