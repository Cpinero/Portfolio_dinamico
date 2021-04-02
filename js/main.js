const grid = new Muuri('.grid',{
    layout:{
        rounding: false
    }
});

window.addEventListener('load',()=>{
    grid.refreshItems().layout;
    document.getElementById('grid').classList.add('imagenes-cargadas');

    //agregamos los listener de los enlaces para filtrar por categoria
    const enlaces = document.querySelectorAll('#categorias a');

    enlaces.forEach( (elemento)=>{
        elemento.addEventListener('click',(e)=>{
            e.preventDefault();
            document.querySelector('#categorias a.activo').classList.remove('activo');
            e.target.classList.add('activo');

            const categoria = e.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') :  grid.filter(`[data-categoria="${categoria}"]`);
        });
    });

    //agregamos el listener para la barra de busqueda

    document.querySelector('#barra-busqueda').addEventListener('input',(e)=>{
        const busqueda = e.target.value;

        grid.filter((item)=> item.getElement().dataset.etiquetas.includes(busqueda) );
    });

    //agregamos listener para las imagenes

    const overlay = document.getElementById('overlay');

    document.querySelectorAll('.grid .item img').forEach((elemento)=>{

        elemento.addEventListener('click',()=>{
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            console.log(descripcion)

            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay #descripcion').innerHTML = descripcion;
        });
    });

    //eventlistener del boton de cerrar

    document.querySelector('#btn-cerrar-popup').addEventListener('click',()=>{
        overlay.classList.remove('activo');
    });

    //eventlistener del overlay

    overlay.addEventListener('click',(evento)=>{
        evento.target.id == 'overlay' ? overlay.classList.remove('activo') : '';
    });

});