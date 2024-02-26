export class Usuarios {
    usuario: string = "";
    contrasena : string = "";
    email: string = "";

    toObject() {
        return {
          usuario: this.usuario,
          contrasena: this.contrasena,
          email: this.email,
        };
      }
}

