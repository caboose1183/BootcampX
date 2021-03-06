SELECT cohorts.name as name, avg (completed_at - started_at) as average_assistance_time

FROM cohorts 

JOIN students ON cohorts.id = students.cohort_id

JOIN assistance_requests ON students.id = assistance_requests.student_id

GROUP BY cohorts.name;