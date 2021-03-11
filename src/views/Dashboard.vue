<template>
    <div>
        <div class="container">
            <button class="btn btn-primary" @click="nuevo()" >Nuevo Paciente</button>
            
            <hr>

            <table class="table table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Codigo Postal</th>
                        <th scope="col">Direccion</th>
                        <th scope="col" class="text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="paciente in pacientes" :key=paciente._id>
                        <td>{{ paciente.nombre }}</td>
                        <td>{{ paciente.correo }}</td>
                        <td>{{ paciente.dni }}</td>
                        <td>{{ paciente.codigopostal }}</td>
                        <td>{{ paciente.direccion }}</td>
                        <td>    
                            <button class="btn btn-warning btn-sm mr-4" @click="editar(paciente._id)">Editar</button>
                        
                            <button class="btn btn-danger btn-sm" @click="eliminar(paciente._id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        
            <hr>

            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" :class="{'disabled': !hasPrevPage}">
                        <a class="page-link" href="#" @click="cambiarPagina(1)">First</a>
                    </li>

                    <li class="page-item" :class="{'disabled': !hasPrevPage}">
                        <a class="page-link" href="#" @click="cambiarPagina(page - 1)">Previous</a>
                    </li>

                    <li class="page-item" v-for="item of paginacion" :key="item" :class="{'active': item === page}">
                        <a class="page-link" href="#" @click="cambiarPagina(item)">{{ item }}</a>
                    </li>

                    <li class="page-item" :class="{'disabled': !hasNextPage}">
                        <a class="page-link" href="#" @click="cambiarPagina(page + 1)">Next</a>
                    </li>

                    <li class="page-item" :class="{'disabled': !hasNextPage}">
                        <a class="page-link" href="#" @click="cambiarPagina(totalPages)">Last</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    import pacienteService from '../services/api/pacienteService.js';
    
    export default {
        name: "Dashboard",
        
        data() {
            return {
                pacientes: [],
                page: 1,
                paginationMin: 1,
                paginationMax: 10,
                paginacion: [],
                hasNextPage: false,
                hasPrevPage: false,
                totalPages: 0,
                fecha: null
            }
        },
        methods: {
            cambiarPagina(page) {
                if (this.page != page) {
                    this.page = page;

                    this.getAll();
                }
            },

            editar(_id) {
                this.$router.push(`/editar/${_id}`);
            },

            nuevo() {
                this.$router.push(`/nuevo`);
            },

            eliminar(_id) {
                this.$router.push(`/editar/${_id}`); // Es la misma ventana de EDITAR
            },

            async getAll() {
                try {
                    const res = await pacienteService.get(`?page=${this.page}&paginationMin=${this.paginationMin}&paginationMax=${this.paginationMax}`);

                    this.pacientes = res.data.results['docs'];

                    // PAGINACION
                    this.paginacion = res.data.results.pagination;
                    this.hasNextPage = res.data.results.hasNextPage;
                    this.hasPrevPage = res.data.results.hasPrevPage;
                    this.paginationMin = res.data.results.pagination[0];
                    this.paginationMax = res.data.results.pagination[res.data.results.pagination.length-1]
                    this.totalPages = res.data.results.totalPages;

                } catch (err) {
                    console.log(err);
                }
            }
        },
        mounted(){
            this.getAll();
        }        
    };
</script>

<style scoped>

</style>