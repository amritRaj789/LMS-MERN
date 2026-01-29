const CoursesCard = () => {
  const courses = [
    { name: "HTML & CSS", progress: 80 },
    { name: "JavaScript", progress: 65 },
    { name: "Python", progress: 50 },
  ];

  return (
    <div className="courses-card">
      <h3 className="courses-title">Course Progress</h3>

      {courses.map((course, index) => (
        <div className="course-row" key={index}>
          <span className="course-name">{course.name}</span>

          <div className="progress-wrapper">
            <div
              className="progress-bar"
              style={{ width: `${course.progress}%` }}
            />
          </div>

        </div>
      ))}
    </div>
  );
};

export default CoursesCard;