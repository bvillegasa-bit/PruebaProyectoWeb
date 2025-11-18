class ItemCarrito {
    constructor(idProducto, nombreProducto, cantidad, precioUnitario, subtotal, fecha) {
        this.idProducto = idProducto
        this.nombreProducto = nombreProducto
        this.cantidad = cantidad
        this.precioUnitario = precioUnitario
        this.subtotal = subtotal
        this.fecha = fecha
    }
}

function cargarCarrito() {
    const carritoData = localStorage.getItem('carrito')
    if (carritoData) {
        const carritoArray = JSON.parse(carritoData)
        return carritoArray.map(item => new ItemCarrito(item.idProducto, item.nombreProducto, item.cantidad, item.precioUnitario, item.subtotal, item.fecha))
    }
    return []
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function agregarAlCarrito(idProducto, nombreProducto, cantidad, precioUnitario) {
    if (cantidad < 1) {
        alert("La cantidad debe ser al menos 1.")
        return
    }
    const carrito = cargarCarrito()
    const fecha = new Date().toISOString().split('T')[0] 
    const subtotal = cantidad * precioUnitario
    const nuevoItem = new ItemCarrito(idProducto, nombreProducto, cantidad, precioUnitario, subtotal, fecha)
    carrito.push(nuevoItem)
    guardarCarrito(carrito)
    mostrarCarrito()
    calcularTotales()
}

function modificarCarrito(idProducto, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        alert("La cantidad debe ser al menos 1.")
        return
    }
    const carrito = cargarCarrito()
    const itemIndex = carrito.findIndex(item => item.idProducto === idProducto)
    if (itemIndex !== -1) {
        carrito[itemIndex].cantidad = nuevaCantidad
        carrito[itemIndex].subtotal = nuevaCantidad * carrito[itemIndex].precioUnitario
        guardarCarrito(carrito)
        mostrarCarrito()
        calcularTotales()
    }
}

function eliminarDelCarrito(idProducto) {
    const carrito = cargarCarrito()
    const nuevoCarrito = carrito.filter(item => item.idProducto !== idProducto)
    guardarCarrito(nuevoCarrito)
    mostrarCarrito()
    calcularTotales()
}

function vaciarCarrito() {
    guardarCarrito([])
    mostrarCarrito()
    calcularTotales()
}

function mostrarCarrito() {
    const carrito = cargarCarrito()
    const tbody = document.querySelector('.tabla tbody')
    tbody.innerHTML = ''
    carrito.forEach(item => {
        const fila = tbody.insertRow()
        fila.insertCell(0).innerText = item.idProducto
        fila.insertCell(1).innerText = item.nombreProducto
        fila.insertCell(2).innerText = item.cantidad
        fila.insertCell(3).innerText = item.precioUnitario
        fila.insertCell(4).innerText = item.subtotal
        fila.insertCell(5).innerText = item.fecha
        const accionesCell = fila.insertCell(6)
        const btnEditar = crearTagConTexto('button', '✏')
        btnEditar.classList.add('editar')
        btnEditar.addEventListener('click', () => editarItem(item.idProducto))
        const btnEliminar = crearTagConTexto('button', '🗑')
        btnEliminar.classList.add('eliminar')
        btnEliminar.addEventListener('click', () => eliminarDelCarrito(item.idProducto))
        accionesCell.appendChild(btnEditar)
        accionesCell.appendChild(btnEliminar)
    })
}

function calcularTotales() {
    const carrito = cargarCarrito()
    const totalCompra = carrito.reduce((sum, item) => sum + item.subtotal, 0)
    subtotal.value = totalCompra.toFixed(2) 
    total.value = totalCompra.toFixed(2) 
}

function editarItem(idProducto) {
    const nuevaCantidad = prompt("Ingrese la nueva cantidad:")
    if (nuevaCantidad && !isNaN(nuevaCantidad) && nuevaCantidad >= 1) {
        modificarCarrito(idProducto, parseInt(nuevaCantidad))
    }
}

function confirmarCompra() {
    const carrito = cargarCarrito()
    if (carrito.length === 0) {
        alert("El carrito está vacío.")
        return
    }

    const idUsuario = localStorage.getItem('usuarioActual') || '1' 
    const totalCompra = carrito.reduce((sum, item) => sum + item.subtotal, 0)
    const compras = cargarCompras()
    carrito.forEach(item => {
        const idCompra = generarIdCompra()
        const nuevaCompra = new compra(idCompra, item.nombreProducto, item.cantidad, item.precioUnitario, item.subtotal, item.fecha, idUsuario, totalCompra)
        compras.push(nuevaCompra)
    })
    guardarCompras(compras)
    vaciarCarrito()
    alert("Compra confirmada.")
}

function cancelarCompra() {
    if (confirm("¿Está seguro de que desea cancelar la compra y vaciar el carrito?")) {
        vaciarCarrito()
    }
}


function cargarCompras() {
    const comprasData = localStorage.getItem('compras')
    if (comprasData) {
        const comprasArray = JSON.parse(comprasData)
        return comprasArray.map(c => new compra(c.idCompra, c.nombreProducto, c.cantidad, c.precioUnitario, c.subtotal, c.fechaCompra, c.idUsuario, c.totalCompra))
    }
    return []
}

function guardarCompras(compras) {
    localStorage.setItem('compras', JSON.stringify(compras))
}

function generarIdCompra() {
    const compras = cargarCompras()
    let nuevoId
    if (compras.length === 0) {
        nuevoId = 1
    } else {
        const ids = compras.map(c => parseInt(c.idCompra))
        nuevoId = Math.max(...ids) + 1
    }
    return nuevoId.toString().padStart(4, '0')
}


