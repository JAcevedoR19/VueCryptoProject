<script setup>
// Props
    const props = defineProps({
    criptomonedas: {
        type: Array,
        required: true,
    },
    });

</script>

<template>
    <div>
        <h2>Listado de Criptomonedas</h2>
        <div class="tabla-contenedor">
            <table>
                <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Pico Alto</th>
                    <th>Pico Bajo</th>
                    <th>% Variación</th>
                    <th>Actualización</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="cripto in criptomonedas" :key="cripto.CoinInfo.Id">
                        <td>
                            <img :src="'https://www.cryptocompare.com' + cripto.CoinInfo.ImageUrl" :alt="cripto.CoinInfo.FullName" />
                        </td>
                        <td>{{ cripto.CoinInfo.FullName }} ({{ cripto.CoinInfo.Name.toUpperCase() }})</td>
                        <td>{{ cripto.DISPLAY?.USD?.PRICE || 'No disponible' }}</td>
                        <td>{{ cripto.DISPLAY?.USD?.HIGHDAY || 'No disponible' }}</td>
                        <td>{{ cripto.DISPLAY?.USD?.LOWDAY || 'No disponible' }}</td>
                        <td :class="{ positivo: parseFloat(cripto.DISPLAY?.USD?.CHANGEPCT24HOUR) >= 0, negativo: parseFloat(cripto.DISPLAY?.USD?.CHANGEPCT24HOUR) < 0 }">
                            {{ cripto.DISPLAY?.USD?.CHANGEPCT24HOUR || 'No disponible' }}%
                        </td>
                        <td>{{ cripto.DISPLAY?.USD?.LASTUPDATE || 'No disponible' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

</style>

