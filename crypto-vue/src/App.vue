<script setup>
import { ref, reactive } from 'vue';
import Alerta from './components/Alerta.vue';
import Spinner from './components/Spinner.vue';
import useCripto from './composables/useCripto';
import Cotizacion from './components/Cotizacion.vue'; // Componente de cotización
import ListadoCriptos from './components/ListadoCriptos.vue'; // Nuevo componente para listar criptos

const { monedas, criptomonedas, cotizacion, mostrarSpinner, obtenerCotizacion, mostrarResultado, cargandoCriptos } = useCripto();

const error = ref('');
const cotizar = reactive({
  moneda: '',
  criptomoneda: '',
  cantidad: 0 // Nuevo campo para el monto
});

const cotizarCripto = () => {
  if (Object.values(cotizar).includes('') || cotizar.cantidad <= 0) {
    error.value = 'Todos los campos son obligatorios y la cantidad debe ser mayor a 0';

    setTimeout(() => {
      error.value = '';
    }, 4000);
    return;
  }
  error.value = '';
  obtenerCotizacion(cotizar);
}
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>criptomonedas</span></h1>

    <div class="contenedor-main">
      <div class="contenido">
        <h2>Cotizar</h2>
        <Alerta v-if="error">
          {{ error }}
        </Alerta>

        <form class="formulario" @submit.prevent="cotizarCripto">
          <div class="campo-horizontal">
            <label for="moneda">Moneda:</label>
            <select id="moneda" v-model="cotizar.moneda">
              <option value="">-- Seleccione --</option>
              <option v-for="moneda in monedas" :value="moneda.codigo" :key="moneda.codigo">{{ moneda.texto }}</option>
            </select>
          </div>

          <div class="campo-horizontal">
            <label for="criptomoneda">Criptomoneda:</label>
            <select id="criptomoneda" v-model="cotizar.criptomoneda">
              <option value="">-- Seleccione --</option>
              <option v-for="criptomoneda in criptomonedas" :value="criptomoneda.CoinInfo.Name" :key="criptomoneda.CoinInfo.Id">
                {{ criptomoneda.CoinInfo.FullName }}
              </option>
            </select>
          </div>

          <div class="campo-horizontal">
            <label for="cantidad">Dinero a invertir:</label>
            <input type="number" v-model.number="cotizar.cantidad" id="cantidad" />
          </div>

          <input type="submit" value="Cotizar">
        </form>

        <!-- INFORMACIÓN DE CUÁNTO HABRÍA QUE PAGAR -->
        <Spinner v-if="mostrarSpinner" />
        <Cotizacion v-if="mostrarResultado" :cotizacion="cotizacion" :cantidad="cotizar.cantidad" />
      </div>

      <div class="listado-criptos">
        <Spinner v-if="cargandoCriptos" />
        <ListadoCriptos v-else :criptomonedas="criptomonedas" />
      </div>
    </div>
  </div>
</template>
