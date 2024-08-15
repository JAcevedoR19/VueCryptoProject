<script setup>
    defineProps({
        cotizacion: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="contenedor-resultado">
        <h2>Cotización</h2>

        <div class="resultado">
            <img :src="'https://www.cryptocompare.com' + cotizacion.IMAGEURL" 
            alt="Imagen criptomoneda">
            <div>
                <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
                <p>Precio más alto del día: <span>{{ cotizacion.HIGHDAY }}</span></p>
                <p>Precio más bajo del día: <span>{{ cotizacion.LOWDAY }}</span></p>
                <p>Variación ultimas 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR }} %</span></p>
                <p>Ultima actualización: <span>{{ cotizacion.LASTUPDATE }}</span></p>
            </div>
        </div>
    </div>
</template>