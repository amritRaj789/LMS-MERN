import {Link} from 'react-router';

const Home = ({user, error}) => {
    return(
        <div className="home-style min-h-screen flex-column ">
            <div className="mb-8">
                <h1>Welcome to Duckman Tech</h1>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
                {error && <h1 className="text-red-500">{error}</h1>}
                {user ? 
                (<div className='justify-items-center'>
                    <h2 className="font-bold mb-6 text-gray-900"> Hello, {user.username}</h2>
                    <p className="text-gray-400">You are logged in with Email Id: {user.email}</p>
                    <div className='mt-8 rounded-lg bg-gray-200 w-sm'>
                        <Link className='text-2xl text-white font-bold' to='/dashboard'>Checkout Dashboard</Link>
                    </div>
                </div> ) :
                (<div>
                    <h2 className="text-lg font-bold mb-6 text-gray-900">User not logged in</h2>
                    <p className='text-lg text-gray-900'>Kindly Register or Login to proceed</p>
                    <div className='my-4'>
                        <Link className='w-full bg-blue-200 text-white p-2 mx-2 rounded-md hover:bg-blue-600 font-medium' to="/login">Login</Link>
                        <Link className='w-full bg-blue-200 text-white p-2 mx-2 rounded-md hover:bg-blue-600 font-medium' to="/register">Register</Link>
                    </div>
                </div>)
            }
            </div>
        </div>
    )
}

export default Home;