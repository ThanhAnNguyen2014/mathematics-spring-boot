//make svg
function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}
//report error
function form_report_err_new(handler, cmd) {
    if (handler == 'close'){
        $('.render_report_error').html('');
        return false;
    }
    var pre_send = '<div class="lt123_box_gopy">';
    pre_send += '<div class="lt123_gopy_title"></div>';
    pre_send += '<div class="lt123_gopy_noti">';
    pre_send += 'Nếu bạn phát hiện ra lỗi hoặc có góp ý về nội dung - chất lượng của bài học này, xin vui lòng gửi cho BQT. Đóng góp của bạn sẽ giúp Luyện Thi 123 có chất lượng ngày';
    pre_send += ' một tốt hơn.';
    pre_send += 'Chân thành cảm ơn !';
    pre_send += '</div>';
    // pre_send += '<div class="ch_error">';
    // pre_send += '    <input type="radio" name="ch_radio" id="err_nhap_chon" class="ch_radio"/>';
    // pre_send += '    <label for="err_nhap_chon">Con không nhập hoặc chọn được đáp án</label>';
    // pre_send += '</div>';
    // pre_send += '<div class="ch_error">';
    // pre_send += '    <input type="radio" name="ch_radio" id="err_wrong_ans" class="ch_radio"/>';
    // pre_send += '    <label for="err_wrong_ans">Con nghĩ đáp án bị sai rồi</label>';
    // pre_send += '</div>';

    pre_send += '<textarea id="content_report" placeholder="Nếu có lỗi hoặc góp ý khác bạn hãy nhập nội dung ở đây..." class="lt123_gopy_area"></textarea><br/>';
    pre_send += '<a class="lt123_btn_close" href="javascript:;" onclick="form_report_err_new(&#39;close&#39;);">Đóng cửa sổ</a>';
    if (handler == 'bkt') {
        pre_send += '<a class="lt123_btn_sent" href="javascript:;" onclick="send_report_err_new(this,\'bkt\');">Gửi</a>';
    } else {
        pre_send += '<a class="lt123_btn_sent" href="javascript:;" onclick="send_report_err_new(this,\'bt\');">Gửi</a>';
    }

    pre_send += '<div style="clear: both"></div>';
    pre_send += '</div>';

    if (handler == 'bkt') {
        $('.render_report_error').html('');
        var ren_parent_ = $(cmd).parent('.part');
        var render_ = ren_parent_.find('.render_report_error');
        $(render_).html(pre_send);
        //toPos(ren_parent_);
    } else {
        $('.render_report_error').html(pre_send);
        toPos('.basic_segment');
    }
    $('.lt123_box_gopy').draggable({handle: ".lt123_gopy_title"});
}

function send_report_err_new(curr, act) {
    var content_report = $('#content_report').val();
    var location_json = $('#basic_box').attr('file_json');

    //get answer of member
    var flag = true;
    var mem_ans = '';
    // var _ck_ans = '';
    // if ($('.btques_active #dien_so').length > 0) {
    //     $('.btques_active').find('.tim_x').each(function () {
    //         _ck_ans += $(this).val() + ',';
    //     });
    //     mem_ans = 'Nhập: ' + _ck_ans;
    // } else if ($('.btques_active #lua_chon1').length > 0 || $('.btques_active #lua_chon2').length > 0) {
    //     _ck_ans = $('.btques_active').find('.bt_ans_lua_chon.active').attr('value');
    //     mem_ans = 'Chọn đáp án số: ' + (parseInt(_ck_ans) + 1);
    // }

    //get technic error
    var tech_err = '';
    // if ($('#err_nhap_chon').is(":checked")) {
    //     tech_err = 'Con không nhập hoặc chọn được đáp án';
    // }

    // if ($('#err_wrong_ans').is(":checked")) {
    //     tech_err = 'Con nghĩ đáp án bị sai rồi';
    // }

    //neu ko co loi ky thuat thi phai nhap noi dung loi
    if (tech_err == '') {
        if ($.trim(content_report) == 0 || $.trim(content_report).length < 6) {
            alert('Nội dung gửi ít nhất 6 ký tự và tối đa 1.000 ký tự');
            flag = false;
        }
        else if ($.trim(content_report).length > 1000) {
            alert('Nội dung gửi vượt quá 1.000 ký tự');
            flag = false;
        }
    }

    if (flag) {
        $(curr).removeAttr('onclick').text('Đang gửi...');
        var id_q = 0;
        if (act == 'bkt') {
            id_q = parseInt($(curr).parents('.part').attr('index_ques'));
        } else {
            id_q = parseInt($('.basic_segment.active').attr('index_ques'));
        }
        var parrams = {act_nologin: 'report_error', id_q: id_q, cont: content_report,location_json :location_json,
            'cookie': navigator.cookieEnabled,
            'platform': navigator.platform,
            'js_e': navigator.javaEnabled(),
            'brow': get_info_browser(),
            'tech_err': tech_err
        };
        $.post(base_urlroot + 'act/baihoc_report_new', parrams, function (data) {
            if (IsJsonString(data)) {

                data = jQuery.parseJSON(data);
                if (data.stt == 1) {
                    var bef_send = '<div class="lt123_box_gopy">';
                    bef_send += '<div class="box_thank_send">';
                    bef_send += '<div class="thank_txt">';
                    bef_send += 'Cảm ơn bạn. Nội dung góp ý của bạn đã được gửi đến BQT website.<br>';
                    bef_send += '<span>Cửa sổ sẽ tự đóng sau 2 giây</span>';
                    bef_send += '</div>';
                    bef_send += '<div style="clear: both"></div>';
                    bef_send += '</div>';

                    if (act == 'bkt') {
                        id_q = $(curr).parents('.part').find('.render_report_error').html(bef_send);
                    } else {
                        $('.render_report_error').html(bef_send);
                    }
                    var t = setInterval(function () {
                        $('.render_report_error').html('');
                        clearInterval(t);
                    }, 2000);
                } else if (data.stt == 0) {
                    alert(data.msg);
                } else {
                    alert('False');
                }
            }
        });
    }
}
//end report
var list_q_true = [];
var UNF = "undefined";
var arr_hint_temp = {
    'fill_the_blank': 'Câu hỏi này theo dạng điền đáp án đúng, sau khi đọc xong câu hỏi, bạn hãy điền đáp án mà bạn cho là đúng vào ô trống trong câu hỏi',
    'fill_the_blank_math': 'Câu hỏi này theo dạng điền đáp án đúng với cách nhập dạng công thức toán học, sau khi đọc xong câu hỏi, bạn hãy điền đáp án mà bạn cho là đúng vào ô trống trong câu hỏi',
    'fill_the_blank_random': 'Câu hỏi này theo dạng điền đáp án đúng (vị trí các đáp án cho phép đổi chỗ cho nhau), sau khi đọc xong câu hỏi, bạn hãy điền đáp án mà bạn cho là đúng vào ô trống trong câu hỏi',
    'matching': 'Câu hỏi này theo dạng ghép 2 mệnh đề ở 2 cột với nhau để được đáp án đúng',
    'true_false': 'Câu hỏi này theo dạng xác định các mệnh đề đã cho là đúng hay sai',
    'checkboxk': 'Câu hỏi này theo dạng lựa chọn được nhiều đáp án, sau khi đọc câu hỏi, bạn hãy lựa chọn NHIỀU đáp án mà bạn cho là đúng',
    'coordinates': 'Câu hỏi này theo dạng xác định tọa độ, vẽ đường thẳng .... bằng cách click lên tọa độ cho trước',
    'sequence': 'Câu hỏi này theo dạng sắp xếp các câu/mệnh đề theo yêu cầu đề bài',
    'mistake_select': 'Câu hỏi này theo dạng chọn lỗi sai và lựa chọn từ thay thế lại cho đúng',
    'drop_blank': 'Câu hỏi này theo dạng chọn từ thích hợp để thay thế vào ô trống',
    'sentence_reorder': 'Câu hỏi này theo dạng sắp xếp các từ hoặc cụm từ để tạo thành câu hoàn chỉnh',
    'mistake_p': 'Câu hỏi này theo dạng chọn NHIỀU từ trong đoạn văn cho sẵn theo yêu cầu của đề bài',
    'mistake': 'Câu hỏi này theo dạng chọn 1 từ sai',
    'group_word': 'Câu hỏi này theo dạng sắp xếp các từ cho sẵn vào các cột cho phù hợp',
    'mistake_blank': 'Câu hỏi này theo dạng gạch từ sai và viết lại cho đúng'
};

var is_seg_done = -1;
//set time
var count_time = 0,
    tcount = 0;
var timer = {
    minutes: 0,
    seconds: 0,
    elm: null,
    samay: null,
    sep: ':',
    init: function(m, s, elm) {
        if (m < 0 || s < 0 || isNaN(m) || isNaN(s))
            return;
        this.minutes = m;
        this.seconds = s;
        this.elm = document.getElementById(elm);
        timer.start();
    },
    start: function() {
        tcount = 0;
        this.samay = setInterval((this.doCountDown), 1000);
    },
    doCountDown: function() {
        if (timer.minutes == 0 && timer.seconds == 0) {
            clearInterval(timer.samay);
            timerComplete();
            return;
        }

        timer.seconds--;
        count_time++;
        tcount++;

        //set diem theo tung phút
        if(data_lesson.lesson.save == 0){
            hint_ques_time = data_lesson.segment[0].time;
            hint_ques_point = data_lesson.segment[0].part[0].list[0].point;
            var hs_hint = (hint_ques_time + 1)/5;
            var minus = parseInt(tcount / 60, 10);

            if(minus < hs_hint){
                $('.point_ques ._point_plus').text('+'+hint_ques_point);
            }else if(minus >= hs_hint && minus < hs_hint*2){
                $('.point_ques ._point_plus').text('+'+(hint_ques_point*0.8));
            }else if(minus >= hs_hint*2 && minus < hs_hint*3){
                $('.point_ques ._point_plus').text('+'+(hint_ques_point*0.6));
            }else if(minus >= hs_hint*3 && minus < hs_hint*4){
                $('.point_ques ._point_plus').text('+'+(hint_ques_point*0.4));
            }else if(minus >= hs_hint*4 && minus < hs_hint*5){
                $('.point_ques ._point_plus').text('+'+(hint_ques_point*0.2));
            }else{
                $('.point_ques ._point_plus').text('+0');
            }
        }

        
        if (timer.seconds == 0 && timer.minutes != 0) {
            timer.seconds = 60;
            timer.minutes--;
        }

        //if(timer.seconds == 30){
        // if(!$('.bt_tit_true_answer').is(':visible')){
        $('.show_hint').removeClass('hide'); //hien thi goi y
        // }
        //}

        timer.updateTimer(timer.minutes, timer.seconds);

    },
    updateTimer: function(min, secs) {
        min = (min < 10 ? '0' + min : min);
        secs = (secs < 10 ? '0' + secs : secs);
        (this.elm).innerHTML = min + (this.sep) + secs;
    }
}
var alert_time_end = '';

function timerComplete() {
    alert_time_end = 'Đã hết thời gian làm bài!';
    actionYes();
}

function stoptime() {
    clearInterval(timer.samay);
}

function paidmember() {
    if ($('#paid_member').length > 0) {
        return true;
    } else {
        return false;
    }

}

function loadScript_item(link_js, id) {
    var cre = document.createElement('script');
    cre.type = 'text/javascript';
    cre.async = true;
    cre.src = link_js;
    var x = document.getElementById(id);
    x.appendChild(cre);
}

function load_css(link_css) {
    var cre = document.createElement('link');
    cre.type = 'text/css';
    cre.href = link_css;
    cre.rel = 'stylesheet';
    var x = document.getElementsByTagName('head')[0];
    x.appendChild(cre);
}

function replace_pt(str) {
    //str = replace_http(str);
    if (str.indexOf('{loc}') > 0) {
        str = str.replace(/{loc}/g, path_bs);
    }
    return str;
}

function get_point_time_hint(ques_time,ques_point){
    var hs = (ques_time + 1)/5;

    var str='<table><caption><span class="color-success">Trả lời đúng</span> trong khoảng thời gian quy định bạn sẽ được  + <span class="color-danger">số điểm</span> như sau:</caption><tbody>';
          str+= '<tr><td><span class="color-quote">Trong khoảng</span> ' + hs +' phút đầu tiên </td>';
          str+= '<td>+ <span class="color-danger">'+ques_point+' điểm</span></td></tr>';
          str+= '<tr><td><span class="color-quote">Trong khoảng</span> ' + hs +' phút -> '+(hs*2)+' phút</td>';
          str+= '<td>+ <span class="color-danger">'+(ques_point*0.8)+' điểm</span></td></tr>';
          str+= '<tr><td><span class="color-quote">Trong khoảng</span> ' + (hs*2) +' phút -> '+(hs*3)+' phút</td>';
          str+= '<td>+ <span class="color-danger">'+(ques_point*0.6)+' điểm</span></td></tr>';
          str+= '<tr><td><span class="color-quote">Trong khoảng</span> ' + (hs*3) +' phút -> '+(hs*4)+' phút</td>';
          str+= '<td>+ <span class="color-danger">'+(ques_point*0.4)+' điểm</span></td></tr>';
          str+= '<tr><td><span class="color-quote">Trong khoảng</span> ' + (hs*4) +' phút -> '+(hs*5)+' phút</td>';
          str+= '<td>+ <span class="color-danger">'+(ques_point*0.2)+' điểm</span></td></tr>';
          str+= '</tbody></table>';
          str+= '<p class="">Quá '+(ques_time + 1)+' phút: <span class="color-danger">không được cộng điểm</span></p>';
          
          return str;
}
var listExcuteResult = {},
    listExcuteResult_One = {},
    list_show_true = {},
    listExcuteAnswer = {},
    data_post = [];

var executeResultArr = [];
var bs_lisTPL_curr = {};
var bs_lisTPL = {
    layout: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/layout.htm",
    vip: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/vip.htm",
    result: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/result_kt.htm",
    blank_row: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/blank_row.htm?vs=1",
    fill_the_blank: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/fill_the_blank.htm",
    fill_the_blank_math: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/fill_the_blank_math.htm",
    fill_the_blank_random: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/fill_the_blank_random.htm",
    coordinates: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/coordinates.htm",
    multiple_choice: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/multiple_choice.htm",
    matching: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/matching.htm",
    group_word: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/group_word.htm?vs=2",
    group_word_sentence: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/group_word_sentence.htm?vs=2",
    mistake: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mistake.htm",
    mistake_p: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mistake_p.htm?vs=1",
    mistake_blank: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mistake_blank.htm?vs=1",
    mistake_select:base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mistake_select.htm?vs=1",   
    select_box: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/select_box.htm",
    choice_word: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/choice_word.htm",
    choice_word_question: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/choice_word_question.htm",
    drop_blank: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/drop_blank.htm",
    check_box: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/check_box.htm",
    checkbox: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/checkbox.htm",
    fill_letter: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/fill_letter.htm",
    true_false: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/true_false.htm?vs=1",
    sequence: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/sequence.htm",
    table: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/table.htm",
    sentence_reorder: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/sentence_reorder.htm?vs=2"
}
var bs_ctrlTPL = {
    fill_the_blank: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/fill_the_blank.js",
    fill_the_blank_math: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/fill_the_blank_math.js",
    fill_the_blank_random: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/fill_the_blank_random.js?vs=1",
    coordinates: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/coordinates.js",
    blank_row: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/blank_row.js",
    multiple_choice: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/multiple_choice.js",
    true_false: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/true_false.js",
    matching: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/matching.js",
    group_word: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/group_word.js?vs=2",
    group_word_sentence: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/group_word.js",
    mistake: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mistake.js",
    mistake_p: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mistake_p.js",
    mistake_blank: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mistake_blank.js",
    mistake_select: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mistake_select.js?vs=1",
    select_box: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/select_box.js",
    choice_word: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/choice_word.js",
    choice_word_question: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/choice_word_question.js",
    drop_blank: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/drop_blank.js",
    check_box: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/check_box.js",
    checkbox: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/checkbox.js",
    fill_letter: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/fill_letter.js",
    sequence: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/sequence.js?vs=2",
    table: "",
    sentence_reorder: base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/sentence_reorder.js?vs=3"

}
var lib_js = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/library/func_all.js";
var url_set_time = '/ajax/logtime';
var link_css = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/css/style.css?v=2";
var video_w = 640,
    video_h = 360;

var is_pc = 1;
if (typeof is_mobile != UNF || typeof is_tablet != UNF) {
    is_pc = 0;
    lib_js = base_urlroot + "file/luyenthi123/common/lesson/pho_thong/library/m_func_all.js";
    url_set_time = '/ajax/ajax/logtime';
}
if (typeof is_tablet != UNF) {
    link_css = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/css/t_style.css?vs=2";
    bs_lisTPL["layout"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/tablet/layout.htm";
    bs_ctrlTPL["group_word_sentence"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mobile/group_word_sentence.js";
    bs_lisTPL["group_word_sentence"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/tablet/group_word_sentence.htm?vs=1";
}
if (typeof is_mobile != UNF) {
    link_css = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/css/m_style.css?v=4";
    bs_lisTPL["layout"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mobile/layout.htm";
    bs_lisTPL["multiple_choice"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mobile/multiple_choice.htm";
    bs_lisTPL["matching"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mobile/matching.htm";
    bs_lisTPL["table"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mobile/table.htm";
    bs_lisTPL["group_word_sentence"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mobile/group_word_sentence.htm?vs=1";
    bs_lisTPL["group_word"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mobile/group_word.htm";
    bs_ctrlTPL["group_word_sentence"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mobile/group_word_sentence.js";
    bs_ctrlTPL["group_word"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mobile/group_word.js";
    bs_ctrlTPL["matching"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mobile/matching.js";
    bs_ctrlTPL["sequence"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mobile/sequence.js?vs=2";
    bs_ctrlTPL["sentence_reorder"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/js/item/mobile/sentence_reorder.js?vs=2";
    bs_lisTPL["sequence"] = base_urlroot + "/file/luyenthi123/common/lesson/pho_thong/temps/mobile/sequence.htm";

    video_w = 420;
    video_h = 236;
}

function get_data_json(data) {
    var ret_data = data;
    if (!paidmember()) {
        //dang bai kiem tra
        if(ret_data.lesson.save == 1){
           // if(bh_free == 1 && ret_data.lesson.level != 1){
            if(bh_free != 1){
                ret_data.segment[0].part = ret_data.segment[0].part.slice(0, ret_data.segment[0].part.length>10?3:1);
            }
        //dang bai tap thuong
        }else{
            //if(bh_free == 1 && ret_data.lesson.level != 1){
            if(bh_free != 1){
                ret_data.segment = ret_data.segment.slice(0, ret_data.segment.length>10?3:1);
            }
        }
        
        return ret_data;
    } else {
        //dang bai kiem tra
        if(ret_data.lesson.save == 1){
            for (var index=0; index < ret_data.segment[0].part.length;index++) {
                ret_data.segment[0].part[index].index = (index+1);
            }

            //random cau hoi
            if(ret_data.lesson.random == 1){
                ret_data.segment[0].part = ret_data.segment[0].part.sort(function() {
                    return .5 - Math.random();
                });
            }
        //dang bai tap thuong
        }else{
            for (var index=0; index < ret_data.segment.length;index++) {
                ret_data.segment[index].index = (index+1);
            }

            //random cau hoi
            if(ret_data.lesson.random == 1){
                ret_data.segment = ret_data.segment.sort(function() {
                    return .5 - Math.random();
                });
            }
        }
        
        return ret_data;
    }
}

var data_lesson = {},
    bs_jsmart = {};
var lesson = {
    path: '',
    is_again: 0,
    is_submit: 0,
    inx_ques: 0,
    init: function(file_json) {
        lesson.path = file_json.replace('loadJSON.php', '');
        lesson.load_json(file_json);
    },
    load_json: function(file_json) {
        $.ajax({
            url: file_json,
            type: "GET",
            success: function(obj) {
                data_lesson = get_data_json(obj);
                lesson.get_temp_curr('layout');
            },
            complete: function(jqXHR, textStatus) {
                if (textStatus != 'success') {
                    lesson.load_json(file_json);
                }
            }
        });
    },
    get_temp_curr: function(tpl) {
        $.ajax({
            url: bs_lisTPL[tpl],
            type: "GET",
            dataType: "html",
            success: function(data) {
                bs_jsmart[tpl] = new jSmart(data);
                lesson.load_html();
            },
            complete: function(jqXHR, textStatus) {
                if (textStatus != 'success') {
                    lesson.get_temp_curr(tpl);
                }
            }
        });
    },
    load_html: function() {
        var tpl = '',
            str_main = '';

        if (typeof data_lesson.lesson != UNF) {
            if (typeof data_lesson.lesson.content != UNF && data_lesson.lesson.content != '') {
                data_lesson.lesson.content = replace_pt(data_lesson.lesson.content);
            }
        } else {
            data_lesson.lesson = {};
        }

        if (typeof data_lesson.save != UNF) {
            data_lesson.lesson.save = data_lesson.save;
        }
        if (typeof data_lesson.segment != UNF && data_lesson.segment.length > 1) {
            var option = $('.basic_segment').length;
            // var option=data_lesson.segment.length;
            data_lesson.lesson.option = option;
        }

        str_main = bs_jsmart['layout'].fetch(data_lesson.lesson);
        //str_main = replace_http(str_main);

        $('#basic_box').html(str_main);

        if (typeof data_lesson.segment != "undefined") {
            lesson.get_cont_segment(0);
        } else {
            start_lesson();
        }
    },
    get_cont_segment: function(i) {
        if (i < data_lesson.segment.length) {
            str_main = lesson.return_part_htm(data_lesson.segment[i].title, data_lesson.segment[i].title_trans, data_lesson.segment[i].content, data_lesson.segment[i].video, data_lesson.segment[i].audio, i);
            str_main = replace_pt(str_main);
            if (i == 0) {
                $('#basic_main').html('');
                timer.init(data_lesson.segment[i].time, 59, 'container');
            }

            if(typeof data_lesson.segment[i].index !=UNF){
                $('#basic_main').append('<div class="basic_segment" id="basic_segment_' + i + '" stt="' + i + '" index_ques="'+data_lesson.segment[i].index+'"></div>');
            }else{
                $('#basic_main').append('<div class="basic_segment" id="basic_segment_' + i + '" stt="' + i + '"></div>');
            }
            
            $('#basic_segment_' + i).html(str_main);

            if (typeof data_lesson.segment[i].part != "undefined") {
                lesson.get_part(i, 0);
            } else {
                i = i + 1;
                lesson.get_cont_segment(i);
            }
        } else {
            start_lesson();
            //var str_main_time = '<div class="__baitap_star _1ss"><a>Bài tập</a></div><div class="bg_btclass_right"><div class="number_ques">Câu hỏi số<span>1/'+data_lesson.segment.length+'</span></div><div class="timer_ques time_remain">Bạn còn <span id="container">00:00</span></div><div class="point_ques"><span class="_top">Điểm: </span><span class="t_scr">0</span><div class="total_point">trên tổng số<span>100</span></div></div>';
            // $('.number_ques span').html("1/"+data_lesson.segment.length);
            $('.number_ques span').html("1/" + $('.basic_segment').length);
            $('#basic_main').append(str_main_time);
        }
    },
    get_part: function(i, j) {
        if (j < data_lesson.segment[i].part.length) {
             if(typeof data_lesson.segment[i].part[j].index !=UNF){
                $('#basic_segment_' + i).append('<div class="part" inx="part_' + j + '" stt="' + j + '" tpl="' + data_lesson.segment[i].part[j].temp + '" index_ques="'+data_lesson.segment[i].part[j].index+'"></div>');
             }else{
                $('#basic_segment_' + i).append('<div class="part" inx="part_' + j + '" stt="' + j + '" tpl="' + data_lesson.segment[i].part[j].temp + '"></div>');
             }
            
            str_main = lesson.return_part_htm(data_lesson.segment[i].part[j].title, data_lesson.segment[i].part[j].title_trans, data_lesson.segment[i].part[j].content, data_lesson.segment[i].part[j].video, data_lesson.segment[i].part[j].audio, i + '_' + j);
            str_main = replace_pt(str_main);

            $('#basic_segment_' + i).children('.part:last').html(str_main);
            if (typeof data_lesson.segment[i].part[j].temp != "undefined") {
                lesson.is_submit = 1;
                tpl = data_lesson.segment[i].part[j].temp;
                if (typeof bs_lisTPL_curr[tpl] == UNF) {
                    bs_lisTPL_curr[tpl] = bs_lisTPL[tpl];

                    $.ajax({
                        url: bs_lisTPL[tpl],
                        type: "GET",
                        dataType: "html",
                        success: function(data) {
                            bs_jsmart[tpl] = new jSmart(data);
                            lesson.get_data_part(tpl, i, j);
                        }
                    });
                } else {
                    lesson.get_data_part(tpl, i, j);
                }
            } else {
                j = j + 1;
                lesson.get_part(i, j);
            }
        } else {
            str_main = '';
            if (typeof data_lesson.segment[i].tapescript != UNF) {
                str_main = '<div class="space20"></div><div class="basic_explain">' + data_lesson.segment[i].tapescript + '</div>';
            }
            str_main = replace_pt(str_main);
            // if (data_lesson.save == 3 && lesson.is_submit == 1) {
            //     str_main += '<div class="basic_box_control"><div class="basic_alert_note">Sau khi hoàn thiện bài làm hãy bấm vào "<strong>Submit</strong>" bên dưới</div><div class="box_bt_ctrl"><button type="button" class="basic_bt_ctrl basic_bt_sb" onclick="testAction(this)">Submit</button></div></div>';
            // }
            //str_main = replace_http(str_main);
            if (str_main.indexOf('{loc}') > 0) {
                str_main = str_main.replace(/{loc}/g, path_bs);
            }

            $('#basic_segment_' + i).append(str_main);
            i = i + 1;
            lesson.get_cont_segment(i);
        }
    },
    get_data_part: function(tpl, i, j) {
        data_lesson.segment[i].part[j].path = path_bs;
        lesson.inx_ques++;
        data_lesson.segment[i].part[j].inx = lesson.inx_ques;
        str_main = bs_jsmart[tpl].fetch(data_lesson.segment[i].part[j]);
        str_main = replace_pt(str_main);

         if(data_lesson.lesson.save == 1 && paidmember()){
                str_main +='<a title="Góp ý báo lỗi!" class="_bkt_report" onclick="form_report_err_new('+"'bkt'"+',this);">báo lỗi</a>'
                str_main +='<div class="render_report_error"></div>';
            }
            
        
        $('#basic_segment_' + i).children('.part:last').append(str_main);
        if (j < data_lesson.segment[i].part.length) {
            j = j + 1;
            lesson.get_part(i, j);
        }
    },
    return_part_htm: function(title, title_trans, content, video, audio, i) {
        var str_htm = '';
        if (typeof title != "undefined" && title != '') {
            str_htm += '<div class="title">' + title;
            if (typeof title_trans != "undefined" && title_trans != '') {
                str_htm += '<div class="title_trans">(' + title_trans + ')</div>';
            }
            str_htm += '</div>';
        }
        if (typeof content != "undefined" && content != '') {
            str_htm += '<div class="content">' + content + '</div>';
        }
        if (typeof audio != "undefined" && audio != '') {
            str_htm += '<div class="space10"></div><div class="jquery_jplayer_long cp-jplayer" media-url="' + path_bs + audio + '"></div>';
        }

        return str_htm;
    }
}

function start_lesson() {
    $('.basic_explain').html('');

    if ($('.ex_matching').length > 1) {
        $('.ex_matching:gt(0)').remove();
    }
    if ($('.ex_drop_blank').length > 1) {
        $('.ex_drop_blank:gt(0)').remove();
    }

    if(data_lesson.lesson.save == 0){
        var msg_non_vip_sb = '<div id="basic_segment_'+(data_lesson.segment.length)+'" class="basic_segment" stt="'+(data_lesson.segment.length)+'"><div class="qz_pop_layout">Bạn phải là <a title="Quyền lợi của thành viên VIP" href="/dang-ky-mua-the.html" target="_blank">thành viên VIP</a> mới được làm tiếp bài này !<br><br>' +
        '<center><img src="/file/luyenthi123/common/baitap/image/q_img01.jpg"><br></center>' +
        '<a class="qz_ahref" title="Quyền lợi của thành viên VIP" href="/dang-ky-mua-the.html" target="_blank">Đăng ký thành viên VIP</a><br></div></div>';

        if (data_lesson.segment.length <= 3) {
            $('#basic_main').append(msg_non_vip_sb);
        }
    }else{
        var msg_non_vip_sb = '<div class="qz_pop_layout">Bạn phải là <a title="Quyền lợi của thành viên VIP" href="/dang-ky-mua-the.html" target="_blank">thành viên VIP</a> mới được làm tiếp bài này !<br><br><center><img src="/file/luyenthi123/common/baitap/image/q_img01.jpg"><br></center><a class="qz_ahref" title="Quyền lợi của thành viên VIP" href="/dang-ky-mua-the.html" target="_blank">Đăng ký thành viên VIP</a><br></div>';

        if (data_lesson.segment[0].part.length <= 3) {
            $('#basic_segment_0').append(msg_non_vip_sb);
            $('.basic_guibai').addClass('hide');
        }
    }

    //hint template
    $('._hint_text_lambai').text(arr_hint_temp[data_lesson.segment[0].part[0].temp]);

    //set diem cong
    $('._point_plus').text("+"+data_lesson.segment[0].part[0].list[0].point);

    if(!paidmember()){
        $('.bg_btclass_report').hide();
    }

    if ($.isEmptyObject(bs_lisTPL_curr) == false) {
        for (var x in bs_lisTPL_curr) {
            loadScript_item(bs_ctrlTPL[x], 'load_file_js');
        }
    }

    if ($('.basic_w90').length > 0) {
        $('.basic_w90').after('<div class="space5"></div>');
    }
    if ($('.basic_question.basic_col2').length > 0) {
        $('.basic_question.basic_col2:odd').after('<div class="space5"></div>');
    }
    if ($('.basic_w80').length > 0) {
        $('.basic_w80').after('<div class="space5"></div>');
    }

    $.getScript(lib_js, function() {
        if ($('.uba_audioButton').length > 0) {
            getAudioShort();
        }
        if ($('.jquery_jplayer_long').length > 0) {
            getAudioLong();
        }

        $('.loading_lesson').remove();
        if (data_lesson.save == 3 && lesson.is_again == 1) {
            $('.basic_box_control').parent().addClass('active');
        } else {
             console.log('start');
            $('.basic_segment:eq(0)').addClass('active');
        }

        if (typeof data_lesson.lesson.time != UNF && data_lesson.lesson.time > 0) {
            stoptime();
            timer.init(data_lesson.lesson.time, 60, 'container');
        }

        if (typeof data_lesson.segment[0].time != UNF && data_lesson.segment[0].time > 0) {
            stoptime();
            timer.init(data_lesson.segment[0].time, 60, 'container');
            var str_hint = get_point_time_hint(data_lesson.segment[0].time,data_lesson.segment[0].part[0].list[0].point);
            $('#pc-t2-table-score').html(str_hint);
            $('#pc-t2-table-score-hint').html(str_hint);
            $('.color-default').text(data_lesson.segment[0].part[0].list[0].point+" điểm");
        }
    });

    if (data_lesson.segment.length > 1) {
        $('.basic_index').addClass('hide');
        $('.basic_point').addClass('hide');
    }else{
        if(data_lesson.lesson.save == 1 && bh_free == 0){
            if(!paidmember()){
                stoptime();
                $('.bg_btclass_right').addClass('hide');
            }
        }
    }

    var url_action = base_urlroot + '/file/luyenthi123/common/lesson/pho_thong/js/action_kt.js?vs=1';
    loadScript_item(url_action, 'load_file_js');

    var url_mathjax = base_urlroot + '/libraries/MathJax/MathJax.js?config=TeX-AMS_HTML-full';
    loadScript_item(url_mathjax, 'load_file_js');

    //------ instance audio dung-sai ------
    $.fn.jpiah({
        sr: base_urlroot + 'data/audio/ch_correct',
        id: 'ch_correct'
    });
    $.fn.jpiah({
        sr: base_urlroot + 'data/audio/ch_incorrect',
        id: 'ch_incorrect'
    });
    //------ instance audio end ------
    $.fn.jpiah({
        sr: base_urlroot + 'data/audio/finish_point_high',
        id: 'finish_point_high'
    });
    $.fn.jpiah({
        sr: base_urlroot + 'data/audio/finish_point_low',
        id: 'finish_point_low'
    });

}

function loadHtml() {
    var file_json = $("#basic_box").attr("file_json");  
    lesson.init(file_json);
    load_css(link_css);

    $('.show_hint').removeClass('hide'); //hien thi goi y
}