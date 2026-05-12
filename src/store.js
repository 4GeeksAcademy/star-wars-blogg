export const initialStore = () => {
  return {
    message: null,
    people: [],
    planets: [],
    vehicles: [],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_people":
      return {
        ...store,
        people: action.payload,
      };
    case "set_planets":
      return {
        ...store,
        planets: action.payload,
      };
    case "set_vehicles":
      return {
        ...store,
        vehicles: action.payload,
      };
    case "add_favorite":
      // Evitamos duplicados: solo agregamos si no existe ya
      if (store.favorites.includes(action.payload)) return store;
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };
    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter((fav) => fav !== action.payload),
      };
    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    default:
      // ¡IMPORTANTE! Retornar el store tal cual si la acción no coincide
      return store;
  }
}
