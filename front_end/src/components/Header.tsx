import { useNavigate } from 'react-router-dom';
import { Home, CircleUserRound } from 'lucide-react';

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="bg-sky-500 text-sky-100 px-6 shadow-lg fixed w-full bottom-0 z-20 backdrop-blur-lg">
            <div className="flex justify-between items-center">
                {/* Navigation links */}
                <nav className='w-full'>
                    <ul className="flex justify-around">
                        <li>
                            <button className="flex align-middle flex-col justify-center hover:text-gray-300 rounded-xl p-2"
                                onClick={() => navigate('/')}
                            >
                                <p>Home</p>
                                <Home className='self-center' size={24} />
                            </button>
                        </li>
                        <li>
                            <button className="flex align-middle flex-col hover:text-gray-300 rounded-lg p-2"
                                onClick={() => navigate('/profile')}
                            >
                                <p>Profile</p>
                                <CircleUserRound className='self-center' size={24} />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
