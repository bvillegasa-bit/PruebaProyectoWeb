function guardarCategorias(categorias) {
    localStorage.setItem('categorias', JSON.stringify(categorias))
}

function cargarCategorias() {
    const categoriasData = localStorage.getItem('categorias')
    if (categoriasData) {
        const categoriasArray = JSON.parse(categoriasData)
        return categoriasArray.map(c => new categoria(c.id, c.nombre)) 
    }
    return []
}

function crearCategoria(){
    var IdCategoria = generarIdCategoria()
    var nombreCategoria = document.getElementById('nombreCategoria').value
    var validacion = validarFormularioCategoria()
    if (!validacion) {
        alert("Error al crear el usuario. Verifica los datos ingresados.")
        return null
    }else{
    var nuevaCategoria = new categoria(IdCategoria, nombreCategoria) 
    var categorias = cargarCategorias() 
    categorias.push(nuevaCategoria) 
    guardarCategorias(categorias) 
    mostrarCategoriasEnTabla()
    limpiarFormularioCategoria()
    alert("Categoría creada correctamente")
    return nuevaCategoria 
    }
}

function modificarCategoria(){
    var entradaIdCategoria = document.getElementById('idCategoria').value
    var entradaNombreCategoria = document.getElementById('nombreCategoria').value
    var categorias = cargarCategorias()
    var validacion = validarFormularioCategoria()
    if (!validacion) {
        alert("Error al modificar la categoría. Verifica los datos ingresados.")
        return false
    }   
    var categoriaIndex = categorias.findIndex(c => c.id === entradaIdCategoria)
    if (categoriaIndex !== -1) {
        categorias[categoriaIndex].nombre = entradaNombreCategoria
        guardarCategorias(categorias)
        mostrarCategoriasEnTabla()
        var btnGuardar = document.getElementById('btnGuardarCategoria')
        var btnModificar = document.getElementById('btnModificarCategoria')
        btnGuardar.style.display = 'inline-block'
        btnModificar.style.display = 'none'
        limpiarFormularioCategoria()
        alert("Categoría actualizada correctamente")
        return true
    }else{
        return false
    }
}
function editarCategoria(){
    if (tblCategorias.selectedIndex === -1) {
        alert("Selecciona una fila para editar.")
        return
    }
    var filaSeleccionada = tblCategorias.getElementsByTagName('tr')[tblCategorias.selectedIndex]
    if (!filaSeleccionada || !filaSeleccionada.cells) {
        alert("Fila inválida.")
        return
    }
    var categoriaEncontrada = buscarCategoria(filaSeleccionada.cells[0].innerText)
    if (!categoriaEncontrada) {
        alert("Categoría no encontrada.")
        return
    }
    var entradaIdCategoria = document.getElementById('idCategoria')
    var entradaNombreCategoria = document.getElementById('nombreCategoria')
    entradaIdCategoria.value = categoriaEncontrada.id
    entradaNombreCategoria.value = categoriaEncontrada.nombre
    var btnGuardar = document.getElementById('btnGuardarCategoria')
    var btnModificar = document.getElementById('btnModificarCategoria')
    btnGuardar.style.display = 'none'
    btnModificar.style.display = 'inline-block'
}
function eliminarCategoria(){
    var categorias = cargarCategorias()
    var filaSeleccionada = tblCategorias.getElementsByTagName('tr')[tblCategorias.selectedIndex]
    if (!filaSeleccionada || !filaSeleccionada.cells) {
        alert("Selecciona una fila válida.")
        return false
    }
    var IdCategoria = filaSeleccionada.cells[0].innerText
    var categoriaIndex = categorias.findIndex(c => c.id === IdCategoria)
    if (categoriaIndex !== -1) {
        categorias.splice(categoriaIndex, 1)
        guardarCategorias(categorias)
        mostrarCategoriasEnTabla()
        alert("Categoría eliminada correctamente")
        return true
    }else{
        return false
    }
}
function buscarCategoria(IdCategoria){
    var categorias = cargarCategorias() 
    return categorias.find(c => c.id === IdCategoria) || null 
}

function mostrarCategoriasEnTabla(){
    tblCategorias.tBodies[0].innerHTML = ''
    var categorias = cargarCategorias()
    categorias.forEach((categoria, index) => {
        var fila = tblCategorias.tBodies[0].insertRow(-1)
        fila.onclick = () => {
            tblCategorias.selectedIndex = index + 1 
        }
        var columnaIdUsuario = fila.insertCell(0)
        var columnaNombreCategoria = fila.insertCell(1)
        var columnaAcciones = fila.insertCell(2)
        var btnEditar = crearTagConTexto('button', 'Editar')
        var btnEliminar = crearTagConTexto('button', 'Eliminar')
        btnEditar.classList.add('mini-btn', 'modificar-mini')
        btnEliminar.classList.add('mini-btn', 'eliminar-mini')
        btnEditar.addEventListener('click', (e) => {
            e.stopPropagation()
            editarCategoria()
        })
        btnEliminar.addEventListener('click', (e) => {
            e.stopPropagation()
            if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
                eliminarCategoria()
            } else {
                alert("Eliminación cancelada.")
            }
        })

        columnaIdUsuario.innerText = categoria.id
        columnaNombreCategoria.innerText = categoria.nombre
        columnaAcciones.appendChild(btnEditar)
        columnaAcciones.appendChild(btnEliminar)
    })
}

function generarIdCategoria(){
    const categorias = cargarCategorias ()
    let nuevoId
    if (categorias.length === 0) {
        nuevoId = 1
    } else {
        const ids = categorias.map(u => parseInt(u.id))
        nuevoId = Math.max(...ids) + 1
    }
    return nuevoId.toString().padStart(4, '0')
}


function validarFormularioCategoria() {
    var nombre = document.getElementById('nombreCategoria').value
    if (!nombre) {
        alert("El nombre de la categoría es obligatorio.")
        return false
    }
    return true
}

function cargarCategoriasEnSelect(){
    var categorias = cargarCategorias()
    var selectCategoria = document.getElementById('categoriaProducto')
    selectCategoria.innerHTML = ''
    var opcionSelecciona = crearTagConTexto('option', 'Selecciona')
    opcionSelecciona.value = ''
    selectCategoria.appendChild(opcionSelecciona)
    categorias.forEach(categoria => {
        var opcion = crearTagConTexto('option', categoria.nombre)
        opcion.value = categoria.nombre
        selectCategoria.appendChild(opcion)
    })
}

function botonesInicio(){
    var btnGuardar = document.getElementById('btnGuardarCategoria')
    var btnModificar = document.getElementById('btnModificarCategoria')
    var entradaID = document.getElementById('idCategoria')
    btnGuardar.style.display = 'inline-block'
    btnModificar.style.display = 'none'
    entradaID.disabled = true
}

function limpiarFormularioCategoria(){
    document.getElementById('idCategoria').value = ''
    document.getElementById('nombreCategoria').value = ''
    botonesInicio()
}