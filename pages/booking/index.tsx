import Layout from "../../layout/Layout";
import Ticket from "../../components/booking/Ticket";
import {useEffect, useState} from 'react';
import {api} from "../../config/api";
import {useAuth} from "../../context/AuthContext";

const reservation = () => {
    const {user} = useAuth();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        if (!!user) {
            api.get(`reservations/reservationId/${user.id}`).then((res) => {
                setTickets(res.data);
            }).catch(() => {
            })
        }
    }, [user]);

    return (
        <Layout title="reservation">
            <>
                <div className="o-container p-10">
                    <h2 className="separator"> Mes réservations </h2>
                    <div className="flex  flex-row flex-wrap gap-12 mt-16">
                        {
                            tickets && tickets.map((ticket: any, index) => {
                                return <Ticket key={index} number_of_places={ticket.number_of_places}
                                               time_of_session={ticket.time_of_session} total_price={ticket.total_price}
                                               qrcodeImage={ticket.qrcode} name={ticket.activities.name}
                                               date_of_session={ticket.date_of_session}/>
                            })
                        }
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default reservation;
