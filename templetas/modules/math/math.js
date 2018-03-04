function onDailyLimited()
{
	$("#count_prc").parent().addClass("alert-error");
	$("#std_btn").html('<p  style="font-size: 18px; line-height: 30px;">Báº¡n Ä‘Ă£ lĂ m háº¿t sá»‘ cĂ¢u há»i miá»…n phĂ­ trong hĂ´m nay, vui lĂ²ng quay láº¡i thá»±c hĂ nh vĂ o ngĂ y mai hoáº·c nĂ¢ng cáº¥p lĂªn tĂ i khoáº£n VIP cá»§a Online Math Ä‘á»ƒ tiáº¿p tá»¥c thá»±c hĂ nh <a class="btn btn-danger" href="/?l=payment.buy">Mua tĂ i khoáº£n VIP</a></p>');
}
	
function olm_set_item(key, val)
{
	localStorage.setItem(key,val);
}

function olm_get_item(key, def)
{
	var t = localStorage.getItem(key);
	return (t) ?  t : def;
}

function olm_clear_data(id_user)
{
	var counting = parseInt( olm_get_item("stack.counting_" + id_user, 0) ); counting = counting  ? counting : 0;
	for(var i = 0; i< counting; i++)
    {		
		localStorage.removeItem("practice_data_" + id_user + "_" + i);
	}
	olm_set_item("stack.counting_" + id_user, 0 );
}

function olm_check_for_request(id_user, limit)
{
	var counting = parseInt( olm_get_item("stack.counting_" + id_user, 0) ); counting = counting ? counting : 0;
	if(!limit && limit != 0){ limit = 3; }
	if(counting > limit)
    {
		var obj = {};
		obj.count = counting;
		for (var i = 0; i <  counting; i++)
        {
			obj["data_" + i] = localStorage.getItem("practice_data_" + id_user + "_" + i);	
		}
		olm_clear_data(id_user);
		$.ajax( "?g=math.save_x",
        {
            type:'POST', data: obj,
            success: function(s)
            {
                if(s != "OK")
                {
    				if(!CFrame) return;
    				if(s == "LOGOUT_BY_OUTHER_USER")
                    {
                        s= "Báº¡n Ä‘Ă£ bá»‹ Ä‘Äƒng xuáº¥t khá»i Online Math. TĂ i khoáº£n cá»§a báº¡n Ä‘Ă£ Ä‘Æ°á»£c mĂ¡y tĂ­nh khĂ¡c sá»­ dá»¥ng Ä‘á»ƒ Ä‘Äƒng nháº­p. OnlineMath khĂ´ng cho phĂ©p má»™t tĂ i khoáº£n sá»­ dá»¥ng <b>cĂ¹ng má»™t lĂºc trĂªn 2 mĂ¡y tĂ­nh</b>."; 
    					CF.data.isG =true; CF.data.isVip = false; 
    					$("#vipstyle").remove();
    					setTimeout(function(){
    						location.reload();
    					}, 15000);
    				}
    				if(s== "DAILY_PRACTICE_LIMITED"){
    					s = "Má»™t tĂ i khoáº£n hoáº·c má»™t mĂ¡y tĂ­nh chá»‰ Ä‘Æ°á»£c thá»±c hĂ nh má»™t sá»‘ lÆ°á»£ng giá»›i háº¡n cĂ¡c cĂ¢u há»i má»—i ngĂ y. Báº¡n cáº§n nĂ¢ng cáº¥p lĂªn tĂ i khoáº£n VIP (giĂ¡ chá»‰ tá»« 30.000 Ä‘/ 1 thĂ¡ng hoáº·c 100.000 Ä‘/ 6 thĂ¡ng) Ä‘á»ƒ Ä‘Æ°á»£c há»c táº­p khĂ´ng giá»›i háº¡n cĂ¡c ná»™i dung trĂªn Online Math";
    					onDailyLimited();
    				}
                    CFrame.error(s);
                    //console.log(s);
                }
            },
            error: function(){ CFrame.error(CONNECTION_ERROR); }
        });
    }
}
 
!function(window){
    //@Audio procedures
    var skillImage = function()
    {
        this.appendTo = function(id, repeat, attr)
        {
            if(!attr) attr = "";
            for(var i = 0 ;i < repeat; i++){ document.getElementById(id).innerHTML += "<img src='"+this.url+"' "+attr+" />"; }
        }
    };

    function effect()
    {
        $(document.getElementById("parent-node").parentNode).addClass("animated flyLeftOut");
    }
	
    var CONNECTION_ERROR = "ChĂºng tĂ´i khĂ´ng káº¿t ná»‘i Ä‘Æ°á»£c tá»›i mĂ¡y chá»§ OnlineMath vĂ o lĂºc nĂ y, hĂ£y kiá»ƒm tra káº¿t ná»‘i Internet cá»§a báº¡n hoáº·c thá»­ láº¡i !";
    var CANNOT_LOAD_SCRIPT = "CĂ³ lá»—i khi táº£i ká»¹ nÄƒng nĂ y. HĂ£y thá»­ táº£i láº¡i trang !"; // invalid token or time out
    var NO_ANSWER = "<h2>KhĂ´ng tráº£ lá»i.</h2>";
    var CORRECT = 1;
    var WRONG = 0;
    var NOT_ANSWER =2;
    var CF = function(){}
    CF.audioList = [];

    CF.createAudio = function()
    {
        var onReady = function()
        {
            for(var i = 0; i< CF.audioList.length; i++)
            {
                soundManager.createSound(CF.audioList[i]);
            }
        }
        if(soundManager.readyState!= 3){soundManager.onready(function(){ onReady();}); return "";}
        else
        {
            onReady();
        }
        return "";
    };

    CF.destroyAudio = function()
    {
        for(var i = 0; i< CF.audioList.length; i++)
        {
            soundManager.destroySound(CF.audioList[i].id);
        }
    };

    CF.audioText = function(string)
    {
        var patt=/\(|\)|\+|\-|\*|\/|\.|,|\?|\'|\"|\?|\!|-|=|\>|\<|\[|\]|\s|:/g; // Remove: ( ) + - * / . , ? " ' ! - = > < [ ] :
        var url = CF.baseUrl() + "skill/loadaudio.php?q=";
        var astring = string.split("_");
        var dstring = astring.join(" ").replace(/#/g,"");
        dstring = dstring.replace(/@/g,"");
        var l = []
        for(var i = 0; i < astring.length; i++)
        {
            var s = astring[i];
            s = CF.viFilter(s).replace(patt,"");
            l.push(s);
        }
        var info  = l.join("+").toLowerCase();
        url +=  encodeURIComponent(info) + "&d="+CF._idQuestion;
        var info2 = l.join("_");
        CF.audioList.push({id: info2, url: url});
        var text = "<h2 class='audiotext'> <span class='audiobtn' onclick='return soundManager.play(\""+info2+"\")'></span> <span class='audiocont'>"+dstring+"</span></h2>";
        return text;
    }

    CF.audioText2 = function(string)
    {
        var patt=/\(|\)|\+|\-|\*|\/|\.|,|\?|\'|\"|\?|\!|-|=|\>|\<|\[|\]|\s|:/g; // Remove: ( ) + - * / . , ? " ' ! - = > < [ ] :
        var url = CF.baseUrl() + "skill/loadaudio2.php?q=";
        var astring = string.split("_");
        var dstring = astring.join(" ").replace(/#/g,"");
        dstring = dstring.replace(/@/g,"");
        var l = []
        for(var i = 0; i < astring.length; i++)
        {
            var s = astring[i];
            s = CF.viFilter(s).replace(patt,"");
            l.push(s);
        }
        var info  = l.join("+").toLowerCase();
        url +=  encodeURIComponent(info) + "&d="+CF._idQuestion;
        var info2 = l.join("_");
        CF.audioList.push({id: info2, url: url});
        var text = "<h2 class='audiotext'> <span class='audiobtn' onclick='return soundManager.play(\""+info2+"\")'></span> <span class='audiocont'>"+dstring+"</span></h2>";
        return text;
    }

    CF.viFilter = function(str)
    {
        var from = "Ă Ă¡áº¡áº£Ă£Ă¢áº§áº¥áº­áº©áº«Äƒáº±áº¯áº·áº³áºµĂ¨Ă©áº¹áº»áº½Ăªá»áº¿á»‡á»ƒá»…Ă¬Ă­á»‹á»‰Ä©Ă²Ă³á»á»ĂµĂ´á»“á»‘á»™á»•á»—Æ¡á»á»›á»£á»Ÿá»¡Ă¹Ăºá»¥á»§Å©Æ°á»«á»©á»±á»­á»¯á»³Ă½á»µá»·á»¹Ä‘";
        from += from.toUpperCase();
        var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
        to+= to.toUpperCase();
        for (var i = 0, l = from.length; i < l; i++)
        {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        return str;
    }

    CF.randNext = function(x,y)
    {
        var d = y -x;
        var res = Math.round(Math.random()*d);
        return parseInt(x + res);
    }

    CF.random = function()
    {
        return Math.random();
    }

    // @Time counting procedure
    CF._time = 0;
    CF._time_count = false;
    CF._time_interval = false;

    function next()
    {
        Cf._time += 1;
        // display
        var min = parseInt(Cf._time/60);
        var sec = Cf._time%60;
        var htm = ""; htm += min < 10 ? '0' + min : min;
        htm += " : "; htm += sec < 10 ? '0' + sec : sec;
        $('#time').html(htm);
    }

    CF.timecount = function()
    {
        if(!CF._time_count)
        {
            CF._time_interval = setInterval(next,1000);
            CF._time_count = true;
        }
    }

    CF.timestop = function()
    {
        CF._time = 0;
        clearInterval(CF._time_interval);
        CF._time_count = false;
    }

    // @
    CF._text = ['Tuyá»‡t vá»i !', 'ÄĂºng rá»“i !', 'Xuáº¥t sáº¯c !', 'Ráº¥t tá»‘t !', 'ChĂ­nh xĂ¡c !', 'Yeah !!!','Giá»i quĂ¡ !', 'Hay quĂ¡ !','KhĂ¡ láº¯m !'];
    CF._qcount = 0;

    // @Render Question Procedures
    // @Parameters
    CF.check = CF.getContent = CF.getExp = CF.getUA = false; // question procedures
    CF._qparams = CF._aparams = false; // parameter
    CF._div = "question"; // div element for render
    CF._idQuestion = 0; // question id
    CF._index = 0; // question index
    CF._mul = 1; //
    CF._exp_elmid = "dlexp_content";

    CF.saveQparams = function(params){CFrame._qparams = params;}
    CF.saveAparams = function(params){CFrame._aparams = params;}

    // Question Rendering
    // @_list: list of questions
    CF._list = [];
    CF.loadScript = function(string)
    {
        var _url = CF.server + '?g=content.script';
        $.ajax({
            url: _url,
            data: CF.data,
            cache: false,
            method:'post',
            success: function(string)
            {
               eval(string);
               CFrame.play();
			   olm_check_for_request(CFrame.data.id_user, 0);
            },
            error: function()
            {
                alert(CANNOT_LOAD_SCRIPT);
            }
        });
    }

	var flag = false;
    // exec the scripts
    CF.play = function()
    {
        $("#std_btn").show();
        CF.timecount();
        var score = 0; score= CF.getScore();
        var indList = [];
        for(var i = 0; i <  CFrame._list.length; i++ )
        {
            if(CFrame._list[i].score <= score)
            {
                indList.push(i);
            }
        }
        var index =	indList[CFrame.randNext(0,indList.length-1)];
        CFrame._index = index;
        var Q = CFrame._list[index];
        CFrame._mul = Q.mul > 1 ? Q.mul : 1;
        CFrame._idQuestion = Q.id;
        if(Q.type != 0)
        {
            var func = "makeQuestion"+Q.id+"(false,'question'); CFrame.check = check" + Q.id + "; CFrame.getContent = getContent" + Q.id + "; CFrame.getUA = getUA" + Q.id +"; CFrame.getExp = getExp" + Q.id + ";" ;
            eval(func);
        }
        else
        {
            document.getElementById(CFrame._div).innerHTML = "<div class='question' id='olm_xml_skillblock'></div>";
            $.ajax({
                type: "POST", url : CFrame.server + "?g=content.xml", data: "id="+Q.id, cache: false,
                success: function(string)
                {
                    skillBuilder.parseString(string);
                    CFrame.id("question").getElementsByTagName("input")[0].focus();
                },
                error: function()
                {
                    CFrame.error(CONNECTION_ERROR);
                }
            });
        }
        var inputs = CFrame.id("question").getElementsByTagName("input");
        if(inputs.length > 0)
        {
            inputs[0].focus();
        }
        if($(iPad.selector).length != 0)
        {
            iPad.defaultBehavior();
            $("#btn-ipad").show();
        }
        else $("#btn-ipad").hide();
		var btn = document.getElementById("btn-done");
        if(btn) btn.onclick = CF.clickEvent;
        this.timecount();
		if(!CFrame.data.isVip)
        {
	        if(!flag)
            {
                var prcc = olm_get_item("prcc");
                var today = new Date(); today = today.getDate() + "_" + today.getMonth();
                if(prcc)
                {
					prcc = prcc.split(":");
					if(today == prcc[0])
                    {
						prcc = parseInt(prcc[1]);
					}
                    else
                    {
						prcc = 0;	
					}	
                }
                else
                {
				    prcc = 0;
                }
                //olm_set_item("prcc", today + ":" + prcc);
			    if(!CF.data.isVip){CF._qcount -= prcc;} CF._qcount = Math.max(0,CF._qcount);
			    $("#count_prc").html(CF._qcount);
			    if(CF._qcount <= 0){
				    onDailyLimited();
			    }
                flag = true;
			}
		}
    }

    CF.clickEvent = function(){
        var type = CFrame._list[Cf._index].type;
        if (CFrame.data.isG && Cf.getScore()>15)
        {
            $("#std_btn").html("<div><b style='font-size: 16px; color: red;'>Báº¡n vui lĂ²ng Ä‘Äƒng kĂ½ tĂ i khoáº£n Ä‘á»ƒ há»c tiáº¿p !</b> <a href='/?l=user.register' class='btn btn-danger'>ÄÄƒng kĂ½ tĂ i khoáº£n</a></div>");
			if(document.getElementById('olm_modal')) return;
			var div = document.createElement('div'); div.id='olm_modal';
			div.setAttribute('class','modal-bg');
			var content = "<h2>Báº¡n vui lĂ²ng Ä‘Äƒng kĂ½ tĂ i khoáº£n Ä‘á»ƒ Ä‘Æ°á»£c há»c tiáº¿p !</h2><p>Sau khi Ä‘Äƒng kĂ½ tĂ i khoáº£n, bĂªn cáº¡nh viá»‡c há»c toĂ¡n hiá»‡u quáº£ vá»›i nhiá»u bĂ i toĂ¡n hÆ¡n, báº¡n cĂ²n cĂ³ thá»ƒ sá»­ dá»¥ng cĂ¡c chá»©c nÄƒng cá»§a Online Math Ä‘á»ƒ Ä‘Ă¡nh giĂ¡ quĂ¡ trĂ¬nh há»c táº­p, xem láº¡i nhá»¯ng bĂ i há»c mĂ¬nh Ä‘Ă£ lĂ m vĂ  tham gia vĂ o cá»™ng Ä‘á»“ng nhá»¯ng ngÆ°á»i sá»­ dá»¥ng Online Math</p><a href='/?l=user.register' class='btn btn-primary btn-large'>ÄÄƒng kĂ½ tĂ i khoáº£n</a>";
			div.innerHTML = "<div class='modal-container'><div class='modal-inner'>"+content+"</div></div>";
			document.body.appendChild(div);
        }
        else
        {
            if(type == 1)
            {
                var r = CFrame.check(CFrame._qparams,CFrame._div);
                if(r == 2){ Cf.openNotice(); return false;}
                else{}
                iPad.remove();
                if(r == 1)
                {
                    Cf.addScore(true);
                    Cf.sendRequest({
                        qparams: JSON.stringify(Cf._qparams),
                        aparams: JSON.stringify(Cf._aparams),
                        time: Cf._time,
                        result : r,
                        id_skill: Cf.data.id,
                        id_script: Cf._idQuestion,
                        id_lop: CFrame.data.id_lop,
                        score: Cf.getScore(),
                        id_student: CFrame.data.id_student,
                        id_group: CFrame.data.id_group,
                        id_courseware: CFrame.data.id_courseware
                    });
                    Cf.timestop();Cf.transition();
                }
                else
                {
                    Cf.onWrong();
                }
            }
            else
            {
                skillBuilder.check();
            }
            return false;
        }
    }
	
    CF.onWrong = function()
    {
        iPad.remove();
        var time = CF._time;
        CF.timestop(); // // stop timer counting
        $("#std_btn").hide();
        var nextbtn = "<a href='#' class='btn btn-primary resumeproc' onclick= 'return CFrame.play();'>Tiáº¿p tá»¥c lĂ m bĂ i !</a><a href='#' class='btn btn-warning' onclick= 'return CFrame.reportError();' style = 'margin-left: 4px;'>BĂ¡o lá»—i cĂ¢u há»i</a>";
        var elm = Cf.id("question");
        var htm = "";
        if(Cf._aparams == "[KhĂ´ng tráº£ lá»i]") htm ="<h1>Báº¡n Ä‘Ă£ khĂ´ng tráº£ lá»i Ä‘Æ°á»£c cĂ¢u há»i nĂ y, Ä‘Ă¡p Ă¡n Ä‘Ăºng lĂ :</h1>"; else htm = "<h1>CĂ¢u tráº£ lá»i cá»§a báº¡n chÆ°a chĂ­nh xĂ¡c, Ä‘Ă¡p Ă¡n Ä‘Ăºng lĂ :</h1>";
        htm += "<div id='conts_new' style='padding-left: 5px;'></div><br />"+nextbtn+" <a href='#_exp_header' class='btn btn-success'>Xem gá»£i Ă½</a><br /><br />";
        htm += "<div class='box'><h1 class='box-h'>BĂ i toĂ¡n:</h1>";
        htm += "<h2 style='color: #0079b2'>Äá» bĂ i:</h2><div id='question_new' style='padding-left: 5px;'></div><h2 style='color: #0079b2'>Báº¡n Ä‘Ă£ tráº£ lá»i:</h2>";
        htm += "<div id='us_ans' style='padding-left: 10px;'></div>";
        htm += "</div><br /><br />";
        htm += "<div id='conts_new' style='padding-left: 5px;'></div>";
        htm += "<div id='_exp_header' class='box'><h1 class='box-h'>HÆ°á»›ng dáº«n giáº£i:</h1>";
        htm += "<div id='"+CF._exp_elmid+"' style='padding-left: 5px;'></div>";
        htm += "</div><br/>" + nextbtn;
        elm.innerHTML = htm;
		if (Cf.getScore()>40 && !Cf.data.isVip)
        {
			document.getElementById(CF._exp_elmid).innerHTML="<p>Muá»‘n xem hÆ°á»›ng dáº«n giáº£i bĂ i nĂ y, báº¡n cáº§n tĂ i khoáº£n VIP. <a href='/?l=payment.buy' class='btn btn-danger'>Mua VIP</a> <a href='/tin-tuc/Huong-dan-mua-tai-khoan-VIP.html' class='btn'>HÆ°á»›ng dáº«n mua VIP</a></p>";
		}
        else
        {
			CFrame.getExp(CF._qparams,CF._exp_elmid);
		}
		Cf.addScore(false);
        CFrame.getContent(CF._qparams,'conts_new');
        if(CF._aparams != "[KhĂ´ng tráº£ lá»i]"){CFrame.getUA(CFrame._qparams,CFrame._aparams,'us_ans')} else $("#us_ans").html(NO_ANSWER);
        eval("makeQuestion"+CF._list[Cf._index].id+"(CFrame._qparams,'question_new');");
        $("#question_new input").each(function(i,e){ e.disabled = "disabled"});
        Cf.sendRequest({
            qparams: JSON.stringify(Cf._qparams),
            aparams: JSON.stringify(Cf._aparams),
            time: time,
            result : 0,
            id_skill: Cf.data.id,
            id_script: Cf._idQuestion,
            id_lop: CFrame.data.id_lop,
            score: Cf.getScore(),
            id_student: CFrame.data.id_student,
            id_group: CFrame.data.id_group,
            id_courseware: CFrame.data.id_courseware
        });
        $(".resumeproc").get(0).focus();
    }
	
    CF.transition = function()
    {
        $("#qcontainer").hide(); _OLM_.id('question').innerHTML = "";
        var text = this._text[this.randNext(0,this._text.length - 1)];
        $("#good").html(text);
        $("#verygood").fadeIn(500).delay(800).fadeOut(800, function(){$("#qcontainer").show(); _OLM_.play();});
    }


    CF.sendRequest = CF.save = function(_data, _callback)
    {
		CFrame.pullRequest(_data);	
		/*
        $.ajax(CF.server + "index.php?g=math.save",{type:'POST', data: _data,
            success: function(s){ if(s != "OK")
            {
				if(s == "LOGOUT_BY_OUTHER_USER"){ s= "Báº¡n Ä‘Ă£ bá»‹ Ä‘Äƒng xuáº¥t khá»i Online Math. TĂ i khoáº£n cá»§a báº¡n Ä‘Ă£ Ä‘Æ°á»£c mĂ¡y tĂ­nh khĂ¡c sá»­ dá»¥ng Ä‘á»ƒ Ä‘Äƒng nháº­p. OnlineMath khĂ´ng cho phĂ©p má»™t tĂ i khoáº£n sá»­ dá»¥ng <b>cĂ¹ng má»™t lĂºc trĂªn 2 mĂ¡y tĂ­nh</b>."; 
					CF.data.isG =true; CF.data.isVip = false; 
					$("#vipstyle").remove();
					setTimeout(function(){
						location.reload();
					}, 15000);
				}
				
				if(s== "DAILY_PRACTICE_LIMITED"){
					s = "Má»™t tĂ i khoáº£n hoáº·c má»™t mĂ¡y tĂ­nh chá»‰ Ä‘Æ°á»£c thá»±c hĂ nh má»™t sá»‘ lÆ°á»£ng giá»›i háº¡n cĂ¡c cĂ¢u há»i má»—i ngĂ y. Báº¡n cáº§n nĂ¢ng cáº¥p lĂªn tĂ i khoáº£n VIP (giĂ¡ chá»‰ tá»« 30.000 Ä‘/ 1 thĂ¡ng hoáº·c 100.000 Ä‘/ 6 thĂ¡ng) Ä‘á»ƒ Ä‘Æ°á»£c há»c táº­p khĂ´ng giá»›i háº¡n cĂ¡c ná»™i dung trĂªn Online Math";
					onDailyLimited();
				}
				
                CFrame.error(s);
                //		console.log(s);
            }
            },
            error: function(){ CFrame.error(CONNECTION_ERROR); }});
		*/
    }
	
	CF.pullRequest = function(_data)
    {
		if(Cf.data.id_user == 0){   return false;}	
		var counting = parseInt( olm_get_item("stack.counting_" + Cf.data.id_user, 0) ); counting = counting ? counting : 0;
		var key = "practice_data_" +  Cf.data.id_user + "_" + counting;
		olm_set_item(key, JSON.stringify(_data));
		counting+= 1;
		olm_set_item("stack.counting_" + Cf.data.id_user, counting);
		olm_check_for_request(Cf.data.id_user);
    }

    CF.baseSiteUrl = function(){ return CF.server;}
    
    CF.getScore = function()
    { 
        //return parseInt(document.getElementById('score_input').value);
        return parseInt(tmp_score);
    }

    CF.bonus = function(count, e)
    {
        html = "";
        for(var i =0; i< count; i++){ html += "<img src='" + this.server + "images/star.png' class='bonus-star' />";}
        e.innerHTML = html;
    }

    CF.closeModal = function()
    {
        $("#olm_modal").remove();
    }

    CF.error = function(e){ $("#error_panel").html("<p class='alert alert-error'> <button type='button' class='close' data-dismiss='alert'>&times;</button>"+e+"</p>");}
    
    CF.ignore = function()
    {
        this.closeModal();
        this._aparams = "[KhĂ´ng tráº£ lá»i]";
        var type = CFrame._list[Cf._index].type;
        if(type == 1) this.onWrong(); 
        else
        {
            skillBuilder.onWrong(Cf._aparams);
        }
    }

    CF.openNotice = function()
    {
        if(document.getElementById('olm_modal')) return;
        var div = document.createElement('div'); div.id='olm_modal';
        div.setAttribute('class','modal-bg');
        var content = "<h1>Báº¡n cĂ²n chÆ°a tráº£ lá»i cĂ¢u há»i !</h1><p>Náº¿u tháº¥y quĂ¡ khĂ³, hĂ£y bá» qua vĂ  lĂ m cĂ¢u tiáº¿p theo.</p><button class='btn btn-primary' onclick='_OLM_.closeModal();'>ÄĂ³ng láº¡i vĂ  tiáº¿p tá»¥c</button> <button onclick='_OLM_.ignore();'class='btn btn-danger'>Bá» qua cĂ¢u nĂ y</button>";
        div.innerHTML = "<div class='modal-container'><div class='modal-inner'>"+content+"</div></div>";
        document.body.appendChild(div);
    }

    // @@@ IMAGE PROCEDURES AND DATA
    CF.images = [ // list of images
        {id:'gl1', name:'bá»™ chĂ¬a khĂ³a', img:'bochiakhoa.png'},
        {id:'gl2', name:'bĂ³ng Ä‘Ă¨n', img:'bongden.png'},
        {id:'gl3', name:'bĂ´ng hoa', img: 'bonghoa.png'},
        {id:'gl4', name:'quáº£ bĂ³ng rá»•', img:'bongro.png'},
        {id:'gl5', name:'bĂºt lĂ´ng', img:'butmau.png' },
        {id:'gl6', name:'cĂ¡i chuĂ´ng', img:'caichuong.png'},
        {id:'gl7', name:'con chim cĂ¡nh cá»¥t', img:'chimcanhcut.png'},
        {id:'gl8', name:'con cĂ¡', img:'conca.png'},
        {id:'gl9', name:'quáº£ dĂ¢u', img: 'dau.png'},
        {id:'gl10', name:'quáº£ dá»©a', img:'dua.png'},
        {id:'gl11', name:'chiáº¿c kĂ­nh lĂºp', img:'kinhlup.png'},
        {id:'gl12', name:'quáº£ lĂª', img:'le.png'},
        {id:'gl13', name:'báº¹ chuá»‘i', img:'naichuoi.png'},
        {id:'gl14', name:'ngĂ´i nhĂ ', img:'ngoinha.png'},
        {id:'gl15', name:'ngĂ´i sao', img:'ngoisao.png'},
        {id:'gl16', name:'quáº£ bĂ³ng', img:'quabong.png'},
        {id:'gl17', name:'quáº£ bĂ³ng bay', img:'quabongbay.png'},
        {id:'gl18', name:'quáº£ cam', img:'quacam.png'},
        {id:'gl19', name:'quáº£ Ä‘Ă o', img:'quadao.png'},
        {id:'gl20', name:'cuá»‘n sĂ¡ch', img:'sach.png'},
        {id:'gl21', name:'quáº£ tĂ¡o', img:'tao.png'},
        {id:'gl22', name:'cá»¥c táº©y', img:'taychi.png'}
    ];

    CF.getImage = function(index)
    {
        var img = CF.images[index]; var image = new skillImage;
        image.id = img.id; image.name = img.name; image.url = CFrame.server + 'skill/images/'+img.img; image.html = "<img src='"+image.url+"' />";
        return image;
    }

    CF.randImage = function()
    {
        var length = this.images.length;
        var index = this.randNext(0, length-1);
        return this.getImage(index);
    }

    CF.getImageById = function(id)
    {
        var index = parseInt(id.substr(2,id.length));
        return this.getImage(index - 1);
    }

    // some useful functions
    CF.id = function(id){return document.getElementById(id);}
    CF.randList = function(list)
    {
        // use this function with small array
        list1 = [];
        for(var i = 0; i < list.length;  i++) list1.push(list[i]);
        var result = [];
        le = list.length;
        while(le > 0)
        {
            var rd = CFrame.randNext(0,le - 1);
            var tmp = list1.splice(rd,1)
            result.push(tmp[0]);
            le--;
        }
        return result;
    }

    CF.jsonEncode = function(o)
    {
        return JSON.stringify(o);
    }

    CF.setContent = function(content)
    {
        $('#answerc').html(content);
    }

    CF.addContent = function(content)
    {
        document.getElementById('answerc').innerHTML += content;
    }

    CF.randNext = function(x,y)
    {
        var d = y -x;
        var res = Math.round(Math.random()*d);
        return parseInt(x + res);
    }

    CF.setScore = function(e)
    {
        e = e > 100 ? 100 : e;
		if(e==100)
        {
            $("#score-bonus").attr('src','https://olm.vn/images/bonus55.png');
            olm_check_for_request(CFrame.data.id_user, 0); 
        }
        var t = document.getElementById("scoreval");
        t.innerHTML = e;
        //document.getElementById("score_input").value = e;
        tmp_score = e;
        var n = ["#fff000", "#ccff00", "#ff00ff", "#00ffff"];
        t.style.textShadow = n[Cf.rN(0, 3)] + " 0px 0px 60px";
        setTimeout(function () {
            document.getElementById("scoreval").style.textShadow = "0px 0px 1px #fff"
        }, 1000);
        if(e > 60)
        {
            $("#score-bonus").show().addClass("rotatez");
        }
        else{$("#score-bonus").hide();}
        setTimeout(function(){$("#score-bonus").removeClass("rotatez")}, 2300);
    }

    CF.addScore = function(flag,n)
    {
        n = CF._mul;
        var score = parseInt(Cf.getScore());
        if(score == 100){  CF.setScore(100); return; }
        var dsc = parseInt(score/10);
        var asc = 10 - dsc;
        if(!n){n = 1;}
		if(!CFrame.data.isVip)
        {
			var prcc = olm_get_item("prcc");
			var today = new Date(); today = today.getDate() + "_" + today.getMonth();
			if(prcc)
            {	
				prcc = prcc.split(":");
				if(today == prcc[0])
                {
					prcc = parseInt(prcc[1]) + 1;
				}
                else
                {
				    prcc = 1;		
				}		
			}
            else
            {
				prcc = 1;
			}
			olm_set_item("prcc", today + ":" + prcc);
			CF._qcount -= 1; CF._qcount = Math.max(0,CF._qcount);
			$("#count_prc").html(CF._qcount);
			if(CF._qcount <= 0)
            {
				onDailyLimited();
			}
		}
        if(flag) {CF.setScore(score + asc*n); } else CF.setScore(score - dsc*n);
    }

    CF.closeDialog = function()
    {
        $('#w_ans').dialog('close');
        $('#dl_exp').dialog('close');
        clocktimeo = setTimeout("CFrame.next_time()",1000);
        if(this.dialogClose)
        {
            return this.dialogClose.call();
        }
    }

    CF.setExp = function(expc)
    {
        document.getElementById(Cf._exp_elmid).innerHTML = expc;
    }
    
    CF.addExp = function(expc){document.getElementById('expcontent').innerHTML += expc;}
    CF.message  = function(cont)
    {
        return "<p class='msg_sys'>"+cont+"</p>";
    }

    CF.baseUrl = CF.baseSiteUrl;
    CF.getGradeId = function()
    {
        return document.getElementById('gradeid').value;
    }

    // rewrite this function
    CF.addStyleSheet = function(css)
    {
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        style.type = 'text/css';
        if(style.styleSheet)
        {
            style.styleSheet.cssText = css;
        }
        else
        {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    }
    
    CF.reportError = function()
    {
        if(document.getElementById('olm_modal')) return;
        var div = document.createElement('div'); div.id='olm_modal';
        div.setAttribute('class','modal-bg fade in'); //div.onclick = CFrame.closeModal;
        var modal_style ="style='width: 620px; padding: 5px 8px; background: #ffffff;opacity: 1; box-shadow: 0px 1px 10px #000; margin: 2.5% auto;'";
        var content = "<span class='close' onclick='CFrame.closeModal();'>&times;</span><h2 style='text-align: center;'>BĂ¡o lá»—i cĂ¢u há»i</h2>";
        content += "<p>Báº¡n Ä‘Ă£ gáº·p lá»—i gĂ¬ á»Ÿ cĂ¢u há»i nĂ y, hĂ£y mĂ´ táº£ vĂ o Ă´ bĂªn dÆ°á»›i. Vá»›i má»—i lá»—i thĂ´ng bĂ¡o Ä‘Ăºng, OLM sáº½ thÆ°á»Ÿng cho báº¡n 10 ngĂ y VIP!</p>";
        content += " <textarea class='form-control' rows='5' id='reportContent' placeholder = 'HĂ£y mĂ´ táº£ vĂ i dĂ²ng vá» lá»—i cá»§a bĂ i toĂ¡n nĂ y.' style = 'width: 97%;'></textarea>";
        var modal = "<div id='olm-modal-content' "+modal_style+"><div style='overflow: hidden; margin: 10px;' class='olm-question-list scroll'>"+content+"<p style='text-align: center;'><br /><button id = 'give-feedback' class='btn btn-primary' style = 'margin-right: 10px;'>Gá»­i bĂ¡o lá»—i</button><button onclick='CFrame.closeModal();' class='btn btn-danger'>Há»§y</button></p><br class='clear'/></div></div>";
        div.innerHTML = modal;
        document.body.appendChild(div); $(div).addClass("hidden-phone hidden-tablet");
        $("#give-feedback").on("click", function(){
            var ct = $("#reportContent").val();
            if(ct === ""){alert("Báº¡n pháº£i mĂ´ táº£ vá» lá»—i cá»§a bĂ i toĂ¡n nĂ y."); return;}
            var _url = CF.server + '?g=content.feedback';
            $.ajax({
                url: _url,
                type: "POST",
                data: {
                    id_question : Cf._idQuestion,
                    skill: Cf.data.id,
                    content : ct,
                    type : 1
                },
                success: function(string){
                    console.log(string);
                    if(string == "OK") { alert("Cáº£m Æ¡n báº¡n Ä‘Ă£ gá»­i pháº£n há»“i, OLM sáº½ xem xĂ©t pháº£n há»“i nĂ y cá»§a báº¡n!"); CFrame.closeModal();}
                    else alert("ÄĂ£ xáº£y ra lá»—i, hĂ£y gá»­i láº¡i!");
                },
                error: function(){
                    alert("Lá»—i káº¿t ná»‘i Ä‘áº¿n mĂ¡y chá»§ OLM, hĂ£y thá»­ láº¡i!");
                }
            });
        });
    }

    // Macro
    CF.rN = CF.randNext;
    CF.rL = CF.randList;
    CF.rI = CF.randImage;
    //
    // Create the CF Object
    window.CFrame = window.Cf = window._OLM_ = CF;
}(window);

(function(){
    window.iPad = function(){};
    iPad.keys = [0,1,2,3,4,5,6,7,8,9,'+','-','x',':','>','<','='];
    iPad.html  = "";
    iPad.selector = "#question  input[type='text']";
    iPad.current = null;
    iPad.hidden = false;

    iPad.render = function()
    {
        iPad.html = "<div id='olm_key_pad'>";
        for(var i = 0; i < iPad.keys.length;i++)
        {
            iPad.html += "<button class='btn key-btn keypad'>"+iPad.keys[i]+"</button>";
        }
        iPad.html += "<button onclick='return iPad.backSpace();' class='btn keypad' style='padding: 0px 5px;'><b class='backspace'></b></button></div>";
    }
    
    iPad.keyPad = function(elm)
    {
        //  neu key pad goi ko thong qua def ---> DEF = false
        $('#olm_keypad').remove();
        iPad.render(); elm.innerHTML = iPad.html;
        $('.key-btn').each(function(index, element)
        {
            element.onclick = function()
            {
                iPad.current.value +=$(element).text();
            }
        });
    } // keyPad

    iPad.dropTo = function(selector)
    {
        iPad.selector = selector;
        $(selector).focus(function(){
            iPad.current = this;
        }).get(0).focus();
        iPad.current = $(selector).get(0);
    } // dropTo

    iPad.show = function()
    {
        if($(iPad.selector).length != 0)
        {
            iPad.keyPad(document.getElementById('ipad_container'));
            iPad.dropTo(iPad.selector);
        }
    }
    
    iPad.backSpace = function()
    {
        var val = iPad.current.value;
        val = val.substring(0,val.length-1);
        iPad.current.value = val;
    }

    iPad.toggle = function()
    {
        if(iPad.hidden)
        {
            iPad.show();
            iPad.hidden = false;
        }
        else
        {
            iPad.remove();
            iPad.hidden = true;
        }
    }

    iPad.remove = function()
    {
        $("#olm_key_pad").remove();
    }

    iPad.defaultBehavior = function(f)
    {
        if(iPad.hidden){
            return;
        }
        iPad.show();
    }

    return false;
})();

$(function(){
    Cf.id("qcontainer").onkeydown = function(event)
    {
		if(document.getElementById("vipstyle")){
			$("#olm_modal").remove();
			var div = document.createElement('div'); div.id='olm_modal';
			div.setAttribute('class','modal-bg');
			var content = "<h3>Ná»™i dung nĂ y chá»‰ dĂ nh cho tĂ i khoáº£n VIP</h3><p>Cáº£m Æ¡n báº¡n Ä‘Ă£ sá»­ dá»¥ng Online Math. BĂ i toĂ¡n nĂ y chá»‰ dĂ nh cho cĂ¡c tĂ i khoáº£n VIP cĂ³ thu phĂ­ cá»§a Online Math. Viá»‡c thu phĂ­ sáº½ giĂºp chĂºng tĂ´i cĂ³ Ä‘iá»u kiĂªn duy trĂ¬ vĂ  phĂ¡t triá»ƒn trang web tá»‘t hÆ¡n. Äá»ƒ náº¡p VIP hĂ£y báº¥m vĂ o nĂºt mua tĂ i khoáº£n bĂªn dÆ°á»›i</p><a href='/?l=payment.buy' class='btn btn-primary btn-large'>Mua tĂ i khoáº£n VIP</a>";
			div.innerHTML = "<div class='modal-container'><div class='modal-inner'>"+content+"</div></div>";
			document.body.appendChild(div);
			return;
		}
        if((event.keyCode == 13)&&(CFrame._time_count) && document.getElementById("btn-done")){ return CFrame.clickEvent();}
        return true;
    }
});