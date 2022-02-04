const inquirer = require('inquirer');
require('colors');

const menuOpt = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        choices: [
            { value: '1', name: `${ '1.'.green } Crear tarea`},
            { value: '2', name: `${ '2.'.green } Listar tareas`},
            { value: '3', name: `${ '3.'.green } Listar tareas completadas`},
            { value: '4', name: `${ '4.'.green } Listar tareas pendientes`},
            { value: '5', name: `${ '5.'.green } Completar tarea(s)`},
            { value: '6', name: `${ '6.'.green } Borrar tarea`},
            { value: '0', name: `${ '0.'.green } Salir`},
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();

    console.log('======================='.green);
    console.log(' Seleccione una opcion '.white);
    console.log('=======================\n'.green);

    const { option } = await inquirer.prompt( menuOpt )
    return option;
}

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt([
        { 
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar` 
        }
    ])
}

const leerInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt( question );
    return desc;
}

const listadoTareaBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: `${ '0'.green } Cancelar`
    });
    
    const opts = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt( opts )
    return id;
}

const confirmar = async ( message ) => {
    const question = [
        { type: 'confirm', name: 'ok', message}
    ]
    const { ok } = await inquirer.prompt( question );
    return ok;
}

const mostrarListadoChecklist = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false 
        }
    });

    const opts = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt( opts )
    return ids;
}

module.exports = {
    confirmar,
    inquirerMenu,
    leerInput,
    listadoTareaBorrar,
    mostrarListadoChecklist,
    pausa
}