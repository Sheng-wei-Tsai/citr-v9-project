import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import getPastOrders from '../api/getPastOrders'
import {priceConverter} from '../useCurrency'
import getPastOrder from '../api/getPastOrder'
import Modal from '../Modal'

export const Route = createLazyFileRoute('/past')({
  component: PastOrdersRoute,
})


function PastOrdersRoute() {
    const [page, setPage] = useState(1);
    const [foucesdOrder, setFocusedOrder] = useState(null);
    const {isLoading, data} = useQuery({
        queryKey: ['past-orders', page],
        queryFn: () => getPastOrders(page),
        staleTime: 30000,
    });

    const {isLoading: isLoadingPastOrder, data: pastOrderData} = useQuery({
        queryKey: ["past-order", foucesdOrder],
        queryFn: () => getPastOrder(foucesdOrder),
        // one day in milliseconds
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!foucesdOrder
    })

    if(isLoading) {
        return (
            <div className="past-orders">
                <h2>LOADING ...</h2>
            </div>
        );
    }

    return (
        <div className="past-orders">
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Date</td>
                        <td>Time</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.date}</td>
                            <td>{order.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pages">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
                <div>{page}</div>
                <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    )
}