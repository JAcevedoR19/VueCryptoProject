import { ref, onMounted, computed } from 'vue';

export default function useCripto() {
    const criptomonedas = ref([]);
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
        { codigo: 'ARS', texto: 'Peso Argentino' }
    ]);

    const cotizacion = ref({});
    const mostrarSpinner = ref(false);
    const cargandoCriptos = ref(true); // Nuevo estado para cargar criptomonedas

    onMounted(() => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
        fetch(url)
            .then((response) => response.json())
            .then(({ Data }) => {
                criptomonedas.value = Data;
                cargandoCriptos.value = false; // Marca como cargado una vez que se obtienen los datos
            });
    });

    const obtenerCotizacion = async (cotizar) => {
        mostrarSpinner.value = true;
        cotizacion.value = {};

        const { moneda, criptomoneda } = cotizar;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const respuesta = await fetch(url);
        const data = await respuesta.json();
        cotizacion.value = data.DISPLAY[criptomoneda][moneda];

        mostrarSpinner.value = false;
    };

    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0;
    });

    return {
        monedas,
        criptomonedas,
        cotizacion,
        mostrarSpinner,
        obtenerCotizacion,
        mostrarResultado,
        cargandoCriptos // Devuelve el estado de carga
    };
}
