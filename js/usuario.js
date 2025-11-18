class usuario {
    constructor(IdUsuario, contraseña, nombreCompleto, correo, telefonos, rol, fechaRegistro, puntos = 100) {
        this.IdUsuario = IdUsuario
        this.contraseña = contraseña
        this.nombreCompleto = nombreCompleto
        this.correo = correo
        this.telefonos = telefonos
        this.rol = rol
        this.fechaRegistro = fechaRegistro
        this.puntos = puntos
    }
}
