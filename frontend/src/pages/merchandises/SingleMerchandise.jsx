import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchMerchandiseByIdQuery } from '../../redux/features/merchandises/merchandisesApi';

const SingleMerchandise = () => {
    const { id } = useParams();
    const { data: merchandise, isLoading, isError } = useFetchMerchandiseByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading product info</div>;

    return (
        <div className="max-w-lg mx-auto shadow-md p-5">
            <h1 className="text-2xl font-bold mb-4">{merchandise.title}</h1>

            <img
                src={`${getImgUrl(merchandise.coverImage)}`}
                alt={merchandise.title}
                className="mb-6 rounded-md"
            />

            <div className="space-y-3 text-gray-700">
                <p><strong>Description:</strong> {merchandise.description}</p>
                <p><strong>Category:</strong> {merchandise.category}</p>
                <p><strong>Price:</strong> ৳{merchandise.price}</p>
                <p><strong>Available Sizes:</strong> {merchandise.availableSizes?.join(', ')}</p>
                <p><strong>Sleeve Type:</strong> {merchandise.sleeve?.join(', ')}</p>
                <p><strong>Year:</strong> {merchandise.year}</p>
                <p><strong>Added On:</strong> {new Date(merchandise.createdAt).toLocaleDateString()}</p>
            </div>

            <button
                onClick={() => handleAddToCart(merchandise)}
                className="btn-primary mt-6 px-6 space-x-1 flex items-center gap-1"
            >
                <FiShoppingCart />
                <span>Add to Cart</span>
            </button>
        </div>
    )
}

export default SingleMerchandise;