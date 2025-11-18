   function crearElemento(tag) {
    return document.createElement(tag)
}
function adicionarTextoATag(texto, tag) {
    tag.innerText = texto
}
function adicionarTagAContenedor(tag, contenedor) {
    contenedor.appendChild(tag)
}
function adicionarTagABody(tag) {
    document.body.appendChild(tag)
}

//--------------------------------------------------------------------------------------------------
function crearTagConTexto(tag,texto) {
   var tag = crearElemento(tag)
   adicionarTextoATag(texto,tag)
   return tag
}
function crearTagConTextoAdicionarBody(tag,texto) {
    var tag = crearTagConTexto(tag,texto)
    adicionarTagABody(tag)
}

function crearImagen(src, alt, width, height){
    var img = crearElemento('img')
    img.src = src
    img.alt = alt
    img.width = width
    img.height = height
    return img
}

