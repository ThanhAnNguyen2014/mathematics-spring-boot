$(document).ready(function () {
});
var id_input = "";
function detech_input(e) {
    id_input = $(e).attr('id');
}

function clear_math(e) {
    var id_tem = $(e).closest('.box_math').attr('id');
    $('#' + id_tem + ' .mth_input').val('');
    $('#' + id_tem + ' td').removeClass("lf");
    $('#' + id_tem + ' td').removeClass("rt");
    $('#' + id_tem + ' td').removeClass("bm");
    $('#' + id_tem + ' td').removeClass("tp");
}

function view_math(e) {
    var id_tem = $(e).closest('.box_math').attr('id');
    var rows = new Array();
    var cols = new Array();
    var id_tem = $(e).closest('.box_math').attr('id');
    var k = 0;
    $('#' + id_tem + ' .mth_input').each(function () {

        if ($.trim($(this).val()) != "") {
            rows[k] = $(this).closest('td').attr('row');
            cols[k] = $(this).closest('td').attr('col');
            k++;
        }
    });
    var max_row = (getmax(rows));
    var min_row = (getmin(rows));
    var max_col = (getmax(cols));
    var min_col = (getmin(cols));
    var html = "<table class='table tb_view'>"
    for (var i = min_row; i <= max_row; i++) {
        html += "<tr>";
        for (var j = min_col; j <= max_col; j++) {
            html += "<td class='mth_td " + $('#' + id_tem + ' #mth_td_' + i + '_' + j).attr('class') + "' col='" + j + "' row='" + i + "'><span>" + $('#' + id_tem + ' #mth_input_' + i + '_' + j).val() + "</span></td>";
        }
        html += "</tr>";
    }
    html += "</table>";
    var html_tem = "";
    if ($.trim($('#' + id_tem + ' textarea').val()).length != 0) {
        var arr_tem = $('#' + id_tem + ' textarea').val().split('\n');
        html_tem = "<ul class='view_note'>"
        for (var i = 0; i < arr_tem.length; i++) {
            html_tem += "<li>" + arr_tem[i] + "</li>";
        }
        html_tem += "</ul>";
    }
    $('#' + id_tem + ' .lt123_view').html(html + html_tem);
}


function export_math(e) {
    var id_tem = $(e).closest('.box_math').attr('id');
    var rows = new Array();
    var cols = new Array();
    var id_tem = $(e).closest('.box_math').attr('id');
    var k = 0;
    $('#' + id_tem + ' .mth_input').each(function () {
        if ($.trim($(this).val()) != "") {
            rows[k] = $(this).closest('td').attr('row');
            cols[k] = $(this).closest('td').attr('col');
            k++;
        }
    });
    var max_row = (getmax(rows));
    var min_row = (getmin(rows));
    var max_col = (getmax(cols));
    var min_col = (getmin(cols));
    var html = "<table class='table tb_matrix'>"
    for (var i = min_row; i <= max_row; i++) {
        html += "<tr>";
        for (var j = min_col; j <= max_col; j++) {
            html += "<td class='mth_td' col='" + j + "' row='" + i + "'>" + $('#' + id_tem + ' #mth_input_' + i + '_' + j).val() + "</td>";
        }
        html += "</tr>";
    }
    html += "</table>";
    $('#' + id_tem + ' .lt123_view').html(html);
}

function getmax(arr) {
    var max = parseInt(arr[0]);
    for (i = 0; i < arr.length; i++) {
        if (max < parseInt(arr[i])) {
            max = parseInt(arr[i]);
        }
    }
    return max;
}
function getmin(arr) {
    var min = parseInt(arr[0]);
    for (i = 0; i < arr.length; i++) {
        if (min > parseInt(arr[i])) {
            min = parseInt(arr[i]);
        }
    }
    return min;
}

function add_math(e, op) {
    var id_tem = $(e).closest('.box_math').attr('id');
    switch (op) {
        case 'left':
            if ($('#' + id_tem + ' #' + id_input).closest('td').hasClass('lf')) {
                $('#' + id_tem + ' #' + id_input).closest('td').removeClass('lf');
            } else {
                $('#' + id_tem + ' #' + id_input).closest('td').addClass('lf');
            }
            break;
        case "right":
            if ($('#' + id_tem + ' #' + id_input).closest('td').hasClass('rt')) {
                $('#' + id_tem + ' #' + id_input).closest('td').removeClass('rt');
            } else {
                $('#' + id_tem + ' #' + id_input).closest('td').addClass('rt');
            }
            break;
        case "bottom":
            if ($('#' + id_tem + ' #' + id_input).closest('td').hasClass('bm')) {
                $('#' + id_tem + ' #' + id_input).closest('td').removeClass('bm');
            } else {
                $('#' + id_tem + ' #' + id_input).closest('td').addClass('bm');
            }
            break;
        case "top":
            if ($('#' + id_tem + ' #' + id_input).closest('td').hasClass('tp')) {
                $('#' + id_tem + ' #' + id_input).closest('td').removeClass('tp');
            } else {
                $('#' + id_tem + ' #' + id_input).closest('td').addClass('tp');
            }
            break;
        default:
    }
}

function addclass_math(e, op) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    switch (op) {
        case 'left':
            if ($('#' + id_dialog + ' #' + id_input).closest('.item_col').hasClass('lf')) {
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').removeClass('lf');
            } else {
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').addClass('lf');
            }
            break;
        case "right":
            if ($('#' + id_dialog + ' #' + id_input).closest('.item_col').hasClass('rt')) {
                $('#' + id_input).closest('.item_col').removeClass('rt');
            } else {
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').addClass('rt');
            }
            break;
        case "right_":
            if ($('#' + id_dialog + ' #' + id_input).closest('.item_col').hasClass('rt_')) {
                $('#' + id_input).closest('.item_col').removeClass('rt_');
            } else {
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').addClass('rt_');
            }
            break;
        case "bottom":
            if ($('#' + id_dialog + ' #' + id_input).closest('.item_col').hasClass('bm')) {
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').removeClass('bm');
            } else {
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').addClass('bm');
            }
            break;
        case "top":
            if ($('#' + id_dialog + ' #' + id_input).closest('.item_col').hasClass('tp')) {
                $('#' + id_input).closest('.item_col').removeClass('tp');
            } else {
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').addClass('tp');
            }
            break;
        case "input":
            if ($('#' + id_dialog + ' #' + id_input).closest('.item_col').hasClass('otrong')) {
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').removeClass('otrong');
            } else {
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').addClass('otrong');
            }
            break;
        case "cong":
            var id_parent = $('#' + id_dialog + ' #' + id_input).closest('.item_col').attr('id');
            if (!$('#' + id_dialog + ' #' + id_parent).hasClass('pcong')) {
                $('#' + id_dialog + ' #' + id_parent).addClass('pcong')
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').removeClass('ptru');
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').removeClass('pnhan');
                $('#' + id_dialog + ' #' + id_parent + ' .phep_tinh').remove();
                if (!$('#' + id_dialog + ' #' + id_parent).hasClass('otrong')) {
                    $('#' + id_dialog + ' #' + id_parent).append("<span class='phep_tinh phep_cong'>+</span>");
                } else {
                    $('#' + id_dialog + ' #' + id_input).addClass('phep_tinh_input');
                }
            } else {
                $('#' + id_dialog + ' #' + id_parent).removeClass('pcong')
                $('#' + id_dialog + ' #' + id_parent + ' .phep_tinh').remove();
                $('#' + id_dialog + ' #' + id_input).removeClass('phep_tinh_input');
            }
            break;
        case "nhan":
            var id_parent = $('#' + id_dialog + ' #' + id_input).closest('.item_col').attr('id');
            if (!$('#' + id_dialog + ' #' + id_parent).hasClass('pnhan')) {
                $('#' + id_dialog + ' #' + id_parent).addClass('pnhan')
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').removeClass('ptru');
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').removeClass('pcong');
                $('#' + id_dialog + ' #' + id_parent + ' .phep_tinh').remove();
                if (!$('#' + id_dialog + ' #' + id_parent).hasClass('otrong')) {
                    $('#' + id_dialog + ' #' + id_parent).append("<span class='phep_tinh phep_nhan'>x</span>");
                } else {
                    $('#' + id_dialog + ' #' + id_input).addClass('phep_tinh_input');
                }
            } else {
                $('#' + id_dialog + ' #' + id_parent).removeClass('pnhan')
                $('#' + id_dialog + ' #' + id_parent + ' .phep_tinh').remove();
                $('#' + id_dialog + ' #' + id_input).removeClass('phep_tinh_input');
            }
            break;
        case "tru":
            var id_parent = $('#' + id_dialog + ' #' + id_input).closest('.item_col').attr('id');
            if (!$('#' + id_dialog + ' #' + id_parent).hasClass('ptru')) {
                $('#' + id_dialog + ' #' + id_parent).addClass('ptru')
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').removeClass('pcong');
                $('#' + id_dialog + ' #' + id_input).closest('.item_col').removeClass('pnhan');
                $('#' + id_dialog + ' #' + id_parent + ' .phep_tinh').remove();
                if (!$('#' + id_dialog + ' #' + id_parent).hasClass('otrong')) {
                    $('#' + id_dialog + ' #' + id_parent).append("<span class='phep_tinh phep_tru'>-</span>");
                } else {
                    $('#' + id_dialog + ' #' + id_input).addClass('phep_tinh_input');
                }
            } else {
                $('#' + id_dialog + ' #' + id_parent).removeClass('ptru')
                $('#' + id_dialog + ' #' + id_parent + ' .phep_tinh').remove();
                $('#' + id_dialog + ' #' + id_input).removeClass('phep_tinh_input');
            }
            break;
        case "x2":
            $('#' + id_dialog + ' #' + id_input).toggleClass('x2');
            break;
        case "note":
            $('#' + id_dialog + ' #' + id_input).toggleClass('mt_note');
            break;
        case "text":
            $('#' + id_dialog + ' #' + id_input).toggleClass('mt_text');
            break;
        case "long_text":
            $('#' + id_dialog + ' #' + id_input).toggleClass('mt_long_text');
            break;
        case "1so":
            $('#' + id_dialog + ' .lt123_math').attr('class', 'lt123_math');
            $('#' + id_dialog + ' .wrapper_matrix').attr('class', 'wrapper_matrix');
            $('#' + id_dialog + ' .lt123_math').addClass('mot_so');
            $('#' + id_dialog + ' .wrapper_matrix').addClass('mot_so');
            break;
        case "nso":
            $('#' + id_dialog + ' .lt123_math').attr('class', 'lt123_math');
            $('#' + id_dialog + ' .wrapper_matrix').attr('class', 'wrapper_matrix');
            $('#' + id_dialog + ' .lt123_math').addClass('nhieu_so');
            $('#' + id_dialog + ' .wrapper_matrix').addClass('nhieu_so');
            break;
        default:
    }
    $('#' + id_dialog + ' .item_col.selected').removeClass('selected');
}

function g123_smart_render(tem_game_smart, div_append) {
    var url_tem = "https://" + window.location.host + "/libraries/editor/hack/";
    g123_getTemp(tem_game_smart, div_append);
}

function g123_getTemp(tem_game_smart, div_append) {
    var url_app = "https://" + window.location.host + "/libraries/editor/hack/templates/";
    $.ajax({
        url: url_app + tem_game_smart,
        async: false,
        type: "GET",
        success: function (tpl) {
            g123_getTPL(tpl, div_append);
        }
    });
}

function g123_getTPL(tpl, div_append) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    var test = new jSmart(tpl);
    var res = test.fetch();
    $('#' + id_dialog + ' #' + div_append).html(res);
}

function xem_truoc(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    $('#' + id_dialog + ' .hienthi').html("");
    var moc = $('#' + id_dialog + ' .moc').val();
    var html = "";
    if (!$('#' + id_dialog + ' .phanso').is(":checked")) {
        for (var i = 0; i < parseInt(moc); i++) {
            html += '<span class="so"><input type="text" onclick="detech_input(this)" class="input_so" value="" placeholder="?"></span>';
        }
    } else {
        for (var i = 0; i < parseInt(moc); i++) {
            html += '<span class="so"><input type="text" onclick="detech_input(this)" class="input_so" value="" placeholder="?"><span class="separate"></span><input  onclick="detech_input(this)" type="text" class="input_so" value="" placeholder="?"></span>';
        }
    }
    html += '<span class="topn">t</span>';
    $('#' + id_dialog + ' .render .bt_tiaso').html(html);
    if (!$('#' + id_dialog + ' .vetia').is(":checked")) {
        $('#' + id_dialog + ' .bt_tiaso').addClass('no_tia');
    } else {
        $('#' + id_dialog + ' .bt_tiaso').removeClass('no_tia');
    }
    $('#' + id_dialog + ' .input_so').each(function (i) {
        $(this).attr('id', 'input_so_' + i);
    });
    var arr_pos = new Array();
    if ($('#' + id_dialog + ' .otrong_tia').is(":checked")) {
        $('#' + id_dialog + ' .input_so').each(function (i) {
            arr_pos[i] = parseInt($(this).position().left) + parseInt($(this).outerWidth());
        });
        if ($('#' + id_dialog + ' .ottia').length == 0) {
            for (var j = 0; j < arr_pos.length - 1; j++) {
                $('#' + id_dialog + ' .bt_tiaso').append('<span class="ottia" style="left: ' + arr_pos[j] + 'px"><input id="ottia_input_' + j + '" onclick="detech_input(this)" class="ottia_input"></span>');
            }
        }
    } else {
        $('#' + id_dialog + ' .ottia').remove();
    }
}

function hien_thi(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    var dang = $('#' + id_dialog + ' .chon_dang').val();
    if (dang == 'tiaso') {
        $('#' + id_dialog + ' .hienthi').html('<div class="bt_tiaso">' + $('#' + id_dialog + ' .render .bt_tiaso').html() + "</div>");
        $('#' + id_dialog + ' .hienthi .bt_tiaso .input_so').each(function (i) {
            $(this).replaceWith('<span class="input_so"></span>');
        });
        var arr_tem = new Array();
        var arr_otrong = new Array();
        $('#' + id_dialog + ' .render .input_so').each(function (i) {
            arr_tem[i] = $(this).val();
            arr_otrong[i] = 0;
            if ($(this).hasClass('otrong')) {
                arr_otrong[i] = 1;
            }
        });
        $('#' + id_dialog + ' .hienthi .input_so').each(function (i) {
            $(this).html(arr_tem[i]);
            if (arr_otrong[i] == 1) {
                $(this).addClass('otrong');
            }
        });
        var arr_tem_1 = new Array();
        var arr_otrong_1 = new Array();
        $('#' + id_dialog + ' .render .ottia_input').each(function (k) {
            arr_tem_1[k] = $(this).val();
            arr_otrong_1[k] = 0;
            if ($(this).hasClass('otrong')) {
                arr_otrong_1[k] = 1;
            }
        });
        $('#' + id_dialog + ' .hienthi .ottia').each(function (i) {
            $(this).html(arr_tem_1[i]);
            if (arr_otrong_1[i] == 1) {
                $(this).addClass('otrong');
            }
        });
        $('#' + id_dialog + ' .hienthi .otrong').each(function () {
            $(this).html("<input type='text' class='tim_x' size='3'>");
        });
    }
    if (dang == 'capso') {
        $('#' + id_dialog + ' .hienthi').html('<div class="bt_noiso">' + $('#' + id_dialog + ' .render .bt_noiso').html() + '</div>');
        var arr_tem = new Array();
        var arr_otrong = new Array();
        $('#' + id_dialog + ' .render .tim_x').each(function (i) {
            arr_tem[i] = $(this).val();
            arr_otrong[i] = 0;
            if ($(this).hasClass('otrong')) {
                arr_otrong[i] = 1;
            }
        });
        $('#' + id_dialog + ' .hienthi .tim_x').each(function (i) {
            if (arr_otrong[i] == 1) {
                $(this).parent().addClass('otrong');
            }
            $(this).parent().html(arr_tem[i]);
        });
        $('#' + id_dialog + ' .hienthi .otrong').each(function (i) {
            $(this).html("<input type='text' class='tim_x' size='3' >");
        });
    }

    if (dang == 'bangso') {
        $('#' + id_dialog + ' .hienthi').html('<div class="bt_bangso">' + $('#' + id_dialog + ' .render .bt_bangso').html() + '</div>');
        $('#' + id_dialog + ' .render .input_text').each(function (i) {
            if (i == 0) {
                var id_tem = $(this).parent().attr('id');
                var val_0 = $(this).val();
                var _nbs = val_0.search("//");
                if (_nbs > 0) {
                    var arr_val_0 = val_0.split('//');
                    var val_0_htm = '<div id="_diagonal_0"><span id="_diagonal_1">' + arr_val_0[0] + '</span><span id="_diagonal_2">' + arr_val_0[1] + '</span></div> <div id="_diagonal_line">`</div>';
                    $('#' + id_dialog + ' .hienthi #' + id_tem).html(val_0_htm).addClass('_diagonal');
                } else {
                    $('#' + id_dialog + ' .hienthi #' + id_tem).html(val_0.replace(/123o/g, "<input type='text' class='tim_x' size='3' >"));
                }
            } else {
                var id_tem = $(this).parent().attr('id');
                var text_tem = $(this).val();
                $('#' + id_dialog + ' .hienthi #' + id_tem).html(text_tem.replace(/123o/g, "<input type='text' class='tim_x' size='3' >"));
            }
        });
    }

    if (dang == 'lichthang') {
        $('#' + id_dialog + ' .hienthi').html('');
        $('#' + id_dialog + ' .bt_lichthang').clone().appendTo('#' + id_dialog + ' .hienthi');
        $('#' + id_dialog + ' .hienthi .inp_calendar').each(function (i) {
            var text_tem = $(this).val();
            if (text_tem == '?') {
                $(this).replaceWith('<span class="_h">?</span>');
            } else {
                $(this).replaceWith(text_tem.replace(/123o/g, "<input type='text' class='tim_x' size='3' >"));
            }
        });
        var _month = $('#' + id_dialog + ' .hienthi .inp_month').val();
        $('#' + id_dialog + ' .hienthi .inp_month').replaceWith(_month);
    }

    if (dang == 'sododoan') {
        var _rt = prompt("Nhập nội dung bên phải ( ? cm)", "? cm");
        //if(_rt !='' && _rt != undefined){
        $('#' + id_dialog + ' .hienthi').html('');
        var _valsdd = $('#' + id_dialog + ' #_sddrend').val();
        _valsdd = _valsdd.slice(0, _valsdd.length - 2);
        var _htmsdd = '<div class="_rbieudo2">' + _rt + '__' + _valsdd + '</div>';
        $('#' + id_dialog + ' .hienthi').html(_htmsdd);
        //}else
    }

    if (dang == 'hinhchu') {
        //_parse_itxt();
        // === parse ===
        var _its = $('#' + id_dialog + ' .hienthi').text();
        if (_its != '') {
            var arr_its = _its.split('_');
            var ts_le = arr_its.length;
            var c_box = ts_le == 2 ? 'onlyOne' : '';

            var htm = '<div class="_boximg' + arr_its[0] + ' ' + c_box + '"><img src="/data/library/anhtext/' + arr_its[0] + '.png"/>';

            if (ts_le == 2) {
                htm += '<p class="_' + (ts_le - 1) + '0">' + arr_its[1] + '</p>';
            } else {
                for (var i = 1; i < ts_le; i++) {
                    htm += '<span class="_' + (ts_le - 1) + i+'">' + arr_its[i] + '</span>';
                }
            }

            htm += '</div>';
            $('.view_hinhchu').html(htm);
        }
        
    }
}

function them_bot(op) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    var col = parseInt($('#' + id_dialog + ' #new_row').attr('col'));
    var row = parseInt($('#' + id_dialog + ' #new_row').attr('row'));

    switch (op) {
        case 'th':
            var html = "";
            for (var i = 0; i < parseInt(col + 1); i++) {
                html += '<span class="mth_td item_col" id="mth_td_' + (row + 1) + '_' + i + '" col="' + i + '" row="' + (row + 1) + '"><input onclick="detech_input(this)" type="text" id="mth_input_' + (row + 1) + '_' + i + '" class="in_put mth_input"></span>';
            }
            html += '<span class="clear_both" row="' + (row + 1) + '"></span>';
            $('#' + id_dialog + ' #new_row').before(html);
            $('#' + id_dialog + ' #new_row').attr('row', parseInt(row) + 1);
            break;
        case "bh":
            $('#' + id_dialog + ' span[row=' + row + ']').remove();
            $('#' + id_dialog + ' #new_row').attr('row', parseInt(row) - 1);
            break;
        case "tc":
            for (var i = 0; i < row + 1; i++) {
                $('#' + id_dialog + ' #mth_td_' + i + '_' + col).after('<span class="mth_td item_col" id="mth_td_' + i + '_' + (col + 1) + '" col="' + (col + 1) + '" row="' + i + '"><input onclick="detech_input(this)" type="text" id="mth_input_' + i + '_' + (col + 1) + '" class="in_put mth_input"></span>');
            }
            $('#' + id_dialog + ' #new_row').attr('col', parseInt(col) + 1);
            break;
        case "bc":
            $('#' + id_dialog + ' span[col=' + col + ']').remove();
            $('#' + id_dialog + ' #new_row').attr('col', parseInt(col) - 1);
            break;
        default:
    }
}

function clearclass_math(e) {
    $('input').val("");
    $('.lt123_math').html("");
    $('.item_col').removeClass("lf");
    $('.item_col').removeClass("rt");
    $('.item_col').removeClass("bm");
    $('.item_col').removeClass("tp");
    $('.item_col').removeClass("otrong");
    $('.item_col').removeClass("pcong");
    $('.item_col').removeClass("pnhan");
    $('.item_col').removeClass("ptru");
    $('.phep_tinh').remove("");
}

function viewclass_math(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    $('#' + id_dialog + ' .lt123_math').html($('#' + id_dialog + ' .wrapper_matrix').html());
    $('#' + id_dialog + ' .lt123_math .in_put').remove();
    $('#' + id_dialog + ' .wrapper_matrix .in_put').each(function () {
        var value_tem = $(this).val();
        if(value_tem.indexOf('/') > -1){
            value_tem = '<span class="math-gach-cheo">/</span><span>'+value_tem.replace('/','')+'</span>';
        }
        
        if(value_tem.indexOf('\\') > -1){
            value_tem = '<span class="math-gach-cheo-trai">\\</span><span>'+value_tem.replace('\\','')+'</span>';
        }
        
        var id_tem = $(this).parent().attr('id');
        $('#' + id_dialog + ' .lt123_math #' + id_tem).html(value_tem);
    });
    $('#' + id_dialog + ' .lt123_math .otrong').html('<input type="text" class="tim_x" size="1" >');
    var html_tem = "";
    if ($.trim($('#' + id_dialog + ' #textnote').val()).length != 0) {
        var arr_tem = $('#' + id_dialog + ' #textnote').val().split('\n');
        html_tem = "<ul class='view_note'>"
        for (var i = 0; i < arr_tem.length; i++) {
            html_tem += "<li>" + arr_tem[i] + "</li>";
        }
        html_tem += "</ul>";
    }
    $('#' + id_dialog + ' .pcong').each(function () {
        $(this).append("<span class='phep_tinh phep_cong'>+</span>");
    });
    $('#' + id_dialog + ' .pnhan').each(function () {
        $(this).append("<span class='phep_tinh phep_nhan'>x</span>");
    });
    $('#' + id_dialog + ' .ptru').each(function () {
        $(this).append("<span class='phep_tinh phep_tru'>-</span>");
    });
    $('#' + id_dialog + ' .otrong.pcong').each(function () {
        $('.phep_tinh', this).remove();
        $('.tim_x', this).addClass('phep_tinh_input');
    });
    $('#' + id_dialog + ' .otrong.pnhan').each(function () {
        $('.phep_tinh', this).remove();
        $('.tim_x', this).addClass('phep_tinh_input');
    });
    $('#' + id_dialog + ' .otrong.ptru').each(function () {
        $('.phep_tinh', this).remove();
        $('.tim_x', this).addClass('phep_tinh_input');
    });
    $('#' + id_dialog + ' .lt123_math').after(html_tem);
    $('#' + id_dialog + ' .wrapper_matrix .mth_input.x2').each(function (i) {
        var id_span = $(this).parent().attr('id');
        $('#' + id_dialog + ' .ltcopy #' + id_span + ' .tim_x').addClass('x2');
    });

    $('#' + id_dialog + ' .wrapper_matrix .mth_input.mt_note').each(function (i) {
        var id_span = $(this).parent().attr('id');
        $('#' + id_dialog + ' .ltcopy #' + id_span ).addClass('mt_note');
    });
    
    $('#' + id_dialog + ' .wrapper_matrix .mth_input.mt_text').each(function (i) {
        var id_span = $(this).parent().attr('id');
        $('#' + id_dialog + ' .ltcopy #' + id_span ).addClass('mt_text');
    });
    
    $('#' + id_dialog + ' .wrapper_matrix .mth_input.mt_long_text').each(function (i) {
        var id_span = $(this).parent().attr('id');
        $('#' + id_dialog + ' .ltcopy #' + id_span ).addClass('mt_long_text');
    });

    $('#' + id_dialog + ' .item_col.selected').removeClass('selected');
}

function click_otrong(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    $('#' + id_dialog + ' #' + id_input).toggleClass('otrong');
}


function chon_dang(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    $('#' + id_dialog + ' .hienthi').html("");
    $('#' + id_dialog + ' .view_hinhchu').html("");
    
    if ($(e).val() == 'tiaso') {
        $('#' + id_dialog + ' .dang_tiaso').show();
        $('#' + id_dialog + ' .dang_capso').hide();
        $('#' + id_dialog + ' .dang_bangso').hide();
        $('#' + id_dialog + ' .bt_noiso').hide();
        $('#' + id_dialog + ' .bt_tiaso').show();
        $('#' + id_dialog + ' .bt_bangso').hide();

        $('#' + id_dialog + ' .bt_bieudo').hide();
        $('#' + id_dialog + ' .dang_bieudo').hide();
        $('#' + id_dialog + ' .bt_banghinh').hide();
        $('#' + id_dialog + ' .dang_banghinh').hide();
        $('#' + id_dialog + ' .dang_lichthang').hide();
        $('#' + id_dialog + ' .bt_lichthang').hide();
        $('#' + id_dialog + ' ._set_calendar').hide();

        $('#' + id_dialog + ' .dang_hinhchu').hide();
        $('#' + id_dialog + ' .bt_sododoan').hide();
        $('#' + id_dialog + ' .dang_sododoan').hide();
    }
    if ($(e).val() == 'capso') {
        $('#' + id_dialog + ' .dang_tiaso').hide();
        $('#' + id_dialog + ' .dang_bangso').hide();
        $('#' + id_dialog + ' .dang_capso').show();
        $('#' + id_dialog + ' .bt_noiso').show();
        $('#' + id_dialog + ' .bt_tiaso').hide();
        $('#' + id_dialog + ' .bt_bangso').hide();

        $('#' + id_dialog + ' .bt_bieudo').hide();
        $('#' + id_dialog + ' .dang_bieudo').hide();
        $('#' + id_dialog + ' .bt_banghinh').hide();
        $('#' + id_dialog + ' .dang_banghinh').hide();
        $('#' + id_dialog + ' .dang_lichthang').hide();
        $('#' + id_dialog + ' .bt_lichthang').hide();
        $('#' + id_dialog + ' ._set_calendar').hide();

        $('#' + id_dialog + ' .dang_hinhchu').hide();
        $('#' + id_dialog + ' .bt_sododoan').hide();
        $('#' + id_dialog + ' .dang_sododoan').hide();
    }
    if ($(e).val() == 'bangso') {
        $('#' + id_dialog + ' .dang_tiaso').hide();
        $('#' + id_dialog + ' .dang_capso').hide();
        $('#' + id_dialog + ' .bt_noiso').hide();
        $('#' + id_dialog + ' .bt_tiaso').hide();

        $('#' + id_dialog + ' .bt_bangso').show();
        $('#' + id_dialog + ' .dang_bangso').show();

        $('#' + id_dialog + ' .bt_bieudo').hide();
        $('#' + id_dialog + ' .dang_bieudo').hide();
        $('#' + id_dialog + ' .bt_banghinh').hide();
        $('#' + id_dialog + ' .dang_banghinh').hide();

        $('#' + id_dialog + ' .dang_lichthang').hide();
        $('#' + id_dialog + ' .bt_lichthang').hide();
        $('#' + id_dialog + ' ._set_calendar').hide();

        $('#' + id_dialog + ' .dang_hinhchu').hide();
        $('#' + id_dialog + ' .bt_sododoan').hide();
        $('#' + id_dialog + ' .dang_sododoan').hide();
    }
    if ($(e).val() == 'lichthang') {
        $('#' + id_dialog + ' .dang_tiaso').hide();
        $('#' + id_dialog + ' .dang_capso').hide();
        $('#' + id_dialog + ' .bt_noiso').hide();
        $('#' + id_dialog + ' .bt_tiaso').hide();
        $('#' + id_dialog + ' .bt_bangso').hide();
        $('#' + id_dialog + ' .dang_bangso').hide();
        $('#' + id_dialog + ' .bt_bieudo').hide();
        $('#' + id_dialog + ' .dang_bieudo').hide();
        $('#' + id_dialog + ' .bt_banghinh').hide();
        $('#' + id_dialog + ' .dang_banghinh').hide();

        $('#' + id_dialog + ' .dang_lichthang').show();
        $('#' + id_dialog + ' .bt_lichthang').show();
        $('#' + id_dialog + ' ._set_calendar').show();

        $('#' + id_dialog + ' .dang_hinhchu').hide();
        $('#' + id_dialog + ' .bt_sododoan').hide();
        $('#' + id_dialog + ' .dang_sododoan').hide();
    }
    if ($(e).val() == 'bieudo') {
        $('#' + id_dialog + ' .dang_tiaso').hide();
        $('#' + id_dialog + ' .dang_capso').hide();
        $('#' + id_dialog + ' .bt_noiso').hide();
        $('#' + id_dialog + ' .bt_tiaso').hide();
        $('#' + id_dialog + ' .bt_bangso').hide();
        $('#' + id_dialog + ' .dang_bangso').hide();
        $('#' + id_dialog + ' .dang_lichthang').hide();
        $('#' + id_dialog + ' .bt_lichthang').hide();
        $('#' + id_dialog + ' ._set_calendar').hide();
        $('#' + id_dialog + ' .bt_banghinh').hide();
        $('#' + id_dialog + ' .dang_banghinh').hide();

        $('#' + id_dialog + ' .bt_bieudo').show();
        $('#' + id_dialog + ' .dang_bieudo').show();

        $('#' + id_dialog + ' .dang_hinhchu').hide();
        $('#' + id_dialog + ' .bt_sododoan').hide();
        $('#' + id_dialog + ' .dang_sododoan').hide();
    }
    if ($(e).val() == 'banghinh') {
        $('#' + id_dialog + ' .dang_tiaso').hide();
        $('#' + id_dialog + ' .dang_capso').hide();
        $('#' + id_dialog + ' .bt_noiso').hide();
        $('#' + id_dialog + ' .bt_tiaso').hide();
        $('#' + id_dialog + ' .bt_bangso').hide();
        $('#' + id_dialog + ' .dang_bangso').hide();
        $('#' + id_dialog + ' .dang_lichthang').hide();
        $('#' + id_dialog + ' .bt_lichthang').hide();
        $('#' + id_dialog + ' ._set_calendar').hide();
        $('#' + id_dialog + ' .bt_bieudo').hide();
        $('#' + id_dialog + ' .dang_bieudo').hide();

        $('#' + id_dialog + ' .bt_banghinh').show();
        $('#' + id_dialog + ' .dang_banghinh').show();

        $('#' + id_dialog + ' .dang_hinhchu').hide();
        $('#' + id_dialog + ' .bt_sododoan').hide();
        $('#' + id_dialog + ' .dang_sododoan').hide();
    }
    if ($(e).val() == 'hinhchu') {
        $('#' + id_dialog + ' .dang_tiaso').hide();
        $('#' + id_dialog + ' .dang_capso').hide();
        $('#' + id_dialog + ' .bt_noiso').hide();
        $('#' + id_dialog + ' .bt_tiaso').hide();
        $('#' + id_dialog + ' .bt_bangso').hide();
        $('#' + id_dialog + ' .dang_bangso').hide();
        $('#' + id_dialog + ' .dang_lichthang').hide();
        $('#' + id_dialog + ' .bt_lichthang').hide();
        $('#' + id_dialog + ' ._set_calendar').hide();
        $('#' + id_dialog + ' .bt_bieudo').hide();
        $('#' + id_dialog + ' .dang_bieudo').hide();
        $('#' + id_dialog + ' .bt_banghinh').hide();
        $('#' + id_dialog + ' .dang_banghinh').hide();

        $('#' + id_dialog + ' .bt_sododoan').hide();
        $('#' + id_dialog + ' .dang_sododoan').hide();

        $('#' + id_dialog + ' .dang_hinhchu').show();
        choose_dir_img_normal("anhtext");
        $('.before_view').html('');
    }
    if ($(e).val() == 'sododoan') {
        $('#' + id_dialog + ' .dang_tiaso').hide();
        $('#' + id_dialog + ' .dang_capso').hide();
        $('#' + id_dialog + ' .bt_noiso').hide();
        $('#' + id_dialog + ' .bt_tiaso').hide();
        $('#' + id_dialog + ' .bt_bangso').hide();
        $('#' + id_dialog + ' .dang_bangso').hide();
        $('#' + id_dialog + ' .dang_lichthang').hide();
        $('#' + id_dialog + ' .bt_lichthang').hide();
        $('#' + id_dialog + ' ._set_calendar').hide();
        $('#' + id_dialog + ' .bt_bieudo').hide();
        $('#' + id_dialog + ' .dang_bieudo').hide();
        $('#' + id_dialog + ' .bt_banghinh').hide();
        $('#' + id_dialog + ' .dang_banghinh').hide();
        $('#' + id_dialog + ' .dang_hinhchu').hide();

        $('#' + id_dialog + ' .bt_sododoan').show();
        $('#' + id_dialog + ' .dang_sododoan').show();
    }
}

function them_capso(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    $('#' + id_dialog + ' .bt_noiso').append('<span class="o_muiten"><span class="o_tren"><input type="text" class="tim_x" size="3"  onclick="detech_input(this)"></span></span><span class="o_so"><input type="text" class="tim_x" size="3"  onclick="detech_input(this)"></span>');
    $('#' + id_dialog + ' .render .tim_x').each(function (i) {
        $(this).attr('id', 'oso_' + i);
    })
}
function cursor_capso(){
    $('.bt_noiso .line_capso').removeClass('line_capso').addClass('o_muiten');
}
function line_capso(){
    $('.bt_noiso .o_muiten').removeClass('o_muiten').addClass('line_capso');
}
// ============================================================ //
// ====================== js bang so ========================== //

function tao_bang(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    var cot = parseInt($('#' + id_dialog + ' .tb_cot').val());
    var hang = parseInt($('#' + id_dialog + ' .tb_hang').val());
    $('#' + id_dialog + ' .hienthi').html("");
    var tb = "<table class='tb_bangso'>";
    for (var i = 0; i < hang; i++) {
        tb += "<tr>";
        for (var j = 0; j < cot; j++) {
            tb += "<td><input class='input_text' type='text'></td>";
        }
        tb += "</tr>";
    }
    tb += "</table>";
    $('#' + id_dialog + ' .render .bt_bangso').html(tb);

    $('#' + id_dialog + ' .tb_bangso td').each(function (i) {
        $(this).attr('id', 'td_' + i);
    });

}

function remove_border(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    if (parseInt($(e).attr('br')) == 0) {
        $('#' + id_dialog + ' .tb_bangso').addClass('noborder');
        $(e).attr('br', 1);
        $(e).text("Thêm Border");
    } else {
        $('#' + id_dialog + ' .tb_bangso').removeClass('noborder');
        $(e).attr('br', 0);
        $(e).text("Bỏ Border");
    }


}

// ============================================================ //
// ===================== js lich thang ======================== //

function set_calendar(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    var id_ = '';
    $('.render .inp_calendar').each(function (i, e) {
        if ($(e).val() == 1) {
            id_ = $(e).attr('id');
        }
    });
    console.log(id_);
    var idx = 1;
    for (var i = (parseInt(id_) + 1); i < (parseInt(id_) + 31); i++) {
        idx = idx + 1;
        $('.render input[id="' + i + '"]').val(idx);
    }
    ;
}

// ============================================================ //
// ====================== js bieu do ========================== //

function create_bieudo(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    var _nbd = $('#' + id_dialog + ' #_bd_num').val();
    var _onedb = $('#' + id_dialog + ' #_bd_oned').val();
    var _twodb = $('#' + id_dialog + ' #_bd_twod').val();
    if (_nbd == '') {
        alert('Chua nhap!');
    } else {

        var _ht = '<div class="_cbieudo">' + _nbd + '_' + _onedb + '_' + _twodb + '</div>';
        $('#' + id_dialog + ' .hienthi').html(_ht);
        //_parse_cbd();
        // === parse ===
        var _cbd = $('._cbieudo').text();
        if (_cbd != '') {
            var arr_cbd = _cbd.split('_');
            var arr_cbd1 = arr_cbd[0].split('-');
            var arr_cbd2 = arr_cbd[1].split('-');
            var arr_cbd3 = arr_cbd[2].split('-');
            var htm = '<div class="_line_bd">';
            for (var i = 0; i < arr_cbd1[0]; i++) {
                if (i === 0 && arr_cbd2[0] >= 1) {
                    htm += '<span class="_p_bd"><span class="_bdone _' + arr_cbd2[0] + '"><span>' + arr_cbd2[1] + '</span></span></span>';
                    //}else if( i == (_onedb1) && _twodb1 >0){
                } else if (i == (arr_cbd1[0] - 1) && arr_cbd3[0] > 0) {
                    htm += '<span class="_p_bd"><span class="_bdtwo _' + arr_cbd3[0] + '"><span>' + arr_cbd3[1] + '</span></span></span>';
                } else
                    htm += '<span class="_p_bd"></span>';
            }
            htm += '<span class="_p_end"></span>';
            if (arr_cbd1[1] != '')
                htm += '<span class="_bdall"><span>' + arr_cbd1[1] + '</span></span>';
            htm += '</div><div class="space20"></div>';
        }
        $('.view_btn').prepend(htm);

    }
}

// ============================================================ //
// ===================== js bang hinh ========================= //

$(document).on("click", "._tabimg span", function () {
    $(this).toggleClass('_c');
});

function create_banghinh(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    var _w = $('#' + id_dialog + ' #_bhinh_w').val();
    var _h = $('#' + id_dialog + ' #_bhinh_h').val();
    var _img = $('._slimg').html();
    if (_w == '' || _h == '' || _img == null) {
        alert('chua nhap');
    } else {
        var htm = '<div class="_tabimg _' + _w + '">';
        for (i = 0; i < (_w * _h); i++) {
            htm += '<span>' + _img + '</span>';
        }
        htm += '</div>';
        $('#' + id_dialog + ' .hienthi').html(htm);
    }
}

function select_banghinh(e) {
    $(e).toggleClass('_slimg');
}

// ============================================================ //
// ======================= js for hinh chu ==================== //

function _create_ipnimg_(e) {
    var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
    $('#' + id_dialog + ' .view_hinhchu').html("");
    var par = $(e).parents('.dang_hinhchu');
    var img_ = $(par).find('._inpimg_list a._ac').length;
    if (img_ == 1) {
        var str_ts = [];
        $(par).find('#_ts').each(function (i, e) {
            if ($(e).val() != '') {
                str_ts.push($(e).val());
            }
        });
        if (str_ts == '') {
            alert('Chưa nhập tham số.');
        } else {
            var strts = str_ts.join("_");
            var _img = $(par).find('._inpimg_list a._ac').attr('title');
            $('#' + id_dialog + ' .hienthi').html('<div class="_itxtparse">' + _img + '_' + strts + '</div>');
            //_parse_itxt();
        }
    } else {
        alert(img_ == 0 ? "Bạn chưa chọn hình để chèn text!" : "Bạn chỉ được chọn tối đa 1 hình để chèn text!")
    }
}
$(document).on("click", "._inpimg_list a", function () {
    $(this).toggleClass('_ac');
});

// =========================================================== //
// =================== JS for do so lieu ===================== //

function run_dosolieu() {
    $('#ruler').draggable({
        containment: "#math_ruler",
        start: function (event, ui) {
        },
        stop: function (event, ui) {
        }
    });
    $('.line_name').resizable({
        resize: function (event, ui) {
            ui.size.height = ui.originalSize.height;
        },
        grid: 50
    });
    $('.line_name').live('click', function () {
        $('.line_name').removeClass('line_name_active');
        $(this).addClass('line_name_active');
    });
    $('#delete_line').on('click', function () {
        if ($('.line_name_active').length > 0) {
            $('.line_name_active').remove();
        }
    });
    $('#add_line').on('click', function () {
        var _html = '<div class="line_name" style="width: 400px;">' +
                '<div class="name"><div class="point_name point_name_left">A</div><div class="point_name point_name_right">B</div></div>' +
                '<div class="line"><div class="point point_left"></div><div class="point point_right"></div></div>' +
                '</div>';
        $(_html).insertBefore($('#ruler_parent')).resizable({
            resize: function (event, ui) {
                ui.size.height = ui.originalSize.height;
            },
            grid: 50
        });
    });

    $('#update').on('click', function () {
        $('#ruler_i').attr({src: $('#url_ruler').val()});
    });

    $('#export').on('click', function () {
        var id_dialog = $('.cke_dialog_contents_body:visible').attr('id');
        var n = 0;
        var str_ = Array();
        $('.line_name').each(function (i, el) {
            n++;
            var _intv = $(el).width() / 50;
            str_.push(_intv);
        });
        var str = str_.join("_");
        console.log(str);
        $('#' + id_dialog + ' .hienthi').html('<div class="_dosolieu">' + str + '</div>');
    });
}

// =========================================================== //
// =========================================================== //


// =========================================================== //
// =================== js for so do doan thang =============== //
$(document).on("click", "#_sd2_cd", function (e) {
    var _f = $('#_leterfirst').val();
    var _d = $('#_valdoan').val();
    var _t = $('#_valtota').val();
    var _h = $('#_valhoi').val();
    // === parse left ===
    $('._leftrs').append('<p>' + _f + '</p>');
    // === parse center ===
    var htm = '<div class="_line_bd">';
    for (i = 0; i < _d; i++) {
        htm += '<span class="_p_bd"></span>';
    }
    htm += '<span class="_p_end"></span>';
    if (_t != undefined && _t != '')
        htm += '<span class="_bdall"><div id="curly-brace" class="top"><div id="left" class="brace"></div><div id="right" class="brace"></div></div><span>' + _t + '</span></span>';
    htm += '</div><br>';
    $('._sddcenters').append(htm);
    var _ipv = $('#_sddrend').val();
    var _renval = _ipv + _f + '--' + _d + '--' + _t;
    if (_h != '' && _h != undefined) {
        _renval += '--' + _h
    }
    $('#_sddrend').val(_renval + '__');
});

function choose_dir_img_normal(e) {
    var parse_ = $('._inpimg_list');
    var dir = e;
    if (dir != '') {
        // ajax get all image in folder:
        $.post('/libraries/editor/plugins/tiaso/load_images.php', {stt: 'img', dir: dir}, function (data) {
            var data = $.parseJSON(data);
            var imgs = "";
            $.each(data, function (i, val) {
                var name_ = val.split('/');
                var name = name_[(name_.length - 1)];
                var alt_ = name.split('.');
                imgs += '<a title="' + alt_[0] + '"><img onclick="choose_image(this)" src="/data/library/' + dir + '/' + name + '"></a>';
            });
            $(parse_).html(imgs);
        });
    }
}

// =========================================================== //
// =========================================================== //