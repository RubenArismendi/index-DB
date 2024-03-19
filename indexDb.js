let db;

document.addEventListener('DOMContentLoaded',()=>{
    //lamar a una fucion para crear ls bd 
    crmDB()

    setTimeout(()=>{
        crearCliente()
    },5000)
})

function crmDB (){
    //crear bd con indexDb
    let crmDB = window.indexedDB.open('crmDB',1)

    // si hay un error
    crmDB.onerror = function(){
        console.log('hay un error');
    }

    //no hay error 
    crmDB.onsuccess =function(){
        console.log('base de datos fue creada');
        db = crmDB.result
    }
    //configurar la base de datos onupgradeneeded
    crmDB.onupgradeneeded = function(e){
        console.log('prueba')
        const db = e.target.result
        const objetcStore = db.createObjectStore('crmDB',{
            keyPath : "crmDB",
            autoIncrement : true
        })
        //definir las columnas
        objetcStore.createIndex('nombre','nombre',{unique:false})
        objetcStore.createIndex('email','email',{unique:true})
        objetcStore.createIndex('telefono',"telefono" ,{unique:false})
        }
    }

function crearCliente(){
    let transaction = db.transaction(['crmDB'],'readwrite')
    transaction.oncomplete = function(){
        console.log('la transaccion ha sido completada');
    }
    transaction.onerror = function(){
        console.log('ha ocurrido un erro');
    }

    //crear un objeto 
    const objetcStore = transaction.objectStore('crmDB');
    const nuevoCliente = {
        nombre: 'Ruben',
        telefono : 123349,
        email: 'ruben12@gmail.com'
    }

    let peticion = objetcStore.add(nuevoCliente)
    console.log(peticion);
}