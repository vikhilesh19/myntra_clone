let bagitemobjects;
onload();


function onload()
{
    loadbagitemobject();
    displaybagitems();
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
    onload();
}

function generateitemhtml(item){
    return `
            <div class="bag_item_container">
                <div class="item_left_part">
                    <img id="image" src="${item.item_image}" alt="image">
                </div>

                <div class="item_right_part">
                    <div>
                        <div class="company">${item.company_name}</div>
                        <div class="item_name">${item.item_name}</div>
                        <div class="price">
                            <span class="current_price">${item.current_price}</span>
                            <span class="original_price">${item.original_price}</span>
                            <span class="discount">(${item.discount}% OFF)</span>
                        </div>
                        <div class="return_period">
                            <span class="return_period_days">14 days</span> return available
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