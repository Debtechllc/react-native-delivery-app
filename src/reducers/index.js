import { combineReducers } from 'redux';

import Auth from './auth';
import Language from './language';
import Navigator from './navigation';
import Profile from './profile';
import Home from './Home';
import Product_Reducer from './Product_Reducer';
import AboutUs from './AboutUs';
import Login_Reducer from './Login_Reducer';
import SignUp from './SignUp';
import AddToCart from './AddToCart';
import ShoppingList from './ShoppingList';
import MyWishlist_Reducer from './MyWishlist_Reducer';
import ContactUs_Reducer from './ContactUs_Reducer';
import AddToWish_Reducer from './AddToWish_Reducer';
import Category_Reducer from './Category_Reducer';
import Brand_Reducer from './Brand_Reducer';
import Product_Details_Reducer from './Product_Details_Reducer';
import My_Cart_Reducer from './My_Cart_Reducer';
import Checkout_Info_Reducer from './Checkout_Info_Reducer';
import GetCountries from './GetCountries';

export default combineReducers({
	Auth,
	Language,
	Navigator,
	Profile,
	Home,
	Product_Reducer,
	Login_Reducer,
	SignUp,
	AddToCart,
	AboutUs,
	ContactUs_Reducer,
	ShoppingList,
	MyWishlist_Reducer,
	AddToWish_Reducer,
	Category_Reducer,
	Brand_Reducer,
	Product_Details_Reducer,
	My_Cart_Reducer,
	Checkout_Info_Reducer,
	GetCountries,
});
