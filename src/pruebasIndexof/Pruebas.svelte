<script>    
    let searchTerm="";
    let listaFiltrada=[]
    const lista = [
        "pepe",
        "pepito",
        "peponazo",
        "lola",
        "lolita",
        "gonza",
        "gonzalito",
        "gonzi",
    ];

        console.log (lista);

        $: listaFiltrada = lista.filter(name=>name.startsWith(searchTerm));        

        $: console.log(listaFiltrada)
            
    
</script>

<main>
    <input type="text" bind:value="{searchTerm}"  />{searchTerm}
    <div class="card">
        {#each listaFiltrada as item}
            <label for="nombre">Nombre</label>
            <h3>{item}</h3>            
        {/each}
        
    </div>
</main>
