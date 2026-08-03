// Definimos identificadores únicos para cada tipo de tile
export const TileTypes = {
    AIR: 0,
    DIRT: 1,
    GRASS: 2,
    STONE: 3,
    WATER: 4
  };
  
  // Definimos las propiedades de cada tile (útil para colisiones, renderizado, etc.)
  export const TileProperties = {
    [TileTypes.AIR]: {
      name: 'Air',
      isSolid: false,
      color: '#87CEEB' // Azul cielo
    },
    [TileTypes.DIRT]: {
      name: 'Dirt',
      isSolid: true,
      color: '#8B4513' // Café (tierra)
    },
    [TileTypes.GRASS]: {
      name: 'Grass',
      isSolid: true,
      color: '#228B22' // Verde (pasto)
    },
    [TileTypes.STONE]: {
      name: 'Stone',
      isSolid: true,
      color: '#808080' // Gris (piedra)
    },
    [TileTypes.WATER]: {
      name: 'Water',
      isSolid: false, // Falso, asumiendo que el jugador pueda nadar o atravesarlo
      color: '#1E90FF' // Azul agua
    }
  };