import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './pages/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'

// interface User {
// 	userId: string;
// 	userName: string;
// 	userImg: string;
// 	age: number;
// 	contact: string;
// 	closeContacts: string[];
// 	coordinates: number[];
// 	data: DataType[];
// }

// interface DataType {
// 	index: number;
// 	time: string;
// 	heartrate: number;
// }

function App() {

	// const [user, setUser] = useState<User | null>(null);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await fetch("https://be-my-doctor-backend.vercel.app/api/get-user-data/a8heAuUJH690NjgV5mdy");
	// 			console.log(response);
	// 			if (response.ok) {
	// 				const data = await response.json();
	// 				setUser(data[0]);
	// 				console.log(user);
	// 			} else {
	// 				console.error("Something went wrong");
	// 				// throw new Error("Something went wrong");
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};

	// 	console.log(user);

	// 	fetchData();
	// }, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />} >
					{/* <Route path="/" element={<Home user={user} />} /> */}
					<Route path="/" element={<Home />} />
					{/* <Route path="/profile" element={<Profile user={user} />} /> */}
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
