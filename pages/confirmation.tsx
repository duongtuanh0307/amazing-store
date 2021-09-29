import React, { FC, useContext } from "react";
import { Store } from "../components/Store";
import { ShoppingCartTable } from "../components/ShoppingCartTable";
import dynamic from "next/dynamic";

const Confirmation: FC = () => {
  const { state } = useContext(Store);
  const { order } = state;

  if (!order)
    return (
      <h3 className='w-full flex justify-center text-xl font-semibold'>
        No Data To Display
      </h3>
    );

  return (
    <div className='w-full flex flex-col justify-center px-8'>
      <h3 className='w-full text-3xl font-semibold pb-8'>{`Order ${order.id}`}</h3>
      <div className='flex'>
        <div className='flex flex-col w-full mr-12'>
          <div className='border border-gray-200 rounded p-4 mb-4'>
            <h5 className='font-semibold text-xl pb-4'>Customer Details</h5>
            <p>{`${order.customer.firstname} ${order.customer.lastname}`}</p>
            <p>{order.customer.email}</p>
          </div>
          <div className='border border-gray-200 rounded p-4 mb-4'>
            <h5 className='font-semibold text-xl pb-4'>Shipping Details</h5>
            <p>{order.shipping.name}</p>
            <p>{order.shipping.street}</p>
            <p>{`${order.shipping.town_city} ${order.shipping.postal_zip_code}`}</p>
            <p>{order.shipping.country}</p>
          </div>
          <div className='border border-gray-200 rounded p-4 mb-4'>
            <h5 className='font-semibold text-xl pb-4'>Payment Details</h5>
            {order.transactions && order.transactions[0] ? (
              <>
                <p>{order.transactions[0].gateway_name}</p>
                <p>{`Card number: **** **** **** ${order.transactions[0].gateway_reference}`}</p>
                <p>
                  {`Transaction ID: ${order.transactions[0].gateway_transaction_id}`}
                </p>
              </>
            ) : (
              <p>No Payment Found</p>
            )}
          </div>
          <div className='border border-gray-200 rounded p-4 mb-4'>
            <h5 className='font-semibold text-xl pb-4'>Order Items</h5>
            <div className='w-11/12'>
              <ShoppingCartTable notEditable items={order.order.line_items} />
            </div>
          </div>
        </div>

        <div className='flex flex-col h-64 w-96 min-w-96 border border-gray-200 rounded p-8'>
          <h5 className='font-semibold text-xl pb-4'>Order Summary</h5>
          <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{`$${order.order.subtotal.raw}`}</p>
          </div>
          <div className='flex justify-between'>
            <p>Tax</p>
            <p>{`$${order.order.tax?.amount.raw || 0}`}</p>
          </div>
          <div className='flex justify-between'>
            <p>Shipping</p>
            <p>{`$${order.order.shipping.price.raw}`}</p>
          </div>
          <div className='flex justify-between'>
            <p>Total</p>
            <p>{`$${order.order.total_with_tax.raw}`}</p>
          </div>

          <div className='flex justify-between mt-4 text-xl font-semibold'>
            <p>Total Paid</p>
            <p className='text-2xl text-green-700'>{`$${order.order.total_with_tax.raw}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Confirmation), {
  ssr: false,
});
