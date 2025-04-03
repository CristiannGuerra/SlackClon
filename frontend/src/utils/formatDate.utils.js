function formato24HorasUTC(fechaString) {
    // Convertir el string a un objeto Date
    const fecha = new Date(fechaString);

    // Obtener horas y minutos en UTC
    const horas = fecha.getUTCHours().toString().padStart(2, '0');
    const minutos = fecha.getUTCMinutes().toString().padStart(2, '0');

    return `${horas}:${minutos}`;
}

function formato24HorasArgentina(fechaString) {
    const fecha = new Date(fechaString);

    // Obtener horas y minutos en UTC y ajustar por UTC-3 (Argentina)
    let horas = fecha.getUTCHours() - 3;
    const minutos = fecha.getUTCMinutes();

    // Ajustar horas si son negativas
    if (horas < 0) {
        horas += 24;
    }

    // Formatear a dos dígitos
    const strHoras = horas.toString().padStart(2, '0');
    const strMinutos = minutos.toString().padStart(2, '0');

    return `${strHoras}:${strMinutos}`;
}

export { formato24HorasUTC, formato24HorasArgentina };