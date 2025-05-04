import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error getting orders data</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found!</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="border p-4 rounded shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500"># Order {index + 1}</p>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <h2 className="font-bold mb-2 text-lg">Order ID: {order._id}</h2>
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Student ID:</strong> {order.studentId}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p>
                <strong>Size:</strong> {order.size}
              </p>
              <p>
                <strong>Sleeve Type:</strong> {order.sleeveType}
              </p>
              <p>
                <strong>Name on Jersey:</strong> {order.NameOnJersey}
              </p>
              <p>
                <strong>Number on Jersey:</strong> {order.NumberOnJersey}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Total Price:</strong> ৳{order.totalPrice}
              </p>
              <div className="mt-3">
                <h3 className="font-semibold">Product IDs:</h3>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {order.productIds.map((productId) => (
                    <li key={productId}>{productId}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;