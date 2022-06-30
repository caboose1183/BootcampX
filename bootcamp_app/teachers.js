const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort 

FROM teachers 

JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id

JOIN students ON student_id = students.id

JOIN cohorts ON cohort_id = cohorts.id

WHERE cohorts.name = '${process.argv[2]}'

ORDER BY teachers.name ;
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    })
  }).catch(err => console.error('query error', err.stack));