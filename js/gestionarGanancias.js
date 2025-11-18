function cargarCompras() {
    const comprasData = localStorage.getItem('compras')  
    if (comprasData) {
        const comprasArray = JSON.parse(comprasData)  
        return comprasArray.map(c => new compra(c.idCompra, c.nombreProducto, c.cantidad, c.precioUnitario, c.subtotal, c.fechaCompra, c.idUsuario, c.totalCompra))  
    }
    return []  
}

function calcularGananciasPorMes(año) {
    const compras = cargarCompras()  
    const productos = cargarProductos()  
    const gananciasPorMes = Array(12).fill(0)  

    compras.forEach(compra => {
        const fechaCompra = new Date(compra.fechaCompra)  
        if (fechaCompra.getFullYear() === parseInt(año)) {
            const mes = fechaCompra.getMonth()   
            const producto = productos.find(p => p.nombreProducto === compra.nombreProducto)  
            if (producto) {
                const ganancia = (compra.precioUnitario - producto.costoProducto) * compra.cantidad  
                gananciasPorMes[mes] += ganancia  
            }
        }
    })  

    return gananciasPorMes  
}

function calcularGananciasPorProducto(año, nombreProducto) {
    const compras = cargarCompras()  
    const productos = cargarProductos()  
    const gananciasPorMes = Array(12).fill(0)  
    const detallesPorMes = Array(12).fill(null).map(() => ({
        precioVenta: 0.00,
        costoAdquisicion: 0.00,
        cantidadVendida: 0.00,
        gananciaTotal: 0.00
    }))  

    compras.forEach(compra => {
        const fechaCompra = new Date(compra.fechaCompra)  
        if (fechaCompra.getFullYear() === parseInt(año) && compra.nombreProducto === nombreProducto) {
            const mes = fechaCompra.getMonth()  
            const producto = productos.find(p => p.nombreProducto === compra.nombreProducto)  
            if (producto) {
                const ganancia = (compra.precioUnitario - producto.costoProducto) * compra.cantidad  
                gananciasPorMes[mes] += ganancia  
                detallesPorMes[mes].precioVenta = compra.precioUnitario  
                detallesPorMes[mes].costoAdquisicion = producto.costoProducto  
                detallesPorMes[mes].cantidadVendida += compra.cantidad  
                detallesPorMes[mes].gananciaTotal += ganancia  
            }
        }
    })  

    return { gananciasPorMes, detallesPorMes }  
}

function mostrarGananciasPorMes(año) {
    const ganancias = calcularGananciasPorMes(año)  
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']  
    const tabla = document.getElementById('tablaGanancias')  
    tabla.innerHTML = '<tr><th>Mes</th><th>Ganancia</th></tr>'  
    ganancias.forEach((ganancia, index) => {
        const fila = tabla.insertRow()  
        fila.insertCell(0).innerText = meses[index]  
        fila.insertCell(1).innerText = ganancia.toFixed(2)  
    })  

    const grafico = document.getElementById('graficoGanancias')  
    grafico.innerHTML = ''  
    const ejeY = crearElemento('div')  
    ejeY.classList.add('eje-y')  
    grafico.appendChild(ejeY)  
    const tituloY = crearElemento('div')  
    tituloY.classList.add('titulo-eje-y')  
    tituloY.textContent = 'Ganancias'  
    grafico.appendChild(tituloY)  

    const maxGanancia = Math.max(...ganancias)  
    const etiquetasY = [0, maxGanancia / 2, maxGanancia]  
    etiquetasY.forEach((valor, index) => {
        const etiqueta = crearElemento('div')  
        etiqueta.classList.add('etiqueta-y')  
        etiqueta.textContent = valor.toFixed(0)  
        etiqueta.style.bottom = `${(valor / maxGanancia) * 100}%`  
        grafico.appendChild(etiqueta)  
    })  
    const contenedorBarras = crearElemento('div')  
    contenedorBarras.classList.add('contenedor-barras')  
    grafico.appendChild(contenedorBarras)  

    ganancias.forEach((ganancia, index) => {
        const barra = crearElemento('div')  
        barra.classList.add('barra')  
        barra.style.height = maxGanancia > 0 ? `${(ganancia / maxGanancia) * 100}%` : '0%'  
        barra.title = `${meses[index]}: $${ganancia.toFixed(2)}`  
        contenedorBarras.appendChild(barra)  
    })  

    const ejeX = crearElemento('div')  
    ejeX.classList.add('eje-x')  
    grafico.appendChild(ejeX)  
    const tituloX = crearElemento('div')  
    tituloX.classList.add('titulo-eje-x')  
    tituloX.textContent = 'Meses'  
    grafico.appendChild(tituloX)  
    meses.forEach((mes, index) => {
        const etiqueta = crearElemento('div')  
        etiqueta.classList.add('etiqueta-x')  
        etiqueta.textContent = mes.substring(0, 3)   
        etiqueta.style.left = `${(index * 100) / meses.length + 2}%`  
        grafico.appendChild(etiqueta)  
    })  
}

function mostrarGananciasPorProducto(año, nombreProducto) {
    const { gananciasPorMes, detallesPorMes } = calcularGananciasPorProducto(año, nombreProducto)  
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']  

    const tabla = document.getElementById('tablaGanancias')  
    tabla.innerHTML = '<tr><th>Mes</th><th>Precio Venta</th><th>Costo Adquisición</th><th>Cantidad Vendida</th><th>Ganancia Total</th></tr>'  
    detallesPorMes.forEach((detalle, index) => {
        const fila = tabla.insertRow()  
        fila.insertCell(0).innerText = meses[index]  
        fila.insertCell(1).innerText = detalle.precioVenta  
        fila.insertCell(2).innerText = detalle.costoAdquisicion  
        fila.insertCell(3).innerText = detalle.cantidadVendida  
        fila.insertCell(4).innerText = detalle.gananciaTotal  
    })  
    const grafico = document.getElementById('graficoGanancias')  
    grafico.innerHTML = ''  
    const ejeY = crearElemento('div')  
    ejeY.classList.add('eje-y')  
    grafico.appendChild(ejeY)  
    const maxGanancia = Math.max(...gananciasPorMes)  
    const etiquetasY = [0, maxGanancia / 2, maxGanancia]  
    etiquetasY.forEach((valor, index) => {
        const etiqueta = crearElemento('div')  
        etiqueta.classList.add('etiqueta-y')  
        etiqueta.textContent = valor.toFixed(0)  
        etiqueta.style.bottom = `${(valor / maxGanancia) * 100}%`  
        grafico.appendChild(etiqueta)  
    })  

    const contenedorBarras = crearElemento('div')  
    contenedorBarras.classList.add('contenedor-barras')  
    grafico.appendChild(contenedorBarras)  

    gananciasPorMes.forEach((ganancia, index) => {
        const barra = crearElemento('div')  
        barra.classList.add('barra')  
        barra.style.height = maxGanancia > 0 ? `${(ganancia / maxGanancia) * 100}%` : '0%'  
        barra.title = `${meses[index]}: $${ganancia.toFixed(2)}`  
        contenedorBarras.appendChild(barra)  
    })  
    const ejeX = crearElemento('div')  
    ejeX.classList.add('eje-x')  
    grafico.appendChild(ejeX)  
    meses.forEach((mes, index) => {
        const etiqueta = crearElemento('div')  
        etiqueta.classList.add('etiqueta-x')  
        etiqueta.textContent = mes.substring(0, 3)  
        etiqueta.style.left = `${(index * 100) / meses.length + 2}%`  
        grafico.appendChild(etiqueta)  
    })  
}

function consultarGanancias() {
    const tipo = document.querySelector('input[name="tipo"]:checked').nextSibling.textContent.trim()  
    const año = document.getElementById('divAño').querySelector('select').value   
    const producto = document.getElementById('divProducto').querySelector('select').value 

    if (tipo === 'Por mes') {
        window.location.href = './detalleGanancias.html?tipo=mes&año=' + año  
    } else {
        window.location.href = './detalleGanancias.html?tipo=producto&año=' + año + '&producto=' + encodeURIComponent(producto)  
    }
}

function cargarResultados() {
    const urlParams = new URLSearchParams(window.location.search)  
    const tipo = urlParams.get('tipo')  
    const año = urlParams.get('año')  
    const producto = urlParams.get('producto')  

    if (tipo === 'mes') {
        mostrarGananciasPorMes(año)  
    } else if (tipo === 'producto') {
        mostrarGananciasPorProducto(año, decodeURIComponent(producto))  
    }
}

function cargarProductosEnSelectGanancias() {
    const productos = cargarProductos()  
    const selectProducto = document.getElementById('productoGanancias')  
    productos.forEach(producto => {
        const option = crearElemento('option')  
        option.value = producto.nombreProducto  
        option.textContent = producto.nombreProducto  
        selectProducto.appendChild(option)  
    })  
}


