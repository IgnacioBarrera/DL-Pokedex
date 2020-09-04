/* FUNCION PRINCIPAL DOCUMENT READY CORTA */
$(function () {
    $('#buscador-boton').click(function (e) { 
        e.preventDefault();
        /* POKEMON INGRESADO */
        let pokeIngresado = $('#buscador-input').val();
        /* PATRON SOLO LETRAS*/
        let soloLetras = /[A-Z.0-9\W_]/gm;
        /* VALIDACION SOLO LETRAS MINUSCULAS*/
        if(pokeIngresado == ''){
            alert("Debe rellenar el campo.");
            return false;
        }
        if(soloLetras.test(pokeIngresado) === true){
            alert("Solamente se permiten letras y en minúsculas.");
            return false;
        } else {
            /* AJAX */
            $.ajax({
                dataType: "json",
                type: "GET",
                url: `https://pokeapi.co/api/v2/pokemon/${pokeIngresado}`,
                /* SI ES CORRECTO */
                success: function (data) {
                    /* TABLA CON SLOT, HABILIDAD Y OCULTO */
                    $('#resultado').html(`
                        <div class="text-center">
                            <h3>Pokemón: ${data.name}</h3>
                            <img src="${data.sprites.front_default}" alt="${data.name}">
                            <h3>Tipo: ${data.types[0].type.name}</h3>
                            <h3>Peso: ${data.weight}00 grs.</h3>
                        </div>
                    `);
                    let resultado = `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Slot</th>
                                    <th>Habilidad</th>
                                    <th>Oculto</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;

                    data.abilities.forEach(element => {
                        console.log(element.ability.name);
                        resultado += `
                            <tr>
                                <th>${element.slot}</th>
                                <td>${element.ability.name}</td>
                                <td>${element.is_hidden}</td>
                            </tr>
                        `;
                    });
                    resultado += `
                        </tbody>
                        </table>
                    `;
                    $('#resultado').append(resultado);
                    /* VARIABLES N° VIDA, ATAQUE, DEFENSA, ATAQUE ESPECIAL, DEFENSA ESPECIAL, VELOCIDAD. */
                    var Nhp = data.stats[0].base_stat;
                    var Nattack = data.stats[1].base_stat;
                    var Ndefense = data.stats[2].base_stat;
                    var Nspecialatack = data.stats[3].base_stat;
                    var Nspecialdefense = data.stats[4].base_stat;
                    var Nspeed = data.stats[5].base_stat;
                    console.log(Nhp);
                    console.log(Nattack);
                    console.log(Ndefense);
                    console.log(Nspecialatack);
                    console.log(Nspecialdefense);
                    console.log(Nspeed);
                    /* GRAFICO CANVASJS */
                    var options = {
                        title: {
                            text: `Estadísticas ${pokeIngresado} en jQuery CanvasJS`              
                        },
                        data: [              
                        {
                            type: "column",
                            dataPoints: [
                                { label: "HP",  y: Nhp },
                                { label: "Attack", y: Nattack  },
                                { label: "Defense", y: Ndefense  },
                                { label: "Special-attack",  y: Nspecialatack  },
                                { label: "Special-defense", y: Nspecialdefense},
                                { label: "Speed",  y: Nspeed  }
                            ]
                        }
                        ]
                    };
                    $("#chartContainer").CanvasJSChart(options);
                },
                /* SI DA ERROR */
                error: function () {
                    alert("Pokemon no existente.");
                }
            });
        };
    });
});