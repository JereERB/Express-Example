
/**
 * Express es una dependencia de mi programa sin eso no funciona
 * Nodemon sirve para revisar el codigo y reinicarlo cada vez que damos ctr+s
 * npm i nodemon -D
 * npx nodemon index.js --> para ejecutarlo con el ctr+s
 * npm i morgan --> este es para el middleware
 * npm i ejs --> motor de plantillas
 */


const express = require('express');
const morgan = require('morgan');
const app = express();

/**
 * Midlleware
 * Se utiliza para todas las peticiones que hagamos en cambio en 
 * el app.all tenemos que expesificar la ruta
 * pasa primero por la funcion y luego ejecuta las rutas
 * 
 * DATO: EL MIDDLEWARE TIENE QUE ESTAR PRIMERO DESPUES DE LLAMARLO XQ O SI
 * NO ME MANDA UNDEFINED
*/

/****************************SETTINGS********************************/

app.set('appName', 'Curso de express');
app.set('port', 3000);
app.set('view engine', 'ejs'); //Motor de plantillas

/****************************MIDDLEWARES******************************/

function logger(req,res, next){
    //Esto es para que me imprima la direccion
    console.log(`Route Received: ${req.protocol}://${req.get('host')}
    ${req.originalUrl}`);
    next();
}

//Esto es para que express entienda los objetos json y nos imprima undefinided
app.use(express.json());
//app.use(logger);
app.use(morgan('dev'));

/****************************RUTAS**********************************/

//Esto es para que cada vez que pasa por un apartado user se imprima pase por aca
app.all('/user', (req,res, next)=>{
    console.log('Pase por aca');
    next();
});


//Este va a ser la ruta de; ejs
app.get('/ejs', (req, res)=>{
    const data = [{name: 'Isaqui'},{name: 'Jeremy'},{name: 'Tania'}]
    res.render('index.ejs',{genteOBJ: data});
});

//Y el get es para poner informacion
app.get('/get', (req, res)=>{
    res.send('PETICION GET RECIVIDA');
});
app.get('/user', (req, res)=>{ 
    //Con esto creamos un objeto json
    res.json({
        username: 'Cameron',
        lastname: 'Brenes'
    });
    
});

//Es para recivir
app.post('/user/:id', (req, res)=>{

    /**
     * Los 2 puntos es para la variable del usuario
     * que se tiene que poner desde postman
    */
    //Esto es para recivir el el usuario tipo json
    console.log(req.body);
    console.log(req.params);//Y con esto lo imprime y lo lee

    //las llaves y el simbolo de dolar es para concatenar
    res.send(`User ${req.params.id} actualizado`);
});

//Es para actualizar
app.put('/user/:id', (req, res)=>{
    console.log(req.body);
    res.send('PETICION ACTUALIZAR RECIVIDA');
});

//Es para eliminar
app.delete('/user/:id', (req, res)=>{
    //Esto es para concatenar en la respuesta
    res.send(`User ${req.params.id} eliminado`);
});

//***************************************************//


//Para que acceda a lo estatico, va a ser la carpeta de la parte visual
app.use(express.static('public'));


//Esto es para abrir el puerto y siempre va de ultimo
app.listen(app.get('port'), () =>{
    //Esto viene del setting 
    console.log(app.get('appName'));
    console.log('servidor funcionando en el puerto:',app.get('port'))
});


