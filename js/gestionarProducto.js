function guardarProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos))
}

function cargarProductos() {
    const productosData = localStorage.getItem('productos')
    if (productosData) {
        const productosArray = JSON.parse(productosData)
        return productosArray.map(p => new producto(p.idProducto, p.nombreProducto, p.descripcionProducto, p.categoriaProducto, p.costoProducto, p.precioProducto, p.etiquetaProducto, p.estadoProducto, p.imagenProducto, p.fechaRegistro, p.puntosRequeridos))
    }
    return []
}

function crearProducto(){
    var idProducto = generarIdProducto()
    var nombreProducto = document.getElementById('nombreProducto').value
    var descripcionProducto = document.getElementById('descripcionProducto').value
    var categoriaProducto = document.getElementById('categoriaProducto').value
    var costoProducto = document.getElementById('costoProducto').value
    var precioProducto = document.getElementById('precioProducto').value
    var etiquetaProducto = document.getElementById('etiquetaProducto').value
    var estadoProducto = document.getElementById('estadoProducto').value
    var imagenProducto = document.getElementById('imagenProducto').value
    var fechaRegistro = new Date().toISOString("yyyy-mm-dd|hh:mm:ss").split('T')[0]
    var validacion = validarFormularioProducto()
    if (!validacion) {
        alert("Error al crear el producto. Verifica los datos ingresados.")
        return null
    }else{
    var nuevoProducto = new producto(idProducto, nombreProducto, descripcionProducto, categoriaProducto, costoProducto, precioProducto, etiquetaProducto, estadoProducto, imagenProducto, fechaRegistro) 
    var productos = cargarProductos() 
    productos.push(nuevoProducto) 
    guardarProductos(productos) 
    mostrarProductosEnTabla()
    limpiarFormularioProducto()
    alert("Producto creado correctamente")
    return nuevoProducto 
    }
}

function modificarProducto(){
    var entradaIdProducto = document.getElementById('idProducto').value
    var entradaNombreProducto = document.getElementById('nombreProducto').value
    var entradaDescripcionProducto = document.getElementById('descripcionProducto').value
    var entradaCategoriaProducto = document.getElementById('categoriaProducto').value
    var entradaCostoProducto = document.getElementById('costoProducto').value
    var entradaPrecioProducto = document.getElementById('precioProducto').value
    var entradaEtiquetaProducto = document.getElementById('etiquetaProducto').value
    var entradaEstadoProducto = document.getElementById('estadoProducto').value
    var entradaImagenProducto = document.getElementById('imagenProducto').value
    var fechaProducto =new Date().toISOString("yyyy-mm-dd|hh:mm:ss").split('T')[0]
    var productos = cargarProductos()
    var validacion = validarFormularioProducto()
    if (!validacion) {
        alert("Error al modificar el producto. Verifica los datos ingresados.")
        return false
    }   
    var productoIndex = productos.findIndex(p => p.idProducto === entradaIdProducto)
    if (productoIndex !== -1) {
        productos[productoIndex].nombreProducto = entradaNombreProducto
        productos[productoIndex].descripcionProducto = entradaDescripcionProducto
        productos[productoIndex].categoriaProducto = entradaCategoriaProducto
        productos[productoIndex].costoProducto = entradaCostoProducto
        productos[productoIndex].precioProducto = entradaPrecioProducto
        productos[productoIndex].etiquetaProducto = entradaEtiquetaProducto
        productos[productoIndex].estadoProducto = entradaEstadoProducto
        productos[productoIndex].imagenProducto = entradaImagenProducto
        productos[productoIndex].fechaRegistro= fechaProducto
        guardarProductos(productos)
        mostrarProductosEnTabla()
        var btnGuardar = document.getElementById('btnGuardarProducto')
        var btnModificar = document.getElementById('btnModificarProducto')
        btnGuardar.style.display = 'inline-block'
        btnModificar.style.display = 'none'
        limpiarFormularioProducto()
        alert("El producto se ha modificado correctamente")
        return true
    }else{
        return false
    }
}
function editarProducto(){
    if (tblProductos.selectedIndex === -1) {
        alert("Selecciona una fila para editar.")
        return
    }
    var filaSeleccionada = tblProductos.getElementsByTagName('tr')[tblProductos.selectedIndex]
    if (!filaSeleccionada || !filaSeleccionada.cells) {
        alert("Fila inválida.")
        return
    }
    var productoEncontrado = buscarProducto(filaSeleccionada.cells[0].innerText)
    if (!productoEncontrado) {
        alert("Producto no encontrado.")
        return
    }
    var entradaIdProducto = document.getElementById('idProducto')
    var entradaNombreProducto = document.getElementById('nombreProducto')
    var entradaDescripcionProducto = document.getElementById('descripcionProducto')  
    var entradaCategoriaProducto = document.getElementById('categoriaProducto')
    var entradaCostoProducto = document.getElementById('costoProducto')
    var entradaPrecioProducto = document.getElementById('precioProducto')
    var entradaEtiquetaProducto = document.getElementById('etiquetaProducto')
    var entradaEstadoProducto = document.getElementById('estadoProducto')
    var entradaImagenProducto = document.getElementById('imagenProducto')
    entradaIdProducto.value = productoEncontrado.idProducto
    entradaNombreProducto.value = productoEncontrado.nombreProducto
    entradaCategoriaProducto.value = productoEncontrado.categoriaProducto   
    entradaDescripcionProducto.value = productoEncontrado.descripcionProducto
    entradaCostoProducto.value = productoEncontrado.costoProducto
    entradaPrecioProducto.value = productoEncontrado.precioProducto
    entradaEtiquetaProducto.value = productoEncontrado.etiquetaProducto
    entradaEstadoProducto.value = productoEncontrado.estadoProducto
    entradaImagenProducto.value = productoEncontrado.imagenProducto
    entradaDescripcionProducto.value = productoEncontrado.descripcionProducto
    var btnGuardar = document.getElementById('btnGuardarProducto')
    var btnModificar = document.getElementById('btnModificarProducto')
    btnGuardar.style.display = 'none'
    btnModificar.style.display = 'inline-block'
}
function eliminarProducto(){
    var productos = cargarProductos()
    var filaSeleccionada = tblProductos.getElementsByTagName('tr')[tblProductos.selectedIndex]
    if (!filaSeleccionada || !filaSeleccionada.cells) {
        alert("Selecciona una fila válida.")
        return false
    }
    var IdProducto = filaSeleccionada.cells[0].innerText
    var productoIndex = productos.findIndex(p => p.idProducto === IdProducto)
    if (productoIndex !== -1) {
        productos.splice(productoIndex, 1)
        guardarProductos(productos)
        mostrarProductosEnTabla()
        alert("Producto eliminado exitosamente.")
        return true
    }else{
        return false
    }
}
function buscarProducto(IdProducto){
    var productos = cargarProductos() 
    return productos.find(p => p.idProducto === IdProducto) || null 
}


function mostrarProductosEnTabla(){
    tblProductos.tBodies[0].innerHTML = ''
    var productos = cargarProductos()
    productos.forEach((producto, index) => {
        var fila = tblProductos.tBodies[0].insertRow(-1)
        fila.onclick = () => {
            tblProductos.selectedIndex = index + 1 
        }
        var columnaIdProducto = fila.insertCell(0)
        var columnaNombreProducto= fila.insertCell(1)
        var columnaDescripcionProducto= fila.insertCell(2)
        var columnaCategoriaProducto= fila.insertCell(3)
        var columnaCostoProducto= fila.insertCell(4)
        var columnaPrecioProducto= fila.insertCell(5)
        var columnaEtiquetaProducto= fila.insertCell(6)
        var columnaEstadoProducto= fila.insertCell(7)
        var columnaFechaProducto= fila.insertCell(8)
        var columnaAcciones = fila.insertCell(9)
        var btnEditar = crearTagConTexto('button', 'Editar')
        var btnEliminar = crearTagConTexto('button', 'Eliminar')
        btnEditar.classList.add('mini-btn', 'modificar-mini')
        btnEliminar.classList.add('mini-btn', 'eliminar-mini')
        btnEditar.addEventListener('click', (e) => {
            e.stopPropagation()
            editarProducto()
        })
        btnEliminar.addEventListener('click', (e) => {
            e.stopPropagation()
            if (confirm("¿Está seguro de que desea eliminar este producto?")) {
                eliminarProducto()
            } else {
                alert("Eliminación cancelada.")
            }
        })

        columnaIdProducto.innerText = producto.idProducto
        columnaNombreProducto.innerText = producto.nombreProducto
        columnaDescripcionProducto.innerText = producto.descripcionProducto
        columnaCategoriaProducto.innerText = producto.categoriaProducto
        columnaCostoProducto.innerText = producto.costoProducto
        columnaPrecioProducto.innerText = producto.precioProducto
        columnaEtiquetaProducto.innerText = producto.etiquetaProducto
        columnaEstadoProducto.innerText = producto.estadoProducto
        columnaFechaProducto.innerText = producto.fechaRegistro
        columnaAcciones.appendChild(btnEditar)
        columnaAcciones.appendChild(btnEliminar)
    })
}

function generarIdProducto(){
    const productos = cargarProductos()
    let nuevoId
    if (productos.length === 0) {
        nuevoId = 1
    } else {
        const ids = productos.map(p => parseInt(p.idProducto))
        nuevoId = Math.max(...ids) + 1
    }
    return nuevoId.toString().padStart(4, '0')
}


function validarFormularioProducto() {
    var nombre = document.getElementById('nombreProducto').value
    var descripcion = document.getElementById('descripcionProducto').value
    var categoria = document.getElementById('categoriaProducto').value
    var costo = document.getElementById('costoProducto').value
    var precio = document.getElementById('precioProducto').value
    var estado = document.getElementById('estadoProducto').value
    var imagen = document.getElementById('imagenProducto').value
    var etiqueta = document.getElementById('etiquetaProducto').value

    if (!nombre || !descripcion || !categoria || !costo || !precio || !estado ||  !imagen || !etiqueta) {
        alert("Los campos obligatorios no pueden estar vacíos.")
        return false
    }
    return true
}



function botonesInicioProducto(){
    var btnGuardar = document.getElementById('btnGuardarProducto')
    var btnModificar = document.getElementById('btnModificarProducto')
    var entradaId = document.getElementById('idProducto')
    btnGuardar.style.display = 'inline-block'
    btnModificar.style.display = 'none'
    entradaId.disabled = true
}

function limpiarFormularioProducto(){
    document.getElementById('idProducto').value = ''
    document.getElementById('nombreProducto').value = ''
    document.getElementById('descripcionProducto').value = ''
    document.getElementById('categoriaProducto').value = ''
    document.getElementById('costoProducto').value = ''
    document.getElementById('precioProducto').value = ''
    document.getElementById('etiquetaProducto').value = ''
    document.getElementById('estadoProducto').value = ''
    document.getElementById('imagenProducto').value = ''
    botonesInicioProducto()
}
function cargarProductosEnSelect(){
    var productos = cargarProductos()
    var selectProducto = document.getElementById('productosCarrito')
    selectProducto.innerHTML = ''
    var opcionSelecciona = crearTagConTexto('option', 'Selecciona')
    opcionSelecciona.value = ''
    selectProducto.appendChild(opcionSelecciona)
    productos.forEach(producto => {
        var opcion = crearTagConTexto('option', producto.nombreProducto)
        opcion.value = producto.nombreProducto
        selectProducto.appendChild(opcion)
    })
    selectProducto.addEventListener('change', filtrarProductosCarrito)
    mostrarProductosEnDiv()
}


function mostrarProductosEnDiv(productos = null){
    if (!productos) {
        productos = cargarProductos()
    }
    var contador = 1

    var contenedorPrincipal = document.getElementById('contenedorPrincipal')
    contenedorPrincipal.innerHTML = ''
    productos.forEach(producto =>
    {var cardProducto = crearElemento('div')
    cardProducto.classList.add('card-producto')
    var imgProducto = crearElemento('div')
    imgProducto.classList.add('img-producto')
    var imagen = crearImagen(producto.imagenProducto, producto.nombreProducto, 200, 200)
    imgProducto.appendChild(imagen)
    var infoProducto = crearElemento('div')
    infoProducto.classList.add('info-producto')
    var tituloProducto = crearTagConTexto('h3', producto.nombreProducto)
    if (producto.urlProducto) {
        var enlace = crearElemento('a')
        enlace.href = producto.urlProducto
        enlace.target = '_blank'
        enlace.appendChild(tituloProducto)
        infoProducto.appendChild(enlace)
    } else {
        infoProducto.appendChild(tituloProducto)
    }
    var descripcionProducto = crearTagConTexto('p', producto.descripcionProducto)
    var etiquetaProducto = crearTagConTexto('p', `Etiqueta: ${producto.etiquetaProducto}`)
    var precioProducto = crearTagConTexto('p', `Precio: $${producto.precioProducto}`)
    var cantidadLabel = crearTagConTexto('label', 'Cantidad:')
    cantidadLabel.setAttribute('for', 'cantidadProducto'+contador)
    var cantidadInput = crearElemento('input')
    cantidadInput.type = 'number'
    cantidadInput.id = 'cantidadProducto'+contador
    cantidadInput.min = '0'
    cantidadInput.value = '0'
    cantidadInput.classList.add('cantidad')
    var btnAgregar = crearTagConTexto('button', 'Agregar')
    btnAgregar.classList.add('btn-agregar')
    infoProducto.appendChild(descripcionProducto)
    infoProducto.appendChild(etiquetaProducto)
    infoProducto.appendChild(precioProducto)
    infoProducto.appendChild(cantidadLabel)
    infoProducto.appendChild(cantidadInput)
    infoProducto.appendChild(btnAgregar)
    cardProducto.appendChild(imgProducto)
    cardProducto.appendChild(infoProducto)
    contenedorPrincipal.appendChild(cardProducto)
    contador++
    btnAgregar.addEventListener('click', () => {
        var cantidad = parseInt(cantidadInput.value)
        if (isNaN(cantidad) || cantidad <= 0) {
            alert('Ingrese una cantidad válida mayor que cero.')
            return
        }
        agregarAlCarrito(producto.idProducto, producto.nombreProducto, cantidad, producto.precioProducto)
        cantidadInput.value = '0'
        alert('Producto agregado exitosamente')
    })
    })
}

function filtrarProductosCarrito() {
    const productoseleccionado = document.getElementById('productosCarrito').value;
    const productos = cargarProductos();
    const productosFiltrados = productos.filter(producto => {
        return productoseleccionado === '' || producto.nombreProducto === productoseleccionado;
    });
    mostrarProductosEnDiv(productosFiltrados);
}
