var url = "https://api.spaceXdata.com/v3/launches?limit=100";
var launchyear = '';
var launchsuccess = '';
var landsuccess = '';

$(document).ready(function () {
    calloriginalurl();
});

function calloriginalurl() {
    $('.dataafterfilters').html('');
    var html = '';
    var filtershtml = '';
    $.getJSON(url, function (msg) {
        var result = (msg);
    
        for (i = 0; i < result.length; i++) {
            var img = document.createElement('img');
            img.src = result[i].links.mission_patch_small;
            var missionname = result[i].mission_name + ' #' + result[i].flight_number;
            //var img = result[i].links.mission_patch_small
            html += '<div id="popup-capabilityinfo">';
            html += '<div id="popup-imageforspace"><img class="missionImg" src= ' + img.src + '></div>';
            html += '<div id="popup-nameforspace">' + missionname + '</div>';
            html += '<div id="popup-missionidforspace">Mission Ids: ' + result[i].mission_id + '</div>';
            html += '<div id="popup-launchyearforspace">Launch Year:<span class="launchYear"> ' + result[i].launch_year + '</span></div>';
            html += '<div id="popup-successfullaunchofspace">Successful Launch: <span class="launchYear">' + result[i].launch_success + '</span></div>';
            html += '<div id="popup-successfullandofspace">Successful Landing: <span class="launchYear">' + result[i].rocket.first_stage.cores[0].land_success + '</span></div>';
            html += '</div>';
        }
        $('.dataafterfilters').append(html);

    });
}

function appenddata(obj, id) {
    var parameter = $(obj).attr('id');
    var islaunchyearempty = true;
    var islaunchsuccessempty = true;
    var islandsuccessempty = true;
    if (parameter == 'launch_year') {
        launchyear = $(obj).html();
    }
    else if (parameter == 'launch_success') {
        launchsuccess = $(obj).html().toLowerCase();
    }
    else {
        landsuccess = $(obj).html().toLowerCase();
    }

    if (parameter == 'launch_year') {
        var parametertobepassed = $(obj).html();
    }
    else {
        var parametertobepassed = $(obj).html().toLowerCase();
    }

    var filtertype = '';
    //    filtertype = '&' + parameter + '=' + parametertobepassed;
    //}
    //if (filtertype != '') {
    if (launchyear != '') {
        islaunchyearempty = false;
        //filtertype = '&' + parameter + '=' + parametertobepassed;
    }
    else if (launchsuccess != '') {
        islaunchsuccessempty = false;
        //filtertype = filtertype + '&' + parameter + '=' + parametertobepassed;
    }
    else if (landsuccess != '') {
        islandsuccessempty = false;
        //filtertype = filtertype + '&' + parameter + '=' + parametertobepassed;
    }
    //}
    filtertype = '&' + 'launch_year' + '=' + launchyear + '&' + 'launch_success' + '=' + launchsuccess + '&' + 'land_success' + '=' + landsuccess;
    if (id == 'launch_year') {
        $('.year1').removeClass('selected');
        $('.year2').removeClass('selected');
    }
    else if (id == 'launch_success') {
        $('.year1launch').removeClass('selected');
        $('.year2launch').removeClass('selected');
    }
    else {
        $('.year1land').removeClass('selected');
        $('.year2land').removeClass('selected');
    }
    $(obj).addClass('selected');

    geturl(obj, id, parameter, parametertobepassed, filtertype);

}

function geturl(obj, id, parameter, parametertobepassed, filtertype) {
    var url1 = "https://api.spaceXdata.com/v3/launches?limit=100";
    url = url1 + filtertype;
    calloriginalurl();
}
