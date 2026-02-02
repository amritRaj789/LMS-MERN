import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import StatsCards from './StatsCards.jsx';
import CoursesCard from './CoursesCard.jsx';
import './Styles/Style.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router';
import ProfileInfo from './ProfileInfo.jsx';

const Dashboard = () => {
    return (
        <div className='app'>
            <Sidebar />
            <div className="right-panel">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Navbar />
                            <div className="content">
                                <StatsCards />
                                <CoursesCard />
                            </div>
                        </>
                    } />
                    <Route path="/settings" element={<ProfileInfo/>} />
                </Routes>
            </div>    
        </div> 
    )
}

// const Dashboard = () => {

//     return (
//     <div className="app">
//         <Sidebar />
//         <div className="right-panel">
//             <Navbar />
//             <div className="content">
//                 <StatsCards />
//                 <CoursesCard />
//             </div>
//         </div>
//      </div>
//     )

// }

export default Dashboard;