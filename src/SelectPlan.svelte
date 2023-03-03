<script>
    import Select from 'svelte-select';
    import { onMount } from 'svelte';
    import { collection, getDocs } from 'firebase/firestore';
    import { db } from './firebasePacientes'; // aquí se importa la configuración de Firebase para la conexión a la base de datos
  
    let options = [];
    let selectedOption;
    
    const loadOptions = async () => {
      const querySnapshot = await getDocs(collection(db, 'planes')); // aquí se cambia 'tu_coleccion' por el nombre de la colección que quieres obtener
      console.log(querySnapshot.plan);
      querySnapshot.forEach((doc) => {
        options.push({ value: doc.id, label: doc.data().plan }); // aquí se cambia 'tu_campo' por el nombre del campo que quieres utilizar para el select
      });
    };
  
    onMount(async () => {
      await loadOptions();
    });
  </script>

  
  <Select bind:selectedOption={selectedOption} options={options} label="Selecciona una opción" />
  
  