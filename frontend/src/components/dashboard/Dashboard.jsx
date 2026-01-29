import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import StatsCards from './StatsCards.jsx';
import CoursesCard from './CoursesCard.jsx';
import './Styles/Style.css';

const Dashboard = () => {

    return (
    <div className="app">
        <Sidebar />
        <div className="right-panel">
            <Navbar />
            <div className="content">
                <StatsCards />
                <CoursesCard />
            </div>
        </div>
    </div>
    )
    
}


export default Dashboard;