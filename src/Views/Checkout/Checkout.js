import React from 'react';

const Checkout = () => {

    return (
        <div className="content">
            <div className="heading"> Checkout</div>

            <div className="checkout-container">
                <div className="billing-details">
                    <h1>Billing Details</h1>
                    <form>
                        <label>FULL NAME *</label>
                        <input type="text" />
                        <label>Country</label>
                        <input type="text" required />
                        <label>TOWN / CITY *</label>
                        <input type="text" required />
                        <label>STATE / ZONE *</label>
                        <input type="text" required />
                        <label>STREET ADDRESS </label>
                        <input type="text" />
                        <label>PHONE *</label>
                        <input type="text" required />
                        <label>EMAIL ADDRESS *</label>
                        <input type="text" required />
                    </form>
                </div>

                <div className="cart-details">
                    
                        <table>
                            <tr className="border">
                                <td className="product-name">Product</td>
                                <td className="price">Price</td>
                            </tr>
                            <tr className="border">
                                <td className="product-name">Iphone</td>
                                <td className="price"><span>$</span>100</td>
                            </tr>
                            <tr className="border">
                                <td className="product-name">Iphone</td>
                                <td className="price"><span>$</span>100</td>
                            </tr>
                        </table>
                    


                    <table>
                        <tr>
                            <td><div>SUBTOTAL</div></td>
                            <td><div className="amt">$250</div></td>
                        </tr>

                        <tr>
                            <td><div>Tax</div></td>
                            <td><div className="amt">$0</div></td>
                        </tr>
                        <tr>
                            <td><div>Total</div></td>
                            <td><div className="amt">$250</div></td>
                        </tr>
                    </table>
                    <button className="checkout">Place Order</button>
                </div>

            </div>


        </div>
    )

}

export default Checkout;
