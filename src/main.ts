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
  precioStandard: number;
  precioSuite: number;

  constructor(precioStandard: number, precioSuite: number) {
    this.precioStandard = precioStandard;
    this.precioSuite = precioSuite;
  }

  calcularPrecioBase(tipoHabitacion: "standard" | "suite") {
    if (tipoHabitacion === "standard") {
      return this.precioStandard;
    } else {
      return this.precioSuite;
    }
  }

  calcularPrecioAdicionalPersonasExtra(pax: number) {
    const personasAdicionales = Math.max(0, pax - 1); // Restamos 1 a las personas que reservan, porque la primera no cuenta como cargo extra. Como Math.max() devuelve el mayor de los dos argumentos, si solo hay una persona nos devolverá 0, que es lo que buscamos

    return personasAdicionales * 40;
  }

  calcularPrecioDesayuno(desayuno: boolean, pax: number, noches: number) {
    if (desayuno) {
      return pax * noches * 15;
    }
    return 0;
  }

  calcularSubtotal(reserva: Reserva) {
    const precioBase = this.calcularPrecioBase(reserva.tipoHabitacion);
    const precioAdicionalPersonasExtra =
      this.calcularPrecioAdicionalPersonasExtra(reserva.pax);
    const precioDesayuno = this.calcularPrecioDesayuno(
      reserva.desayuno,
      reserva.pax,
      reserva.noches
    );

    return (
      (precioBase + precioAdicionalPersonasExtra) * reserva.noches +
      precioDesayuno
    );
  }

  calcularTotalIva(subtotal: number) {
    const iva = 0.21;
    return subtotal * iva;
  }

  calcularTotalReserva(subtotal: number) {
    const totalIva = this.calcularTotalIva(subtotal);
    return subtotal + totalIva;
  }

  calcularTotalesReservas(reservas: Reserva[]) {
    const { subtotal, totalIva, total } = reservas.reduce(
      (acc, reserva) => {
        const subtotalReserva = this.calcularSubtotal(reserva);
        const ivaReserva = this.calcularTotalIva(subtotalReserva);
        const totalReserva = this.calcularTotalReserva(subtotalReserva);

        return {
          subtotal: acc.subtotal + subtotalReserva,
          totalIva: acc.totalIva + ivaReserva,
          total: acc.total + totalReserva,
        };
      },
      { subtotal: 0, totalIva: 0, total: 0 }
    );

    return {
      subtotal: subtotal.toFixed(2),
      totalIva: totalIva.toFixed(2),
      total: total.toFixed(2),
    };
  }
}

class CalcularPrecioCaso1 extends CalcularPrecioReserva {
  constructor() {
    super(100, 150);
  }
}

class CalcularPrecioCaso2 extends CalcularPrecioReserva {
  descuento: number;

  constructor() {
    super(100, 100);
    this.descuento = 0.85; // Descuento del 15%
  }

  calcularSubtotal(reserva: Reserva) {
    const subtotalReservaSinDescuento = super.calcularSubtotal(reserva);
    return parseFloat(
      (subtotalReservaSinDescuento * this.descuento).toFixed(2)
    );
  }
}

/////// COMPROBACIONES ///////
const reservasCaso1 = new CalcularPrecioCaso1();
const {
  subtotal: subtotalCaso1,
  totalIva: totalIvaCaso1,
  total: totalCaso1,
} = reservasCaso1.calcularTotalesReservas(reservas);

console.log(
  "El subtotal de las reservas para el cliente particular es",
  subtotalCaso1
);
console.log(
  "El iva de las reservas para el cliente particular es",
  totalIvaCaso1
);
console.log(
  "El total de las reservas para el cliente particular es",
  totalCaso1
);

const reservasCaso2 = new CalcularPrecioCaso2();
const {
  subtotal: subtotalCaso2,
  totalIva: totalIvaCaso2,
  total: totalCaso2,
} = reservasCaso2.calcularTotalesReservas(reservas);

console.log(
  "El subtotal de las reservas para el cliente tour operador es",
  subtotalCaso2
);
console.log(
  "El iva de las reservas para el cliente tour operador es",
  totalIvaCaso2
);
console.log(
  "El total de las reservas para el cliente tour operador es",
  totalCaso2
);
