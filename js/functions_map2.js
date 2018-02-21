// JavaScript Document "map_2"

// Modal when load page


var SC = [];
var currGroup;
var areasdrawn = 0;
var name_groups = [];
var current_group = [];
var number = 0;
var spatialyes = 0;
var contador = 0;

function startAll() {


    $("#name_actual_group").select2({
        tags: [],
        tokenSeparators: [","]
    });


    $('#plus_group').click(function () {
        if (!$('#actual_group').val() && (name_groups.length == 0)) {
            alert(translator.getKeyLanguageValue("general7"));
        }
        else if (!$('#actual_group').val() && (name_groups.length > 0)) {
            $("#continuar1").removeClass("hidden").addClass("show");
        }
        else {
            name_groups.push($('#actual_group').val());
            $('#actual_group').val("");
            namesgroups();
            contador = 0;

        }

    });


    function namesgroups() {
        if (name_groups.length > 0) {
            var text_groups = "";
            for (i = 0; i < name_groups.length; i++) {
                current_group[i] = name_groups[i];
                text_groups = text_groups + '<br>' + translator.getKeyLanguageValue("general19") + ": " + current_group[i];
            }
            $("#words1").html(text_groups);
            $("#continuar1").removeClass("hidden").addClass("show");

        }

    }

    $("#actual_group").keypress(function (event) {

        if (!$('#actual_group').val()) {
            if (contador == 0) {
                $("#continuar1").removeClass("show").addClass("hidden");
            }
            else {
                $("#continuar1").removeClass("hidden").addClass("show");
            }
        }
        else {
            $("#continuar1").removeClass("show").addClass("hidden");
        }

    });

    $('#submit_name_group').click(function () {
        //name_groups = $('#name_actual_group').val();
        if (name_groups.length > 0) {
            $("#specifications").toggleClass("hidden show");
            $("#groups_done").toggleClass("hidden show");
            namegroup();

            $("#group_name_nature").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);


            currGroup = {
                name: name_groups[number],
                areas: [],
                nature: 0
            };
            $("#pepe").toggleClass("hidden show");
            $("#pepa").toggleClass("hidden show");
            startMapComponents();
        }
        else {
            alert(translator.getKeyLanguageValue("general7"));
        }
    });


    function namegroup() {
        var tete2 = name_groups[number];

        $("#group_name_nature").html(translator.getKeyLanguageValue("map2-3"));
        var replaced = $("#group_name_nature").html().replace('hola', '<b>' + tete2 + '</b>');
        $("#group_name_nature").html(replaced);
        $("#textchange").html(translator.getKeyLanguageValue("map2-5"));
        $("#textchange_nature").html(translator.getKeyLanguageValue("map2-4"));
        var replaced1 = $("#textchange").html().replace('X', '<b>' + tete2 + '</b>');
        var replaced2 = $("#textchange_nature").html().replace('X', '<b style="font-size: 18px">' + tete2 + '</b>');
        $("#textchange").html(replaced1);
        $("#textchange_nature").html(replaced2);


    };


    $('#spatial_dimension').click(function () {

        $("#other_name").removeClass().addClass("hidden");


        if ($("#nature").val() == "0") {
            alert(translator.getKeyLanguageValue("general8"));
        }


        if ($("#nature").val() != "19") {
            currGroup.nature = $('#nature').val();
            drawAreas();
        }
        else {
            if (!$("#other").val()) {
                alert(translator.getKeyLanguageValue("general9"));
            }
            else {
                currGroup.nature = $('#other').val();
                $("#SC_group").removeClass().addClass("show");
                drawAreas();
            }
        }

        function drawAreas() {

            $("#nature").val("0");
            $('#other').val("");

            if ($("input[name=spatial]:checked").val() == "true") {

                $("#title_let_draw").html(translator.getKeyLanguageValue("map2-26"));
                var replacetitle = $("#title_let_draw").html().replace('X', '<b>' + name_groups[number] + '</b>');
                $("#title_let_draw").html(replacetitle);
                $("#let_draw").html(translator.getKeyLanguageValue("map2-26a"));
                var replaceddraw = $("#let_draw").html().replace('X', '<b>' + name_groups[number] + '</b>');
                $("#let_draw").html(replaceddraw);
                $("#draw").toggleClass("hidden show");
                buttonDraw.prop('disabled', false);
                $('#button-freguesia').prop('disabled', false);
                $('#button-freguesiaxs').prop('disabled', false);


                $("#SC_group").toggleClass("hidden show");
                $("#specifications").toggleClass("hidden show");
                spatialyes = spatialyes + 1;
            }
            else {

                SC.push(currGroup);

                if (number == name_groups.length - 1) {


                    // var id = util.getFromLocalStorage(util.interPageDataKey);

                    for (var i = 0; i < SC.length; i++) {
                        var cGroup = SC[i];
                        for (var j = 0; j < cGroup.areas.length; j++) {
                            cGroup.areas[j].layer = /*JSON.stringify(*/cGroup.areas[j].layer.toGeoJSON()/*)*/;
                        }
                    }

                    var data2 = {
                        type: "sc",
                        id: id,
                        groups: SC
                    };

                    app.setSC(id, data2, function (response) {
                        if (response === false) {
                            alert(translator.getKeyLanguageValue("general1"));
                        }
                        else {
                            util.redirectToPage({
                                url: "map3.html",
                                payload: {id: response.id, center: mapCenter}
                            });
                        }
                    });


                }
                else {
                    number = number + 1;
                    namegroup();
                    currGroup = {
                        name: name_groups[number],
                        areas: [],
                        nature: 0
                    };
                    $("#specifications").removeClass().addClass("show");
                    $("#another_draw").removeClass().addClass("hidden");
                    $("#SC_group").removeClass().addClass("hidden");
                    $("#group_name_nature").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
                    $("input[name=spatial][value=true]").prop('checked', true);


                }

            }
        };


    });

    $('#nature').change(function () {
        if ($("#nature").val() == "19") {
            if (anterior != "19") {
                $("#SC_group").removeClass().addClass("hidden");
            }
            $("#other_name").removeClass().addClass("show");
            var anterior = $('#nature').val();
        }
        else if (($("#nature").val() == "0")) {
            $("#SC_group").removeClass().addClass("hidden");
            $("#other_name").removeClass().addClass("hidden");


        }
        else {


            $("#other_name").removeClass().addClass("hidden");
            $("#SC_group").removeClass().addClass("show");
            var anterior = $('#nature').val();
        }
    });

    $('#nature_write').click(function () {

        if ($("#nature").val() == "19") {
            if (!$("#other").val()) {
                // alert("Please, introduce the nature of the group.")
                alert(translator.getKeyLanguageValue("general9"));
            }
            else {
                $("#SC_group").removeClass().addClass("show");
            }
        }
    });

    $('#bonding_bridging_done').click(function () {


        var scvalidationbondingbridging = $('[name=bosc1]:checked,[name=bosc2]:checked,[name=bosc3]:checked,[name=brsc1]:checked,[name=brsc2]:checked, [name=brsc3]:checked');
        if (scvalidationbondingbridging.length < 6) {
            alert(translator.getKeyLanguageValue("general5"));
            return;
        }

        $("#another_draw").toggleClass("hidden show");
        $("#questions_bonding_bridging").toggleClass("hidden show");
        areasdrawn = areasdrawn + 1;
        counterAreasName();
        buttonDraw.prop('disabled', false);
        buttonDelete.prop('disabled', true);
        $('#button-freguesia').prop('disabled', false);
        $('#button-freguesiaxs').prop('disabled', false);
        $("#finish_button").removeClass().addClass("show");
        map.setZoom(zoommap);


        var polygonData = {
            type: "sca",
            layer: L.geoJson(drawnItems.toGeoJSON()),
            livingIn: ($("input[name=live]:checked").val()) === 'true',
            socialCapital: {
                bosc1: parseInt($("input[name=bosc1]:checked").val()),
                bosc2: parseInt($("input[name=bosc2]:checked").val()),
                bosc3: parseInt($("input[name=bosc3]:checked").val()),

                brsc1: parseInt($("input[name=brsc1]:checked").val()),
                brsc2: parseInt($("input[name=brsc2]:checked").val()),
                brsc3: parseInt($("input[name=brsc3]:checked").val()),

            }
        };

        $("input[name=bosc1]").prop('checked', false);
        $("input[name=bosc2]").prop('checked', false);
        $("input[name=bosc3]").prop('checked', false);

        $("input[name=brsc1]").prop('checked', false);
        $("input[name=brsc2]").prop('checked', false);
        $("input[name=brsc3]").prop('checked', false);



        currGroup.areas.push(polygonData);

        map.removeLayer(drawnItems);
        drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
        map.addLayer(polygonData.layer);

    });


    var group = new L.featureGroup();

    $('#button_more_areas').click(function () {
        areasdrawn = 0;
        $("#finish_button").removeClass().addClass("hidden");
        map.removeLayer(drawnItems);
        //L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {}).addTo(map);

        currGroup.position = number;
        SC.push(currGroup);

        for (var j = 0; j < currGroup.areas.length; j++) {
            map.removeLayer(currGroup.areas[j].layer);
        }

        if (number == name_groups.length - 1) {

            for (var i = 0; i < SC.length; i++) {
                var cGroup = SC[i];
                for (var j = 0; j < cGroup.areas.length; j++) {
                    cGroup.areas[j].layer = /*JSON.stringify(*/cGroup.areas[j].layer.toGeoJSON()/*)*/;
                }
            }


            var data2 = {
                type: "sc",
                id: id,
                groups: SC
            };

            app.setSC(id, data2, function (response) {
                if (response === false) {
                    alert(translator.getKeyLanguageValue("general1"));
                }
                else {
                    util.redirectToPage({
                        url: "map3.html",
                        payload: {id: response.id, center: mapCenter}
                    });
                }
            });


            //$("#select_group").toggleClass("hidden show");
            //$("#another_draw").toggleClass("hidden show");
        }
        else {
            number = number + 1;
            namegroup();
            currGroup = {
                name: name_groups[number],
                areas: [],
                nature: 0
            };
            drawnItems = new L.FeatureGroup();
            map.addLayer(drawnItems);

            $("#specifications").removeClass().addClass("show");
            $("#another_draw").removeClass().addClass("hidden");
            buttonDelete.prop('disabled', true);
            buttonDraw.prop('disabled', true);
        }
    });


    //Freguesia buttons
    $('#d-ajuda').click(function () {
        map.setView([38.711402, -9.199039], 15);
    });

    $('#d-alcantara').click(function () {
        map.setView([38.710676, -9.182990], 15);
    });

    $('#d-alvalade').click(function () {
        map.setView([38.753182, -9.151691], 15);
    });

    $('#d-areeiro').click(function () {
        map.setView([38.742261, -9.133480], 15);
    });

    $('#d-arroios').click(function () {
        map.setView([38.727819, -9.140717], 15);
    });

    $('#d-avenidas').click(function () {
        map.setView([38.739568, -9.149152], 15);
    });

    $('#d-beato').click(function () {
        map.setView([38.733268, -9.113798], 15);
    });

    $('#d-belem').click(function () {
        map.setView([38.702305, -9.215116], 15);
    });

    $('#d-benfica').click(function () {
        map.setView([38.737770, -9.196060], 15);
    });


    $('#d-campo').click(function () {
        map.setView([38.719247, -9.166428], 15);
    });

    $('#d-campolide').click(function () {
        map.setView([38.731470, -9.165880], 15);
    });

    $('#d-carnide').click(function () {
        map.setView([38.763229, -9.188106], 15);
    });
    $('#d-estrela').click(function () {
        map.setView([38.710837, -9.153887], 15);
    });

    $('#d-lumiar').click(function () {
        map.setView([38.770204, -9.160321], 15);
    });

    $('#d-marvila').click(function () {
        map.setView([38.750852, -9.116730], 15);
    });

    $('#d-misericordia').click(function () {
        map.setView([38.711113, -9.147195], 15);
    });

    $('#d-olivais').click(function () {
        map.setView([38.772473, -9.126950], 15);
    });

    $('#d-parque').click(function () {
        map.setView([38.765502, -9.099971], 15);
    });

    $('#d-penha').click(function () {
        map.setView([38.725873, -9.124024], 15);
    });

    $('#d-santa').click(function () {
        map.setView([38.785799, -9.155323], 15);
    });

    $('#d-santamaria').click(function () {
        map.setView([38.711168, -9.137130], 15);
    });

    $('#d-santo').click(function () {
        map.setView([38.718769, -9.149313], 15);
    });

    $('#d-sao').click(function () {
        map.setView([38.752111, -9.177416], 15);
    });

    $('#d-saovicente').click(function () {
        map.setView([38.718305, -9.130119], 15);
    });


//Freguesia buttons XS
    $('#d-ajuda-xs').click(function () {
        map.setView([38.711402, -9.199039], 15);
    });

    $('#d-alcantara-xs').click(function () {
        map.setView([38.710676, -9.182990], 15);
    });

    $('#d-alvalade-xs').click(function () {
        map.setView([38.753182, -9.151691], 15);
    });

    $('#d-areeiro-xs').click(function () {
        map.setView([38.742261, -9.133480], 15);
    });

    $('#d-arroios-xs').click(function () {
        map.setView([38.727819, -9.140717], 15);
    });

    $('#d-avenidas-xs').click(function () {
        map.setView([38.739568, -9.149152], 15);
    });

    $('#d-beato-xs').click(function () {
        map.setView([38.733268, -9.113798], 15);
    });

    $('#d-belem-xs').click(function () {
        map.setView([38.702305, -9.215116], 15);
    });

    $('#d-benfica-xs').click(function () {
        map.setView([38.737770, -9.196060], 15);
    });


    $('#d-campo-xs').click(function () {
        map.setView([38.719247, -9.166428], 15);
    });

    $('#d-campolide-xs').click(function () {
        map.setView([38.731470, -9.165880], 15);
    });

    $('#d-carnide-xs').click(function () {
        map.setView([38.763229, -9.188106], 15);
    });
    $('#d-estrela-xs').click(function () {
        map.setView([38.710837, -9.153887], 15);
    });

    $('#d-lumiar-xs').click(function () {
        map.setView([38.770204, -9.160321], 15);
    });

    $('#d-marvila-xs').click(function () {
        map.setView([38.750852, -9.116730], 15);
    });

    $('#d-misericordia-xs').click(function () {
        map.setView([38.711113, -9.147195], 15);
    });

    $('#d-olivais-xs').click(function () {
        map.setView([38.772473, -9.126950], 15);
    });

    $('#d-parque-xs').click(function () {
        map.setView([38.765502, -9.099971], 15);
    });

    $('#d-penha-xs').click(function () {
        map.setView([38.725873, -9.124024], 15);
    });

    $('#d-santa-xs').click(function () {
        map.setView([38.785799, -9.155323], 15);
    });

    $('#d-santamaria-xs').click(function () {
        map.setView([38.711168, -9.137130], 15);
    });

    $('#d-santo-xs').click(function () {
        map.setView([38.718769, -9.149313], 15);
    });

    $('#d-sao-xs').click(function () {
        map.setView([38.752111, -9.177416], 15);
    });

    $('#d-saovicente-xs').click(function () {
        map.setView([38.718305, -9.130119], 15);
    });

    translator.applyPreviousLanguage(function () {
        // Nothing yet to do
        L.drawLocal.draw.handlers.polygon.tooltip.start = translator.getKeyLanguageValue("general120");
        L.drawLocal.draw.handlers.polygon.tooltip.cont = translator.getKeyLanguageValue("general121");
        L.drawLocal.draw.handlers.polygon.tooltip.end = translator.getKeyLanguageValue("general122");
    });
}


function deleteareas() {
    if (currGroup.areas.length > 0) {
        counterAreasName();
        $("#another_draw").removeClass().addClass("show");
        $("#questions_bonding_bridging").removeClass().addClass("hidden");
    }
    else {
        $("#draw").removeClass().addClass("show");
        $("#questions_bonding_bridging").removeClass().addClass("hidden");
    }
    $("input[name=bosc1]").prop('checked', false);
    $("input[name=bosc2]").prop('checked', false);
    $("input[name=bosc3]").prop('checked', false);

    $("input[name=brsc1]").prop('checked', false);
    $("input[name=brsc2]").prop('checked', false);
    $("input[name=brsc3]").prop('checked', false);


}

function counterAreasName() {


    $("#counting_areas").html(translator.getKeyLanguageValue("map2-32a"));
    var replaced2 = $("#counting_areas").html().replace('L', areasdrawn);
    $("#counting_areas").html(replaced2);


    $("#change_name_group").html(translator.getKeyLanguageValue("map2-30a"));
    var replaced3 = $("#change_name_group").html().replace('X', '<b>' + name_groups[number] + '</b>');
    $("#change_name_group").html(replaced3);

}