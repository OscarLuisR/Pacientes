<template>
    <div>
        <div class="container">
            <form class="form-horizontal" autocomplete="off" @submit.prevent="guardar">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group left">
                            <label for="" class="control-label">Nombre *</label>
                            
                            <input 
                                type="text" 
                                :class="['form-control', classInput($v.form.nombre)]"
                                name="nombre" 
                                id="nombre" 
                                v-model.trim="$v.form.nombre.$model" 
                                placeholder="Ingrese un nombre"
                            >
                            
                            <div class="invalid-feedback">{{ getErrorMessage($v.form.nombre) }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group left">
                            <label for="" class="control-label">Direccion *</label>

                            <input 
                                type="text" 
                                :class="['form-control', classInput($v.form.direccion)]"
                                name="direccion" 
                                id="direccion" 
                                v-model.trim="$v.form.direccion.$model" 
                                placeholder="Ingrese una direccion"
                            >
                            
                            <div class="invalid-feedback">{{ getErrorMessage($v.form.direccion) }}</div>
                        </div>                        
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group left">
                            <label for="" class="control-label">Correo *</label>
                            
                            <input 
                                type="text" 
                                :class="['form-control', classInput($v.form.correo)]"
                                name="correo" 
                                id="correo" 
                                v-model.trim="$v.form.correo.$model" 
                                placeholder="Ingrese un correo"
                            >

                            <div class="invalid-feedback">{{ getErrorMessage($v.form.correo) }}</div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group left">
                            <label for="" class="control-label">Codigo Postal</label>
                            
                            <input 
                                type="text" 
                                class="form-control" 
                                name="codigopostal" 
                                id="codigopostal" 
                                v-model.trim="form.codigopostal" 
                                placeholder="Ingrese un codigo postal"
                            >
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group left">
                            <label for="" class="control-label">Genero</label>
                            
                            <input 
                                type="text" 
                                class="form-control" 
                                name="genero" 
                                id="genero" 
                                v-model.trim="form.genero" 
                                placeholder="Ingrese un genero"
                            >
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group left">
                            <label for="" class="control-label">Telefono</label>
                            
                            <input 
                                type="text" 
                                class="form-control" 
                                name="telefono" 
                                id="telefono" 
                                v-model.trim="form.telefono" 
                                placeholder="Ingrese un telefono"
                            > 
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group left">
                            <label for="" class="control-label">Dni *</label>
                            
                            <input 
                                type="text" 
                                :class="['form-control', classInput($v.form.dni)]"
                                name="dni" 
                                id="dni" 
                                v-model.trim="$v.form.dni.$model" 
                                placeholder="Ingrese un Dni"
                            >

                            <div class="invalid-feedback">{{ getErrorMessage($v.form.dni) }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary mr-4">Guardar</button>
                            <button type="button" class="btn btn-dark mr-4" @click="salir()">Salir</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import pacienteService from '../services/api/pacienteService.js';
    import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';
    import alertService from '../services/alert/alertService';

    export default {
        name:"DashboardNuevo",
        
        data() {
            return {
                form: {
                    nombre: '',
                    dni: '',
                    direccion: '', 
                    codigopostal: '',
                    telefono: '',
                    genero: '',
                    correo: ''
                }
            }
        },
        
        validations: {
            form: {
                nombre: { required, minLength: minLength(4), maxLength: maxLength(15) },
                dni: { required },
                direccion: { required },
                correo: { required, email }
            }
        },

        computed: {
            classInput: () => (field) => {
                return (field.$error && field.$dirty ? 'is-invalid' : !field.$error && field.$dirty ? 'is-valid' : '');
            },

            getErrorMessage: () => (field) => {
                /* VERIFICAR SI TIENE ERROR */
                if (!field.$error) {
                    return null
                }

                const messages = {
                    required: 'Campo requerido',
                    minLength: `El campo debe tener al menos ${field.$params.minLength ? field.$params.minLength.min: 0} caracteres`,
                    maxLength: `El campo debe tener como máximo ${field.$params.maxLength ? field.$params.maxLength.max: 0} caracteres`,
                    email: 'Debe ingresar un correo válido'                    
                };

                for (const property in field) {
                    if (!property.includes('$') && !field[property]) {
                        return messages[property];
                    }
                }

                return null;
            }
        },

        methods:{
            async guardar() {
                /* VERIFICAR LA VALIDES DEL FORMULARIO */
                this.$v.$touch();
                
                if (this.$v.$invalid) {
                    // Mensaje Error
                    alertService.muestraAlerta('error', 'Oops...', 'Verifique los Campos Obligatorios.');

                    return;
                }

                const res = await pacienteService.post('', this.form);

                if (res.data.error) {
                    // Mensaje Error
                    alertService.muestraAlerta('error', 'Oops...', res.data.message);
                }else {
                    // Mensaje Ok
                    alertService.muestraAlerta('success', 'Hecho', 'Paciente Creado con Exito');
                    
                    this.$router.push('/index');
                }
            },

            salir() {
                this.$router.push("/index");
            }
        }
    }
</script>

<style scoped>
    .left{
        text-align: left;
    };
    .margen{
        margin-left: 15px;
        margin-right: 15px;;
    }
</style>