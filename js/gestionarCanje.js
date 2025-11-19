function guardarCanjes(canjes) {
    localStorage.setItem('canjes', JSON.stringify(canjes))
}

function cargarCanjes() {
    const canjesData = localStorage.getItem('canjes')
    if (canjesData) {
        const canjesArray = JSON.parse(canjesData)
        return canjesArray.map(c => new canje(c.idCanje, c.idUsuario, c.codigoCupon, c.idProducto, c.fechaCanje, c.estadoCanje))
    }
    return []
}

function generarIdCanje() {
    const canjes = cargarCanjes()
    let nuevoId
    if (canjes.length === 0) {
        nuevoId = 1
    } else {
        const ids = canjes.map(c => parseInt(c.idCanje))
        nuevoId = Math.max(...ids) + 1
    }
    return nuevoId.toString().padStart(4, '0')
}

function validarCupon(codigoCupon) {
    const cuponesValidos = ['ECO2025', 'GREEN10', 'SUSTAIN25', 'RECYCLE50', 'NATURE5', 'EARTH15', 'SINCELEJOGREEN', 'T3 QUI3R0 V3RDE']
    return cuponesValidos.includes(codigoCupon)
}

function consultarPuntos() {
    const apellido = document.getElementById('apellido').value
    if (!apellido) {
        alert("Por favor, ingrese sus apellidos.")
        return
    }
    const usuarios = cargarUsuarios()
    const usuario = usuarios.find(u => u.nombreCompleto.toLowerCase().includes(apellido.toLowerCase()))
    if (usuario) {
        document.getElementById('resultado').value = `Usuario: ${usuario.nombreCompleto} - Puntos: ${usuario.puntos}`
        document.getElementById('codigoUsuario').value = usuario.IdUsuario
    } else {
        alert("Usuario no encontrado.")
    }
}

function canjearProducto() {
    const codigoUsuario = document.getElementById('codigoUsuario').value
    const codigoCanje = document.getElementById('codigoCanje').value
    const idProducto = document.getElementById('productos').value
    const estadoCanje = 'realizado'
    const fechaCanje = new Date().toISOString().split('T')[0]

    if (!codigoUsuario || !codigoCanje || !idProducto || !estadoCanje || !fechaCanje) {
        alert("Por favor, complete todos los campos.")
        return
    }

    const usuarios = cargarUsuarios()
    const usuarioIndex = usuarios.findIndex(u => u.IdUsuario === codigoUsuario)
    if (usuarioIndex === -1) {
        alert("Usuario no encontrado.")
        return
    }
    const usuario = usuarios[usuarioIndex]

    if (!validarCupon(codigoCanje)) {
        alert("Código de cupón inválido o expirado.")
        return
    }

    const canjes = cargarCanjes()
    const cuponUsado = canjes.find(c => c.codigoCupon === codigoCanje)
    if (cuponUsado) {
        alert("Este cupón ya ha sido utilizado.")
        return
    }

    const productos = cargarProductos()
    const producto = productos.find(p => p.idProducto === idProducto)
    if (!producto) {
        alert("Producto no encontrado.")
        return
    }

    if (usuario.puntos < producto.puntosRequeridos) {
        alert(`No tienes suficientes puntos. Necesitas ${producto.puntosRequeridos} puntos, pero solo tienes ${usuario.puntos}.`)
        return
    }

    usuario.puntos -= producto.puntosRequeridos
    guardarUsuarios(usuarios)

    const idCanje = generarIdCanje()
    const nuevoCanje = new canje(idCanje, codigoUsuario, codigoCanje, idProducto, fechaCanje, estadoCanje)
    canjes.push(nuevoCanje)
    guardarCanjes(canjes)
    document.getElementById('resultado').value = `¡Has canjeado el producto "${producto.nombreProducto}"! Puntos restantes: ${usuario.puntos}`

    alert("Canje realizado exitosamente.")
    limpiarFormularioCanje()
}

function limpiarFormularioCanje() {
    document.getElementById('codigoUsuario').value = ''
    document.getElementById('codigoCanje').value = ''
    document.getElementById('productos').value = ''
    document.getElementById('apellido').value = ''
    document.getElementById('imagenProductoCanje').src = '../recursos/img/imagen 1.jpeg'
    document.getElementById('imagenProductoCanje').style.width = '200px'
    document.getElementById('imagenProductoCanje').style.height = '200px'
}



