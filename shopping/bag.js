let bagitemobjects;
let total
onload();


function onload()
{
    loadbagitemobject();
    displaybagitems();
    displaybagsummary();
}

function loadbagitemobject(){
    console.log(bagitems);
    bagitemobjects=bagitems.map(itemid=>{
        for(let i=0;i<items.length;i++){
            if(itemid==items[i].id){
                return items[i];
            }
        }
    });
}
console.log(bagitemobjects);

function displaybagitems(){
    let containerelement=document.querySelector('.bag_items_container');
    let innerHTML='';
    bagitemobjects.forEach(bagitem => {
        innerHTML+=generateitemhtml(bagitem);
    });
    containerelement.innerHTML=innerHTML;
}

function removeitem(id){
    bagitems = bagitems.filter(item => item != id);
    localStorage.setItem("bagitems", JSON.stringify(bagitems));
    if(bagitems.length==0){
        document.querySelector('.bag_page').innerHTML=`
        <div class="empty_bag">
            <img src="images/emptybag.png" alt="">
            <div class="light">Hey it feels so light!</div>
            <div class="add_more">There is nothing in your bag.Let's add some items.</div>
        </div>
        `;
    }
    displaybagicon();
    onload();
}

function displaybagsummary(){
    let bagsummaryElement=document.querySelector('.bag_summary');
    let totalitem=bagitemobjects.length;
    let totalMRP=0;
    let totaldiscount=0;
    let finalpayment=0;

    bagitemobjects.forEach(item=>{
        totalMRP+=item.original_price;
        totaldiscount+=(item.original_price-item.current_price);
    })
    finalpayment=totalMRP-totaldiscount+23;
    if(totalitem==0){
        document.querySelector('.bag_page').innerHTML=`
        <div class="empty_bag">
            <img src="images/emptybag.png" alt="">
            <div class="light">Hey it feels so light!</div>
            <div class="add_more">There is nothing in your bag.Let's add some items.</div>
        </div>
        `;
    }
    else{
        bagsummaryElement.innerHTML=`
                    <div class="bag_details_container">
                    <div class="price_header">PRICE DETAILS (${totalitem} Items)</div>
                    <div class="price_item">
                        <span class="price_item_tag">Total MRP</span>
                        <span class="price_item_value">₹${totalMRP}</span>
                    </div>
                    <div class="price_item">
                        <span class="price_item_tag">Discount on MRP</span> 
                        <span class="price_item_value_discount">-₹${totaldiscount}</span>
                    </div>
                    <div class="price_item">
                        <span class="price_item_tag">Platform Fee</span>
                        <span class="price_item_value">₹23</span>
                    </div>
                    <hr>
                    <div class="price_footer">
                        <span class="price_item_tag">Total Amount</span>
                        <span class="price_item_value">₹${finalpayment}</span>
                    </div>
                    <button class="place_order">PLACE ORDER</button>
                </div>`;
    }
}

function generateitemhtml(item){
    let newitemname='';
    if(item.item_name.length>25)
    {
      for(let i=0;i<=25;i++){
        newitemname+=item.item_name[i];
        console.log(newitemname[i]);
      }
      newitemname+='.....';
    }
    else{
        newitemname=item.item_name;
    }
    return `
            <div class="bag_item_container">
                <div class="item_left_part">
                    <img id="image" src="${item.item_image}" alt="image">
                </div>

                <div class="item_right_part">
                    <div>
                        <div class="company">${item.company_name}</div>
                        <div class="item_name" id="item_name">${newitemname}</div>
                        <div class="price">
                            <span class="current_price">${item.current_price}</span>
                            <span class="original_price">${item.original_price}</span>
                            <span class="discount">(${item.discount}% OFF)</span>
                        </div>
                        <div class="return_period">
                            <span class="return_period_days">${item.return_in} days</span> return available
                        </div>
                        <div class="delivery_details">
                            Delivery by
                            <span class="delivery_details_days">5 june 2026</span>
                        </div>
                    </div>
                    <div>
                        <button class="remove_from_bag" onclick="removeitem(${item.id})">X</button>
                    </div>
                </div>
            </div>`;
}