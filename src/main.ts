import "./style.css";

/////// DATOS ///////
interface Reserva {
  tipoHabitacion: "standard" | "suite";
  desayuno: boolean;
  pax: number;
  noches: number;
}

const reservas: Reserva[] = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

/////// IMPLEMENTACIÓN ///////
class CalcularPrecioReserva {
  tipoHabitacion: "standard" | "suite";
  precioStandard: number;
  precioSuite: number;
  desayuno: boolean;
  pax: number;
  noches: number;
  iva: number;
  subtotal: number;
  total: number;

  constructor(
    tipoHabitacion: "standard" | "suite",
    desayuno: boolean,
    pax: number,
    noches: number
  ) {
    this.tipoHabitacion = tipoHabitacion;
    this.precioStandard = 0;
    this.precioSuite = 0;
    this.desayuno = desayuno;
    this.pax = pax;
    this.noches = noches;
    this.iva = 0.21;
    this.subtotal = 0;
    this.total = 0;
  }

  calcularPrecioBase() {
    return this.tipoHabitacion === "standard"
      ? this.precioStandard
      : this.precioSuite;
  }

  calcularPrecioAdicionalPersonasExtra() {
    const personasAdicionales = Math.max(0, this.pax - 1); // Restamos 1 a las personas que reservan, porque la primera no cuenta como cargo extra. Como Math.max() devuelve el mayor de los dos argumentos, si solo hay una persona nos devolverá 0, que es lo que buscamos

    return personasAdicionales * 40;
  }

  calcularPrecioDesayuno() {
    if (this.desayuno) {
      return this.pax * this.noches * 15;
    }
    return 0;
  }

  calcularSubtotal() {
    const precioBase = this.calcularPrecioBase();
    const precioAdicionalPersonasExtra =
      this.calcularPrecioAdicionalPersonasExtra();
    const precioDesayuno = this.calcularPrecioDesayuno();

    this.subtotal =
      (precioBase + precioAdicionalPersonasExtra) * this.noches +
      precioDesayuno;
  }

  calcularTotal() {
    this.total = parseFloat(
      (this.subtotal + this.subtotal * this.iva).toFixed(2)
    );
  }
}

class CalcularPrecioCaso1 extends CalcularPrecioReserva {
  constructor(
    tipoHabitacion: "standard" | "suite",
    desayuno: boolean,
    pax: number,
    noches: number
  ) {
    super(tipoHabitacion, desayuno, pax, noches);
    this.precioStandard = 100;
    this.precioSuite = 150;
  }
}

class CalcularPrecioCaso2 extends CalcularPrecioReserva {
  descuento: number;

  constructor(
    tipoHabitacion: "standard" | "suite",
    desayuno: boolean,
    pax: number,
    noches: number
  ) {
    super(tipoHabitacion, desayuno, pax, noches);
    this.precioStandard = 100;
    this.precioSuite = 100;
    this.descuento = 0.85; // Descuento del 15%
  }

  calcularSubtotal() {
    super.calcularSubtotal();
    this.subtotal = this.subtotal * this.descuento;
  }
}

/////// COMPROBACIONES ///////
const reserva = reservas[2];

// Caso 1
const reservaCaso1 = new CalcularPrecioCaso1(
  reserva.tipoHabitacion,
  reserva.desayuno,
  reserva.pax,
  reserva.noches
);

reservaCaso1.calcularSubtotal();
reservaCaso1.calcularTotal();

console.log(
  "El subtotal de la reserva 3, en caso de ser un cliente particular, es:",
  reservaCaso1.subtotal
);
console.log(
  "El total de la reserva 3, en caso de ser un cliente particular, es:",
  reservaCaso1.total
);

// Caso 2
const reservaCaso2 = new CalcularPrecioCaso2(
  reserva.tipoHabitacion,
  reserva.desayuno,
  reserva.pax,
  reserva.noches
);

reservaCaso2.calcularSubtotal();
reservaCaso2.calcularTotal();

console.log(
  "El subtotal de la reserva 3, en caso de ser el tour operador, es:",
  reservaCaso2.subtotal
);
console.log(
  "El total de la reserva 3, en caso de ser el tour operador, es:",
  reservaCaso2.total
);
