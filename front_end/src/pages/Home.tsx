import { useEffect, useState } from "react";

import MainDisplay from "@/components/MainDisplay";
import LineChart from "@/components/LineChart";

interface User {
    userId: string;
    userName: string;
    userImg: string;
    age: number;
    contact: string;
    closeContacts: string[];
    coordinates: number[];
    data: DataType[];
}

interface DataType {
    index: number;
    time: string;
    heartrate: number;
}

// Defining the Home component responsible for rendering the home page content
export default function Home() {

    const [user, setUser] = useState<User | null>(null);

    const [lastDataItem, setLastDataItem] = useState(user?.data[user?.data.length - 1]);
    const [bpmValue, setBpmValue] = useState(lastDataItem?.heartrate);
    const [bpmStatus, setBpmStatus] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://be-my-doctor-backend.vercel.app/api/get-user-data/a8heAuUJH690NjgV5mdy");
                console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data[0]);
                    console.log(user);
                } else {
                    console.error("Something went wrong");
                    // throw new Error("Something went wrong");
                }
            } catch (error) {
                console.error(error);
            }
        };

        console.log(user);

        fetchData();
    }, []);

    useEffect(() => {
        if (user && user.data.length > 0) {
            const lastData = user.data[user.data.length - 1];
            setLastDataItem(lastData);
            setBpmValue(lastData.heartrate);
            // Determine bpmStatus based on bpmValue
            setBpmStatus(() => {
                if (bpmValue && bpmValue > 60 && bpmValue < 80) {
                    return 1;
                } else if (bpmValue && bpmValue > 120) {
                    return 3;
                } else {
                    return 2;
                }
            });
        }
    }, [user]);

    return (
        // Container div for the entire home page content
        <div className="flex h-full pb-[15vh] flex-col w-full items-center justify-center">

            {user ? (
                <>
                    <MainDisplay user={user} />
                    <LineChart user={user} />
                    <span className="flex text-gray-400 mt-9">This is a demo</span>
                </>
            ) : (
                <p>Loading...</p>
            )}

            {bpmStatus === 3 ? (
                <div className="flex absolute h-[100%] w-[100%] bg-slate-300 opacity-80">
                    <h1 className="flex self-center text-4xl p-3">
                        PERIGO! Seu batimento cardíaco está muito alto. Estamos acionando uma ambulância para o seu local e entrando em contato com os mais próximos
                    </h1>
                </div>
            ) : null}

            {/* <footer className="text-center bg-sky-900 text-white p-4 mt-auto w-full">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </footer> */}
        </div>
    );
}
