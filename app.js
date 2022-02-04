require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareaBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB()
    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB );
    }
    do {
        // Imprimir el Menu
        opt = await inquirerMenu();

        switch ( opt ) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
                case '4':
                tareas.listarPendientesCompletadas( false );
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await  listadoTareaBorrar( tareas.listadoArr );
                if( id !== '0' ){
                    const confirmarBorrar = await confirmar( 'Are you sure?' );
                    if ( confirmarBorrar ){
                        tareas.borrarTarea( id );
                        console.log('TAREA BORRADA EXITOSAMENTE'.blue);
                    }
                }
                break;
            case '0':
                // 
                break;
            default:
                break;
        }
        
        guardarDB( tareas.listadoArr );
        if( opt !== '0' ) await pausa();
    } while ( opt !== '0');

}

main();