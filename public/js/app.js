//Esto lo que hace es poner un timer para que se haga despues
//Para que se haga primero con express y luego con JS Dom
setTimeout(() => {
    document.getElementById('title')
    .innerHTML = 'Javascript DOM y express';
}, 3000);