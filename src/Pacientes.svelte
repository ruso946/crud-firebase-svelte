<script>
    import Swal from "sweetalert2";
    import { db } from "./firebasePacientes";
    import {
        collection,
        addDoc,
        onSnapshot,
        deleteDoc,
        doc,
        updateDoc,
    } from "firebase/firestore";
    import { onDestroy } from "svelte";
    import Toastify from "toastify-js";

    let searchTerm = "";
    let listaPacientesFiltrada=[];
    let pacientes = [];
    let paciente = {
        nombre: "",
        apellido: "",
        nroSocio: "",
    };
    let editStatus = false;
    let currentId = "";

    const agregarPaciente = async () => {
        try {
            await addDoc(collection(db, "Pacientes"), {
                ...paciente,
                createdAt: new Date(),
            });
            console.log("paciente agregado");
            Toastify({
                text: "Nuevo paciente agregado",
            }).showToast();
        } catch (error) {
            console.error(error);
        }
    };

    const unsub = onSnapshot(
        collection(db, "Pacientes"),
        (querySnapshot) => {
            pacientes = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });

            console.log(pacientes);
        },
        (err) => {
            console.log(err);
        }
    );

    onDestroy(unsub); // quita la suscripcion a la escucha al cambiar de pagina o destruir el componente

    const borrarPaciente = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                borrarConfirmado(id);
            }
        });
    };

    const borrarConfirmado = async (id) => {
        try {
            await deleteDoc(doc(db, "Pacientes", id));
            Toastify({
                text: "Paciente eliminado",
                style: {
                    background: "red",
                },
            }).showToast();
        } catch (error) {
            console.error(error);
        }
    };

    const editarPaciente = (currentPaciente) => {
        paciente.apellido = currentPaciente.apellido;
        paciente.nombre = currentPaciente.nombre;
        paciente.nroSocio = currentPaciente.nroSocio;
        currentId = currentPaciente.id;
        editStatus = true;
    };

    const actualizarPaciente = async () => {
        try {
            await updateDoc(doc(db, "Pacientes", currentId), paciente);
            Toastify({
                text: "paciente actualizado",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            editStatus = false;
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!editStatus) {
                agregarPaciente();
            } else {
                console.log("actualizando datos paciente");
                actualizarPaciente();
            }
        } catch (error) {
            console.error(error);
        }

        paciente = {
            nombre: "",
            apellido: "",
            nroSocio: "",
        };
        editStatus = false;
        currentId = "";
    };

    $: listaPacientesFiltrada = pacientes.filter(item=>item.apellido.toLowerCase().startsWith(searchTerm)); 
    $: console.log(listaPacientesFiltrada)
</script>

<main>
    <div class="container p-4">
        <div class="row">
            <div class="col-md-4">
                <form
                    class="card card-body p-5"
                    on:submit|preventDefault={handleSubmit}
                >
                    <div class="mb-3">
                        <label class="text-secondary fs-5" for="Apellido"
                            >Apellido</label
                        >
                        <input
                            bind:value={paciente.apellido}
                            type="text"
                            placeholder="escribe el apellido"
                            class="form-control"
                        />
                    </div>

                    <div class="mb-3">
                        <label class="text-secondary fs-5" for="Nombre"
                            >Nombre</label
                        >
                        <input
                            bind:value={paciente.nombre}
                            type="text"
                            placeholder="escribe el nombre"
                            class="form-control"
                        />
                    </div>

                    <div class="mb-3">
                        <label class="text-secondary fs-5" for="nroSocio"
                            >nro. Socio</label
                        >
                        <input
                            bind:value={paciente.nroSocio}
                            type="text"
                            placeholder="escribe el nro de socio"
                            class="form-control"
                        />
                    </div>
                    <div>
                        <button class="btn btn-primary">save</button>
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                <div class="row">
                    <label for="buscar">Buscar Paciente</label>
                    <input type="text" bind:value={searchTerm} />
                </div>
                {#each listaPacientesFiltrada as paciente}
                    <div class="card card-body mt-1">
                        <div class="d-flex justify-content-start">
                            <p>{paciente.nroSocio} -</p>
                            <p>{paciente.apellido}.</p>
                            <p>{paciente.nombre}</p>
                        </div>
                        <div class="d-flex justify-content-start">
                            <button
                                on:click={editarPaciente(paciente)}
                                class="btn btn-warning"
                            >
                                <i class="material-icons">edit</i>
                            </button>
                            <div>
                                <button
                                    on:click={borrarPaciente(paciente.id)}
                                    class="btn btn-danger"
                                >
                                    <i class="material-icons">delete_forever</i>
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>

<style>
</style>
