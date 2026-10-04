const products=[
 {id:1,name:"Classic White Bedsheet",cat:"bedsheet",price:799,cls:"white",desc:"Clean, timeless everyday comfort."},
 {id:2,name:"Ivory Solid Bedsheet",cat:"bedsheet",price:849,cls:"ivory",desc:"Warm neutral tone for elegant rooms."},
 {id:3,name:"Navy Blue Solid Bedsheet",cat:"bedsheet",price:899,cls:"navy",desc:"Deep premium colour with a modern feel."},
 {id:4,name:"Light Grey Bedsheet",cat:"bedsheet",price:849,cls:"grey",desc:"Soft, versatile shade for modern interiors."},
 {id:5,name:"Premium Pillow Cover",cat:"pillow",price:249,cls:"ivory",desc:"Designed to complete your bedding look."},
 {id:6,name:"Designer Pillow Cover",cat:"pillow",price:299,cls:"navy",desc:"Elegant accent for your bedroom."},
 {id:7,name:"Premium Duvet Cover",cat:"duvet",price:1099,cls:"grey",desc:"A polished finish for your bed."},
 {id:8,name:"Burgundy Solid Bedsheet",cat:"bedsheet",price:899,cls:"burgundy",desc:"Rich colour for a statement bedroom."}
];
let cart=[];
function renderProducts(list=products){
 document.getElementById("products").innerHTML=list.map(p=>`<article class="card"><div class="card-img"><div class="fabric ${p.cls}"></div></div><div class="card-body"><span class="tag">${p.cat.toUpperCase()}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="price">₹${p.price.toLocaleString("en-IN")}</div><button class="add" onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join("");
}
function filterProducts(cat,btn){
 document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 renderProducts(cat==="all"?products:products.filter(p=>p.cat===cat));
}
function addToCart(id){let p=products.find(x=>x.id===id);cart.push(p);renderCart();toggleCart(true)}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.length;
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<div class="empty">Your cart is empty.</div>';}
 else box.innerHTML=cart.map((p,i)=>`<div class="cart-item"><div><b>${p.name}</b><br><small>₹${p.price.toLocaleString("en-IN")}</small></div><button class="remove" onclick="removeItem(${i})">Remove</button></div>`).join("");
 document.getElementById("cartTotal").textContent="₹"+cart.reduce((s,p)=>s+p.price,0).toLocaleString("en-IN");
}
function removeItem(i){cart.splice(i,1);renderCart()}
function toggleCart(force){
 const c=document.getElementById("cart"),o=document.getElementById("overlay");
 const open=force===true||!c.classList.contains("open");c.classList.toggle("open",open);o.classList.toggle("open",open);
}
function checkoutWhatsApp(){
 if(!cart.length){alert("Please add a product first.");return}
 const lines=cart.map(p=>`• ${p.name} - ₹${p.price}`).join("%0A");
 const total=cart.reduce((s,p)=>s+p.price,0);
 const msg=`Hello Fairview Bedding,%0A%0AI want to order:%0A${lines}%0A%0ATotal: ₹${total}%0A%0APlease share availability and payment details.`;
 window.open("https://wa.me/?text="+msg,"_blank");
}
document.getElementById("whatsappMain").href="https://wa.me/?text="+encodeURIComponent("Hello Fairview Bedding, I would like to know about your products.");
renderProducts();renderCart();
