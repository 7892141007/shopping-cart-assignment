function handleCart() {
    console.log('imin ');
    let visible = false;
    if(visible){
        document.querySelector('.cart-dropdown-content').style.setProperty('display', ' ') = '';
        visible = true;
    }else{
       document.querySelector('.cart-dropdown-content').style.setProperty('display', 'block !important');
    }
}