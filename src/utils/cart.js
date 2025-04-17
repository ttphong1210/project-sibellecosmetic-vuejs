import eventBus from "./eventBus";

class CartService{
    
    static getCart(){
        const saveCartData = localStorage.getItem("cart");
        return saveCartData ? JSON.parse(saveCartData) : [];
        
    }
    
    static saveCartToLocalStorage(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static removeFromCart(productId){
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        this.saveCartToLocalStorage(cart);
        eventBus.emit('load-cart');
    }
    static addToCart(product) {
        try {
            let cart = this.getCart();
            const cartItemIndex = cart.findIndex(item => item.id === product.prod_id);
            if (cartItemIndex !== -1) {
                cart[cartItemIndex].quantity++;
            } else { 
                cart.push({
                     id: product.prod_id,
                     name: product.prod_name,
                     slug: product.prod_slug,
                     price: product.prod_price,
                     img_url: product.prod_img,
                     quantity: 1 
                    });
            }
            this.saveCartToLocalStorage(cart); // Lưu lại giỏ hàng
            alert('Thêm sản phẩm vào giỏ hàng thành công !');
           eventBus.emit("load-cart");

        } catch (error) {
            alert("Lỗi khi thêm vào giỏ hàng, vui lòng thử lại!");
            console.error(error);
            throw error;
        }
    }

    static updateCart(id, quantity){
        if(quantity < 1) return;
            let cart = this.getCart();
            const cartItem = cart.findIndex(item => item.id === id);
            cart[cartItem].quantity = quantity;
            this.saveCartToLocalStorage(cart);
           eventBus.emit("load-cart");
    }
    static clearCart(){
        localStorage.removeItem('cart');
        eventBus.emit('load-cart');
    }

    
}
export {CartService};