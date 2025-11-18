
function normalizarTexto(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function filtrarProductos() {
    const inputBusqueda = document.getElementById('filtroBusqueda').textContent || document.getElementById('filtroBusqueda').value
    const palabraClave = normalizarTexto(inputBusqueda)
    const categoriaSeleccionada = document.getElementById('categoriaProducto').value
    const etiquetaSeleccionada = document.getElementById('etiquetaProductos').value

    const productos = cargarProductos()
    const productosFiltrados = productos.filter(producto => {
        const nombreNormalizado = normalizarTexto(producto.nombreProducto)
        const descripcionNormalizada = normalizarTexto(producto.descripcionProducto)

        const coincidePalabraClave = palabraClave === '' ||
            nombreNormalizado.includes(palabraClave) ||
            descripcionNormalizada.includes(palabraClave)

        const coincideCategoria = categoriaSeleccionada === '' || producto.categoriaProducto === categoriaSeleccionada

        const coincideEtiqueta = etiquetaSeleccionada === '' || producto.etiquetaProducto === etiquetaSeleccionada

        return coincidePalabraClave && coincideCategoria && coincideEtiqueta
    })

    mostrarProductosFiltrados(productosFiltrados)
}

function mostrarProductosFiltrados(productos) {
    const contenedor = document.getElementById('contenedorPrincipal')
    contenedor.innerHTML = ''

    productos.forEach(producto => {
        const cardProducto = crearElemento('div')
        cardProducto.classList.add('card-producto')

        const imgProducto = crearElemento('div')
        imgProducto.classList.add('img-producto')
        const imagen = crearImagen(producto.imagenProducto, producto.nombreProducto, 200, 200)
        imgProducto.appendChild(imagen)

        const infoProducto = crearElemento('div')
        infoProducto.classList.add('info-producto')

        const tituloProducto = crearTagConTexto('h3', producto.nombreProducto)
        const descripcionProducto = crearTagConTexto('p', producto.descripcionProducto)
        const etiquetaProducto = crearTagConTexto('p', `Etiqueta: ${producto.etiquetaProducto}`)
        const precioProducto = crearTagConTexto('p', `Precio: $${producto.precioProducto}`)

        infoProducto.appendChild(tituloProducto)
        infoProducto.appendChild(descripcionProducto)
        infoProducto.appendChild(etiquetaProducto)
        infoProducto.appendChild(precioProducto)

        cardProducto.appendChild(imgProducto)
        cardProducto.appendChild(infoProducto)
        contenedor.appendChild(cardProducto)
    })
}




