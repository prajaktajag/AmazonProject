

function add_to_cart(pid, pname,price)
{
	let cart=localStorage.getItem("cart");
	if(cart==null)
	{
		//no cart Yet
		let products=[];
		let product={productId:pid,productName:pname,productQuantity:1,productPrice:price}
		products.push(product);
		localStorage.setItem("cart",JSON.stringify(products));
		//console.log("Product is added first time ",product)
		showToast("Item Is Added to cart")
	}
	else
	{    
		//cart is allready present
		let pcart  =JSON.parse(cart);
		let oldProduct=pcart.find((item)=>item.productId==pid)
		if(oldProduct){
			
			// we have to increase quantity
	      oldProduct.productQuantity=  oldProduct.productQuantity+1
	      pcart.map((item)=>{
			  
			  if(item.productId==oldProduct.productId)
			  
			  {
				  item.productQuantity = oldProduct.productQuantity;
			  }
		  })
		  
		       localStorage.setItem("cart",JSON.stringify(pcart));
              console.log("Product quantity is increased",oldProduct)
              showToast(oldProduct.productName +"Product quantity is increased",Quantity="+oldProduct.productQuantity")
		  
	      
		}else{
		
		   let product={productId:pid,productName:pname,productQuantity:1,productPrice:price}
           pcart.push(product);
           localStorage.setItem("cart",JSON.stringify(pcart));
           console.log("Product is added",product)
           showToast("Product Is Added to cart")
           
           
		}
	}
	updatecart();
	
}

//update cart
function updatecart()
{
let cartString=	localStorage.getItem("cart");
let cart=JSON.parse(cartString);
if(cart==null || cart.length==0)
{
	console.log(" cart is empty");
	$(".cart-items").html("(0)");
	$(".cart-body").html("<h3>Cart does not have any items </h3>");
	$(".checkout-btn").attr('disabled',true);
	
	
}
else {
    console.log(cart);
    $(".cart-items").html(`(${cart.length})`);
    
    let table =` 
    <table class='table'>
    <thead class='thread-light'>
    <tr>
    <th>Item Name</th><br>
    <th>Price</th>
    <th> Quantity</th>
    <th>Total Price</th>
    <th>Action</th>
    
    </tr>
    </thead>
    
    
    
    
    `;
    
    let totalPrice=0;
    cart.map((item)=>{
    let itemTotal = item.productPrice * item.productQuantity;
    totalPrice += itemTotal;
    table += `
    <tr>
    <td> ${item.productName}</td>
    <td> ${item.productPrice}</td>
    <td> ${item.productQuantity}</td>
    <td> ${item.productQuantity * item.productPrice}</td>
    <td><button onclick='deleteItem(${item.productId})' class='btn btn-danger btn-sm'>Remove</td>
    </tr>
   
    `;
    
   } );
    table=table+`
     <td colspan="5" class="text-right"><strong>Total Price:</strong></td>
        <td>&#8377;${totalPrice}</td>
        <td></td>
    </table>`
    $(".cart-body").html(table);
	$(".checkout-btn").attr('disabled',false);
    console.log("removed")
    
    
    

}
}

//delete Item
function deleteItem(pid)
{
	let cart=JSON.parse(localStorage.getItem('cart'));
	
	let newcart=cart.filter((item)=>item.productId !=pid)
	
	localStorage.setItem('cart',JSON.stringify(newcart));
	updatecart();
	showToast("Item is remove from cart")
	
}
$(document).ready(function() {
    updatecart();
    
    
});



function showToast(content){
   $("#toast").addClass("display");
   $("#toast").html(content);
   setTimeout(()=>{
      $("#toast").removeClass("display");
   
   },2000);
   
 }
 function goToCheckout(){
	 window.location="Checkout.jsp"
 }
 
 