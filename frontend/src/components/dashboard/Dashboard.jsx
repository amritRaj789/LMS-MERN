import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import StatsCards from './StatsCards.jsx';
import CoursesCard from './CoursesCard.jsx';
import './Styles/Style.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router';
import Settings from './Settings.jsx';

const Dashboard = ({user, setUser}) => {
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
                    <Route path="/settings" element={<Settings user={user} setUser={setUser}/>} />
                </Routes>
            </div>    
        </div> 
    )
}

//  //Old Dashboard layout without nested routes
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