function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

function cargarUsuarios() {
    const usuariosData = localStorage.getItem('usuarios')
    if (usuariosData) {
        const usuariosArray = JSON.parse(usuariosData)
        return usuariosArray.map(u => new usuario(u.IdUsuario, u.contraseña, u.nombreCompleto, u.correo, u.telefonos, u.rol, u.fechaRegistro, u.puntos))
    }
    return []
}

function crearUsuario(){
    var IdUsuario = generarIdUsuario()
    var contraseña = document.getElementById('contraseña').value
    var nombreCompleto = document.getElementById('nombreCompleto').value
    var correo = document.getElementById('correo').value
    var telefonos = [
        document.getElementById('telefono1').value,
        document.getElementById('telefono2').value,
        document.getElementById('telefono3').value
    ].filter(t => t !== "")
    var rol = document.getElementById('rol').value
    var fechaRegistro = new Date().toISOString("yyyy-mm-dd|hh:mm:ss").split('T')[0]
    var validacion = validarFormularioUsuario()
    if (!validacion) {
        alert("Error al crear el usuario. Verifica los datos ingresados.")
        return null
    }else{
    var nuevoUsuario = new usuario(IdUsuario, contraseña, nombreCompleto, correo, telefonos, rol, fechaRegistro) 
    var usuarios = cargarUsuarios() 
    usuarios.push(nuevoUsuario) 
    guardarUsuarios(usuarios) 
    mostrarUsuariosEnTabla()
    return nuevoUsuario 
}
}

function modificarUsuario(){
    var entradaIdUsuario = document.getElementById('IdUsuario').value
    var entradaContraseña = document.getElementById('contraseña').value
    var entradaNombreCompleto = document.getElementById('nombreCompleto').value
    var entradaCorreo = document.getElementById('correo').value
    var entradaTelefonos = [
        document.getElementById('telefono1').value,
        document.getElementById('telefono2').value,
        document.getElementById('telefono3').value
    ].filter(t => t !== "")
    var entradaRol = document.getElementById('rol').value
    var usuarios = cargarUsuarios()
    var validacion = validarFormularioUsuario()
    var fechaUsuario = new Date().toISOString("yyyy-mm-dd|hh:mm:ss").split('T')[0]
    if (!validacion) {
        alert("Error al modificar el usuario. Verifica los datos ingresados.")
        return false
    }   
    var usuarioIndex = usuarios.findIndex(u => u.IdUsuario === entradaIdUsuario)
    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].contraseña = entradaContraseña
        usuarios[usuarioIndex].nombreCompleto = entradaNombreCompleto
        usuarios[usuarioIndex].correo = entradaCorreo
        usuarios[usuarioIndex].telefonos = entradaTelefonos
        usuarios[usuarioIndex].rol = entradaRol
        usuarios[usuarioIndex].fechaRegistro = fechaUsuario
        guardarUsuarios(usuarios)
        mostrarUsuariosEnTabla()
        entradaIdUsuario.disabled = false
        var btnGuardar = document.getElementById('btnGuardar')
        var btnModificar = document.getElementById('btnModificar')
        var btnConsultar = document.getElementById('btnConsultar')
        btnGuardar.style.display = 'inline-block'
        btnModificar.style.display = 'none'
        btnConsultar.style.display = 'inline-block'
        limpiarFormularioUsuario()
        return true
        
    }else{
        return false
    }
}
function editarUsuario(){
    if (tblUsuarios.selectedIndex === -1) {
        alert("Selecciona una fila para editar.")
        return
    }
    var filaSeleccionada = tblUsuarios.getElementsByTagName('tr')[tblUsuarios.selectedIndex]
    if (!filaSeleccionada || !filaSeleccionada.cells) {
        alert("Fila inválida.")
        return
    }
    var usuarioEncontrado = buscarUsuario(filaSeleccionada.cells[0].innerText)
    if (!usuarioEncontrado) {
        alert("Usuario no encontrado.")
        return
    }
    var entradaIdUsuario = document.getElementById('IdUsuario')
    var entradaContraseña = document.getElementById('contraseña')
    var entradaNombreCompleto = document.getElementById('nombreCompleto')
    var entradaCorreo = document.getElementById('correo')
    var entradaTelefonos = [
        document.getElementById('telefono1'),
        document.getElementById('telefono2'),
        document.getElementById('telefono3')
    ].filter(t => t !== "")
    var entradaRol = document.getElementById('rol')
    entradaIdUsuario.value = usuarioEncontrado.IdUsuario
    entradaContraseña.value = usuarioEncontrado.contraseña
    entradaNombreCompleto.value = usuarioEncontrado.nombreCompleto
    entradaCorreo.value = usuarioEncontrado.correo
    entradaTelefonos.forEach((input, index) => {
        input.value = usuarioEncontrado.telefonos[index] || ''
    })
    entradaRol.value = usuarioEncontrado.rol
    entradaIdUsuario.disabled = true
    var btnGuardar = document.getElementById('btnGuardar')
    var btnModificar = document.getElementById('btnModificar')
    var btnConsultar = document.getElementById('btnConsultar')
    btnGuardar.style.display = 'none'
    btnModificar.style.display = 'inline-block'
    btnConsultar.style.display = 'none'
}
function eliminarUsuario(){
    var usuarios = cargarUsuarios()
    var filaSeleccionada = tblUsuarios.getElementsByTagName('tr')[tblUsuarios.selectedIndex]
    if (!filaSeleccionada || !filaSeleccionada.cells) {
        alert("Selecciona una fila válida.")
        return false
    }
    var IdUsuario = filaSeleccionada.cells[0].innerText
    var usuarioIndex = usuarios.findIndex(u => u.IdUsuario === IdUsuario)
    if (usuarioIndex !== -1) {
        usuarios.splice(usuarioIndex, 1)
        guardarUsuarios(usuarios)
        mostrarUsuariosEnTabla()
        limpiarFormularioUsuario()
        return true
    }else{
        return false
    }
}
function buscarUsuario(IdUsuario){
    var usuarios = cargarUsuarios() 
    return usuarios.find(u => u.IdUsuario === IdUsuario) || null 
}



function loginUsuario(){
    var usuarios = cargarUsuarios()
    var correo = document.getElementById('usuarioLogin').value
    var contraseña = document.getElementById('contraseñaLogin').value
    var usuarioEncontrado = usuarios.find(u => u.correo === correo && u.contraseña === contraseña )
    if (usuarioEncontrado != null) {
        var rol = usuarioEncontrado.rol
        if (rol==='vendedor') {
              alert("Inicio de sesión exitoso")
              window.location.href = "./vistaVendedor.html"
        } else if (rol === 'administrador') {
            alert("Inicio de sesión exitoso")
            window.location.href = './vistaAdministrador.html'

        } else if (rol == 'usuario final') {
             alert("Inicio de sesión exitoso")
             window.location.href = "./vistaUsuario.html"
        }

    } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.")
    }
}

function consultarUsuario(){
    var entradaIdUsuario = document.getElementById('IdUsuario').value
    var usuarioEncontrado = buscarUsuario(entradaIdUsuario)
    if (usuarioEncontrado) {
        alert(`Usuario encontrado:\nNombre: ${usuarioEncontrado.nombreCompleto}\nCorreo: ${usuarioEncontrado.correo}\nRol: ${usuarioEncontrado.rol}`)
        limpiarFormularioUsuario()  
    } else {
        alert("Usuario no encontrado.")
        limpiarFormularioUsuario()      
}
}

function mostrarUsuariosEnTabla(){
    tblUsuarios.tBodies[0].innerHTML = ''
    var usuarios = cargarUsuarios()
    usuarios.forEach((usuario, index) => {
        var fila = tblUsuarios.tBodies[0].insertRow(-1)
        fila.onclick = () => {
            tblUsuarios.selectedIndex = index + 1 
        }
        var columnaIdUsuario = fila.insertCell(0)
        var columnaNombreCompleto = fila.insertCell(1)
        var columnaCorreo = fila.insertCell(2)
        var columnaTelefonos = fila.insertCell(3)
        var columnaRol = fila.insertCell(4)
        var columnaFechaRegistro = fila.insertCell(5)
        var columnaAcciones = fila.insertCell(6)
        var btnEditar = crearTagConTexto('button', 'Editar')
        var btnEliminar = crearTagConTexto('button', 'Eliminar')
        btnEditar.classList.add('btn', 'actualizar', 'tabla-btn')
        btnEliminar.classList.add('btn', 'eliminar', 'tabla-btn')
        btnEditar.addEventListener('click', (e) => {
            e.stopPropagation()
            editarUsuario()
        })
        btnEliminar.addEventListener('click', (e) => {
            e.stopPropagation()
            if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
                eliminarUsuario()
            } else {
                alert("Eliminación cancelada.")
            }
        })

        columnaIdUsuario.innerText = usuario.IdUsuario
        columnaNombreCompleto.innerText = usuario.nombreCompleto
        columnaCorreo.innerText = usuario.correo
        columnaTelefonos.innerText = usuario.telefonos
        columnaRol.innerText = usuario.rol
        columnaFechaRegistro.innerText = usuario.fechaRegistro
        columnaAcciones.appendChild(btnEditar)
        columnaAcciones.appendChild(btnEliminar)
    })
}

function generarIdUsuario(){
    const usuarios = cargarUsuarios()
    let nuevoId
    if (usuarios.length === 0) {
        nuevoId = 1
    } else {
        const ids = usuarios.map(u => parseInt(u.IdUsuario))
        nuevoId = Math.max(...ids) + 1
    }
    return nuevoId.toString().padStart(4, '0')
}

function mostrardatosdashboard(){
    var usuarios = cargarUsuarios()
    document.getElementById('usuariosRegistrados').innerText = `${usuarios.length} Usuarios`

    var productos = cargarProductos()
    document.getElementById('productosRegistrados').innerText = `${productos.length} Productos`
    var categorias = cargarCategorias()
    document.getElementById('categoriasRegistradas').innerText = `${categorias.length} Categorías`
}

function validarFormularioUsuario() {
    var contraseña = document.getElementById('contraseña').value
    var nombreCompleto = document.getElementById('nombreCompleto').value
    var correo = document.getElementById('correo').value
    var telefono1 = document.getElementById('telefono1').value
    var rol = document.getElementById('rol').value
    if (!contraseña || !nombreCompleto || !correo || !telefono1 || !rol) {
        alert("Por favor, complete todos los campos obligatorios.")
        return false
    }
    return true
}

function validarLogin(){
    var correo = document.getElementById('usuarioLogin').value
    var contraseña = document.getElementById('contraseñaLogin').value   
    if (!correo || !contraseña) {
        alert("Por favor, complete todos los campos de inicio de sesión.")
        return false
    }
    return true
}

function botonesInicio(){
    var btnGuardar = document.getElementById('btnGuardar')
    var btnModificar = document.getElementById('btnModificar')
    var btnConsultar = document.getElementById('btnConsultar')
    btnGuardar.style.display = 'inline-block'
    btnModificar.style.display = 'none'
    btnConsultar.style.display = 'inline-block'
}
function limpiarFormularioUsuario(){
    document.getElementById('IdUsuario').value = ''
    document.getElementById('contraseña').value = ''
    document.getElementById('nombreCompleto').value = ''
    document.getElementById('correo').value = ''
    document.getElementById('telefono1').value = ''
    document.getElementById('telefono2').value = ''
    document.getElementById('telefono3').value = ''
    document.getElementById('rol').value = ''
    document.getElementById('IdUsuario').disabled = false
    botonesInicio()
}