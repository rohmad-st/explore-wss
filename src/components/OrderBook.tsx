import React, { useState, useEffect } from 'react';

interface OrderBookProps {}

const OrderBook: React.FC<OrderBookProps> = () => {
  const [orders, setOrders] = useState({
    asks: [],
    bids: [],
    microtimestamp: '',
    timestamp: ''
  });
  const currencyPair = 'btcusd';

  const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

  useEffect(() => {
    const subscribe = {
      event: 'bts:subscribe',
      data: {
        channel: `order_book_${currencyPair}`
      }
    };
    const ws = new WebSocket('wss://ws.bitstamp.net');

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setOrders(response.data);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [currencyPair]);

  console.log('orders', orders);

  const { bids, asks } = orders;
  const orderHead = (title: string) => (
    <thead>
      <tr>
        <th colSpan={2}>{title}</th>
      </tr>
      {currencyArray && (
        <tr>
          <th>Amount ({currencyArray[0]})</th>
          <th>Price ({currencyArray[1]})</th>
        </tr>
      )}
    </thead>
  );
  const orderRows = (arr: any[]) =>
    arr &&
    arr.map((item: any, index: number) => (
      <tr key={index}>
        <td> {item[1]} </td>
        <td> {item[0]} </td>
      </tr>
    ));
  return (
    <div className="order-container">
      <table>
        {orderHead('Bids')}
        <tbody>{orderRows(bids)}</tbody>
      </table>

      <table>
        {orderHead('Asks')}
        <tbody>{orderRows(asks)}</tbody>
      </table>
    </div>
  );
};

export default OrderBook;
