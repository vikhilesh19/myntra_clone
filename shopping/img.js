console.log('javaScript');

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
                <button class="btn_add_bag">Add to Bag</button>
            </div>
            `
});
let itemscontainerElement=document.querySelector('.items_container');
itemscontainerElement.innerHTML=innerHTML;