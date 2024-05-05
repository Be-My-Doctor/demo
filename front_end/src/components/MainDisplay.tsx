import { useState, useEffect } from "react";
import { PersonStanding } from "lucide-react";

const MainDisplay = ({ user }: any) => {

    const [lastDataItem, setLastDataItem] = useState(user?.data[user?.data.length - 1]);
    const [bpmValue, setBpmValue] = useState(lastDataItem?.heartrate);
    const [bpmStatus, setBpmStatus] = useState(1);

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

    // useEffect(() => {
    //     if (bpmStatus === 3) {
    //         //implement better alert later
    //         alert("PERIGO! Seu batimento cardíaco está muito alto. Estamos acionando uma ambulância para o seu local e entrando em contato com os mais próximos");
    //     }
    // }, [bpmStatus]);

    // Determine the glow color based on bpmStatus
    let glowColor = "";
    switch (bpmStatus) {
        case 1:
            glowColor = "#34D399"; // Green
            break;
        case 3:
            glowColor = "#EF4444"; // Red
            break;
        case 2:
            glowColor = "#FBBF24"; // Yellow
            break;
        default:
            glowColor = "#FBBF24"; // Default to Yellow
    }

    let backgroundColor = "";
    switch (bpmStatus) {
        case 1:
            backgroundColor = "#D1FAE5"; // Light Green
            break;
        case 3:
            backgroundColor = "#FEE2E2"; // Light Red
            break;
        case 2:
            backgroundColor = "#FEF3C7"; // Light Yellow
            break;
        default:
            backgroundColor = "#FEF3C7"; // Default to Light Yellow
    }

    return (
        <div className="border my-10 border-gray-300 rounded-lg shadow-md py-8 px-6 w-[85%]" style={{ boxShadow: `0 0 20px ${glowColor}`, backgroundColor: backgroundColor }}>
            <div className='flex justify-between'>
                <div className="flex align-baseline items-baseline mb-4">
                    <strong className="font-bold text-3xl">❤️{lastDataItem?.heartrate}</strong>
                    <span className="">BPM</span>
                </div>
                <div className="flex justify-between mb-4">
                    <strong className="text-3xl">
                        {bpmValue > 60 ?
                            (bpmValue < 80 ? <span className="text-green-500">REGULAR</span>
                                :
                                (bpmValue > 120 ? <span className="text-red-500">PERIGO</span>
                                    : <span className="text-orange-500">ATENÇÃO</span>))
                            : <span className="text-orange-500">ATENÇÃO</span>}
                    </strong>
                </div>
            </div>
            <div className="flex items-center w-full">
                <PersonStanding size={24} />
                <div className="flex justify-between w-full">
                    <span className="font-semibold">STATUS:</span>
                    <strong className="text-blue-500 text-xl">EM ATIVIDADE</strong>
                </div>
            </div>
        </div>
    );
};

export default MainDisplay;
