class producto {
    constructor(idProducto, nombreProducto, descripcionProducto, categoriaProducto, costoProducto, precioProducto, etiquetaProducto, estadoProducto, imagenProducto, fechaRegistro, puntosRequeridos = 50) {
        this.idProducto = idProducto
        this.nombreProducto = nombreProducto
        this.descripcionProducto = descripcionProducto
        this.categoriaProducto = categoriaProducto
        this.costoProducto = costoProducto
        this.precioProducto = precioProducto
        this.etiquetaProducto = etiquetaProducto
        this.estadoProducto = estadoProducto
        this.imagenProducto = imagenProducto
        this.fechaRegistro = fechaRegistro
        this.puntosRequeridos = puntosRequeridos
    }

}
