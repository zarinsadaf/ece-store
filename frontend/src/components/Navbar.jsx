import { Link } from "react-router-dom";
import {  HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png"
import ecelogo from "../assets/ECE_Logo.jpg"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    {name: "Dashboard", href:"/user-dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
]

const Navbar = () => {

    const  [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems);
   
    const {currentUser, logout} = useAuth()
    
    const handleLogOut = () => {
        logout()
    }

    const token = localStorage.getItem('token');
  
    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
  <nav className="relative flex items-center justify-between w-full">

    {/* Logo - Left side */}
    <div className="flex items-center">
      <img 
        src={ecelogo} 
        alt="logo"
        className="w-24 h-24 object-contain"
      />
    </div>

    {/* Search input - Centered */}
    <div className="absolute left-1/2 transform -translate-x-1/2 sm:w-72 w-48">
      <div className="relative">
        <IoSearchOutline className="absolute left-4 top-2.5 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search here"
          className="bg-[#EAEAEA] w-full py-2 pl-10 pr-4 rounded-md focus:outline-none"
        />
      </div>
    </div>

    {/* Right side - User and Cart */}
    <div className="flex items-center space-x-3">
      <div>
        {
          currentUser ? (
            <>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img 
                  src={avatarImg} 
                  alt="" 
                  className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} 
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-4 top-20 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                        <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : token ? (
            <Link to="/dashboard" className="border-b-2 border-primary">Dashboard</Link>
          ) : (
            <Link to="/login">
              <HiOutlineUser className="size-6" />
            </Link>
          )
        }
      </div>

      {/* Cart */}
      <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
        <HiOutlineShoppingCart />
        <span className="text-sm font-semibold sm:ml-1">
          {cartItems.length > 0 ? cartItems.length : 0}
        </span>
      </Link>
    </div>
    
  </nav>
</header>
    )
}

export default Navbar;