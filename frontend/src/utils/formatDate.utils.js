function formato24HorasUTC(fechaString) {
    // Convertir el string a un objeto Date
    const fecha = new Date(fechaString);

    // Obtener horas y minutos en UTC
    const horas = fecha.getUTCHours().toString().padStart(2, '0');
    const minutos = fecha.getUTCMinutes().toString().padStart(2, '0');

    return `${horas}:${minutos}`;
}

export { formato24HorasUTC };