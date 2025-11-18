(function() {
  const keyCategorias = 'categorias'
  const keyProductos = 'productos'
  const keyUsuarios = 'usuarios'


  function safeParse(key) {
    try { return JSON.parse(localStorage.getItem(key)) || [] } catch(e) { return [] }
  }
  function save(key, data) { localStorage.setItem(key, JSON.stringify(data)) }
  function pad(n){ return n.toString().padStart(4, '0') }
  const today = new Date().toISOString().split('T')[0]
  const categoryNames = [
    'Orgánicos',
    'Sin Empaque (Zero Waste)',
    'Reutilizables',
    'Veganos',
    'Cuidado Personal Ecológico',
    'Hogar Sostenible',
    'Alimentos Locales',
    'Jardinería y Compost',
    'Bebidas Artesanales',
    'Productos para Bebé Ecológicos'
  ]

  const categorias = safeParse(keyCategorias)
  let maxCatId = categorias.length === 0 ? 0 : Math.max(...categorias.map(c => parseInt(c.id || '0') || 0)
  )
  categoryNames.forEach(name => {
    const exists = categorias.some(c => c && (c.nombre || '').toLowerCase() === name.toLowerCase())
    if (!exists) {
      maxCatId++
      categorias.push({ id: pad(maxCatId), nombre: name })
    }
  })
  save(keyCategorias, categorias)
 
  const usuarios = safeParse(keyUsuarios)
  let maxUserId = usuarios.length === 0 ? 0 : Math.max(...usuarios.map(u => parseInt(u.IdUsuario || '0') || 0))

  const usuariosPordefecto= [
    { correo: 'bernabe.villegas@cecar.edu.co', contraseña: '29112005', nombreCompleto: 'Bernabé Alberto Villegas Arceles', rol: 'administrador', telefonos: '12345576'},
    { correo: 'victoria.barrioso@cecar.edu.co', contraseña: '1234', nombreCompleto: 'Victoria Barrios Olearte', rol: 'vendedor', telefonos: '12345576' },
    { correo: 'natalia.mercado@cecar.edu.co', contraseña: '1234', nombreCompleto: 'Natalia Mercado Rincón', rol: 'usuario final', telefonos: '12345576' }
  ]

  usuariosPordefecto.forEach(su => {
    const exists = usuarios.some(u => u && ((u.correo || '').toLowerCase() === su.correo.toLowerCase()))
    if (!exists) {
      maxUserId++
      usuarios.push({
        IdUsuario: pad(maxUserId),
        contraseña: su.contraseña,
        nombreCompleto: su.nombreCompleto,
        correo: su.correo,
        telefonos: su.telefonos,
        rol: su.rol,
        fechaRegistro: today,
        puntos: 100
      })
    }
  })
  save(keyUsuarios, usuarios)

})()
