// Importing the Outlet component from 'react-router-dom' which is used for rendering child components of the current route
import { Outlet } from 'react-router-dom';
// Importing the Header component from the components directory
import Header from '../components/Header';

// Defining the Layout component responsible for rendering the overall layout structure of the application
export default function Layout() {
    return (
        // Container div for the entire layout
        <>
            <div className='w-full h-screen md:flex md:flex-col lg:hidden overflow-y-auto overflow-x-hidden relative'>
                {/* Rendering the Header component */}
                <Header />
                {/* Rendering the child components of the current route */}
                <Outlet />
            </div>
            {/* Conditionally rendering text for smartphone */}
            <p className="hidden lg:block absolute top-[50%] right-[50%] p-4 text-white bg-red-500">Try it on your phone</p>
        </>
    )
}
