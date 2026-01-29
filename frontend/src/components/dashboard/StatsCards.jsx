const StatsCards = () => {
  const stats = [
    { title: "Total Courses", value: 12 },
    { title: "Students", value: 320 },
    { title: "Assignments", value: 48 },
    { title: "Completion Rate", value: "76%" },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <h2 className="stat-title">{item.title}</h2>
          <p className="stat-value">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;