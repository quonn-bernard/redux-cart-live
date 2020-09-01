import React, {useState} from 'react'
import useCustomForm from '../hooks/useCustomForm'
import Fade from 'react-reveal/Fade'
import { connect, useDispatch } from 'react-redux'
import { removeFromCart } from '../actions/cartActions'

const Cart = ({cartItems, remove, createOrder}) => {
    const dispatch = useDispatch()
    const [showCheckout, setShowCheckout] = useState(false)
    const initialValues = {
        email: "",
        name: "",
        address: 0
      };
    const {values, errors, touched, handleChange, handleBlur, handleSubmit } = useCustomForm({initialValues, onSubmit: values => console.log('from cart',values)});
    // console.log(cartItems)
    const addOrder = (e) => {
        let order = {
            email: values.email,
            name: values.name,
            address: values.address,
            cartItems: cartItems
        }
        createOrder(order)
        handleSubmit(e)
    }
    
    const removeItem = (item) => {
        dispatch(removeFromCart(item))
    }

    const showForm = () => {
        console.log('clicked', showCheckout)
        setShowCheckout(prevState => !prevState)
    }

    return ( 
        
            <div>
                
            {cartItems.length === 0 ? 'cart is empty': <Fade left cascade> <ul> {cartItems.map(item=>(
               <li key={item._id}>
                   <div>
                       <img src={item.image} />
                       <strong>{item.title}</strong>
                       <p>count:{item.count}</p>
                       <button onClick={()=>removeItem(item)}>Remove</button>
                   </div>
               </li> 
            ))}</ul> </Fade> }
            {" "} | 
            Cart Total:
            ${cartItems.reduce((a,c) => a + c.price * c.count, 0)}
            <br/>
            {showCheckout && cartItems.length && <Fade left ><form onSubmit={(e)=>addOrder(e)}>
                <input type="email" placeholder="Enter Email" name="email" onChange={(e)=> handleChange(e)}/>
                <input type="text" placeholder="Enter Name" name="name" required onChange={(e)=> handleChange(e)} />
                <input type="text" placeholder="Enter Address" name="address" required onChange={(e)=> handleChange(e)}/>
                <button type="submit" >CHECKOUT</button>
            </form></Fade>}
            {" "}
            {cartItems.length && <button style={{margin: '15px 0 0 0'}} onClick={()=> showForm()}>{showCheckout ? 'Continue Shopping' : 'Checkout'}</button>}
            </div>

     );
}
 
export default connect((state) => ({
    cartItems: state.cart.cartItems,
}),
{removeFromCart})(Cart);