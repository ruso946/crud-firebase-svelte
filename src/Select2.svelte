<script>
    import { onMount } from "svelte";
    import { getFirestore, collection, getDocs } from "firebase/firestore";
    import Select from "svelte-select";

    async function loadOptions() {
        const db = getFirestore();
        const optionsCollection = collection(db, "planes");
        const optionsSnapshot = await getDocs(optionsCollection);
        const options = optionsSnapshot.docs.map((doc) => ({
            value: doc.id,
            label: doc.data().plan,
        }));
        console.log(options)        
        return options;
    }

    let options = [];

    onMount(async () => {
        options = await loadOptions();                
    });
</script>

<Select items={options} />
