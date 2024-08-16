<script setup>
defineProps({
  cotizacion: {
    type: Object,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  }
});

const calcularCantidadCripto = (cantidad, precio) => {
  return cantidad / parseFloat(precio.replace(/[^0-9.-]+/g, ""));
}
</script>

<template>
  <div class="contenedor-resultado">
    <div class="resultado">
      <h4>Puedes comprar:</h4>
      <p><span>{{ calcularCantidadCripto(cantidad, cotizacion.PRICE) }} {{ cotizacion.FROMSYMBOL }}</span> con {{ cantidad }} {{ cotizacion.TOSYMBOL }}</p>
    </div>
  </div>
</template>

<style scoped>
  .contenedor-resultado {
    margin: 0;
    padding: 1rem;
  }

  .resultado {
    margin-top: 1rem;
  }

  .resultado p, h4 {
    margin: 0;
    padding: 0;
  }

  h4 {
    font-weight: 700;
  }

</style>
