<script setup>
  import { ref, reactive, onMounted, computed } from 'vue';

  import Alerta from './components/Alerta.vue';

  const monedas = ref([
    { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' },
    { codigo: 'ARS', texto: 'Peso Argentino' }
  ]);

  const criptomonedas = ref([]);
  const error = ref('');
  const cotizacion = ref({});

  const cotizar = reactive({
    moneda: '',
    criptomoneda: ''
  })

  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
    fetch(url)
      .then((response) => response.json())
      .then(({ Data }) => {
        criptomonedas.value = Data;
      })
  })

  const cotizarCripto = () => {
    if (Object.values(cotizar).includes('')) {
      error.value = 'Todos los campos son obligatorios';
      
      setTimeout(() => {
          error.value = '';
        }, 4000);
        return;
    }
    error.value = '';
    obtenerCotizacion();
  }

  const obtenerCotizacion = async () => {
    const { moneda, criptomoneda } = cotizar;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    const respuesta = await fetch(url);
    const data = await respuesta.json();
    cotizacion.value = data.DISPLAY[criptomoneda][moneda];
  }

  const mostrarResultado = computed(() => {
    return Object.values(cotizacion.value).length > 0;
  })
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>criptomonedas</span></h1>

    <div class="contenido">
      <Alerta
        v-if="error"
      >
        {{ error }}
      </Alerta>

      <form class="formulario" 
        @submit.prevent="cotizarCripto"
      >
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda"
            v-model="cotizar.moneda"
          >
            <option value="">-- Seleccione --</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>
        </div>

        <div class="campo">
          <label for="criptomoneda">Criptomoneda:</label>
          <select id="criptomoneda"
            v-model="cotizar.criptomoneda"
          >
            <option value="">-- Seleccione --</option>
            <option v-for="criptomoneda in criptomonedas" :value="criptomoneda.CoinInfo.Name">
              {{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>

        <input type="submit" value="Cotizar">
      </form>

      <div 
        v-if="mostrarResultado" 
        class="contenedor-resultado"
        >
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
    </div>
  </div>

</template>

<style scoped>

</style>
