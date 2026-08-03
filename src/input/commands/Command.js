export default class Command {
  execute(actor) {
    // Método abstracto, se implementa en clases hijas
    throw new Error("El método execute(actor) debe ser implementado");
  }
}