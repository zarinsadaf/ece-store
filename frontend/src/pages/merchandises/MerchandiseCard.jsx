import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const MerchandiseCard = ({ merchandise }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="rounded-lg border p-4 w-full sm:w-64 shadow hover:shadow-md transition-shadow duration-300">
            <Link to={`/merchandises/${merchandise._id}`}>
                <img
                    src={getImgUrl(merchandise?.coverImage)}
                    alt={merchandise?.title}
                    className="w-full h-48 object-cover rounded-md mb-3 hover:scale-105 transition-all duration-200"
                />
            </Link>
            <div className="text-center">
                <Link to={`/merchandises/${merchandise._id}`}>
                    <h3 className="text-lg font-semibold hover:text-blue-600 mb-1">
                        {merchandise?.title}
                    </h3>
                </Link>
                <p className="font-medium mb-2">Price: ৳{merchandise?.price}</p>
                <button
                    onClick={() => handleAddToCart(merchandise)}
                    className="btn-primary px-4 py-2 flex items-center justify-center gap-2 mx-auto"
                >
                    <FiShoppingCart />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default MerchandiseCard;