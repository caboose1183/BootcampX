SELECT teachers.name, students.name, assignments.name, (completed_at - started_at) as duration

FROM teachers 
JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id 
JOIN students ON students.id = assistance_requests.student_id 
JOIN assignments ON assignments.id = assistance_requests.assignment_id

ORDER BY duration;