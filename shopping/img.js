console.log('javaScript');
let bagitems;
onload();
function onload()
{
    let bagitemsstr=localStorage.getItem('bagitems');
    bagitems=bagitemsstr ? JSON.parse(bagitemsstr) : [];
    displaybagicon();
    displayitems();
}


function addtobag(itemid){
    bagitems.push(itemid);
    localStorage.setItem('bagitems',JSON.stringify(bagitems));
    displaybagicon();
}

function displaybagicon(){
    let bagitemcount=document.querySelector('.bag_item_count');
    if(bagitems.length>0){
    bagitemcount.style.visibility='visible';
        bagitemcount.innerText=bagitems.length;
    }
    else{
        bagitemcount.style.visibility='hidden';
    }
}

function displayitems(){
    let itemscontainerElement=document.querySelector('.items_container');
    if(!itemscontainerElement){
        return;
    }
    let innerHTML='';
    items.forEach(item=>{
            innerHTML+=`
                <div class="item_container">
                    <img src="${item.item_image}" alt="img1">
                    <div class="rating">
                        ${item.rating.stars} ⭐ | ${(item.rating.noofreviews/1000)}k
                    </div>
                    <div class="company_name">${item.company_name}</div>
                    <div class="item_name">${item.item_name}</div>
                    <div class="price">
                        <span class="current_price">Rs ${item.current_price}</span>
                        <span class="original_price">Rs ${item.original_price}</span>
                        <span class="discount">(${item.discount}% OFF)</span>
                    </div>
                    <button class="btn_add_bag" onclick="addtobag(${item.id})">Add to Bag</button>
                </div>
                `
    });
    itemscontainerElement.innerHTML=innerHTML;
}