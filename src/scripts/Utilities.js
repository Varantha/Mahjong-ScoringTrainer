function isInViewport(element,direction) {
    const rect = element.getBoundingClientRect();
    return (
        ((rect.top >= -50) || direction === "down") &&
        rect.left >= 0 &&
        ((rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) || direction === "up") &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
}

function scrollToOffset(y){
    window.scrollTo({
        top: y,
        behavior: 'smooth',
    });
}

export {isInViewport, scrollToOffset}