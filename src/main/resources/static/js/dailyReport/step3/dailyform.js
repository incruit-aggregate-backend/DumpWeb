const carsubmittel = $("#carSubmitTel")
document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    let sheetID = params.get("sheetID");
    //console.log(sheetID);

    if (sheetID !== null) {
        getSheetIDDataByParams(sheetID);
    }
    //clickListThAndRedirect();//step4에 있음
    $.showChk1;
    recoverState();
    approved();
    //searchByCarsubmitTel(carsubmittel.value); 여기서 이렇게 부르면 안됨!
});



function valueToIndex(value) {
    switch (value) {
      case '상차':
        return 1;
      case '하차':
        return 2;
      case '제출':
        return 3;
      default:
        return 0;
    }
}

function getSheetIDDataByParams(sheetID) {
    $.ajax({
        url: "/dailyReport/form/ajax/details",
        type: "POST",
        data: {sheetID: sheetID},
        success: function (data) {
            //이 부분 추후 정리할 것
            document.getElementById('carSubmit').value=data.carSubmit;
            openable1 = true;
            document.getElementById('date').value=data.date;
            document.getElementById('carSubmitTel').value=data.carSubmitTel;
            openable3 = true;
            searchByCarsubmitTel(data.carSubmitTel);
            document.getElementById('salesman').value=data.salesman;
            openable2 = true;
            document.getElementById('CurrStatus').options[valueToIndex(data.currStatus)].selected = true;
            $.list();
        }
    })
}

$.emptyRow = function() {
    const popup = document.getElementById("popup");
    const popinputs = popup.querySelectorAll('.input');
    for (let i = 0; i < popinputs.length; i++) {
        popinputs[i].value = ""; // Set the value of each input field to an empty string
    }
}

/*제출처, 운송정보 저장*/
$.save = function() {
    var formData = new FormData($("[name=frm]")[0]);
    $.ajax({
        url: "/dailyReport/workspace/ajax/save",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            //$.successSave();
            $.list();
            $.emptyRow();
        },
        error: function(xhr, status, error) {
            $.error();
         }
    })
}

$.list = function() {
    var formData = new FormData($("[name=frm]")[0]);
    $.ajax({
        url: "/dailyReport/workspace/ajax/list",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            //console.log(JSON.stringify(data, null, 2));
            console.log("운송 DATA는?"+JSON.stringify(data));
            //document.getElementById('CurrStatus').options[valueToIndex(data.currStatus)].selected = true;
            //console.log("$.list() data: ",data.currStatus)
            if(undefined!==data.sheetID){
                $.saveSheetID(data);
            }
            //$.showChk1(data);

            showTransportList(data);
        },
        error: function(xhr, status, error) {
            $.error();
        }
    })
}
//chk정보를 불러오기 위한 함수
$.showChk1 = function(data) {
    document.getElementById("checkbox").checked = data.chk1;
    approved();
};

//제출처 정보 수정을 위한 sheetID 저장
$.saveSheetID = function(data){
    document.getElementById("sheetID").value=data.sheetID;
}

/*function showTransportList(data){
    let html;
    if (!data) {
        html = '   <td colspan="5" style="text-align: center;">저장된 운송 정보가 없습니다</td>';
    } else {
        // 서버에서 반환된 데이터를 이용하여 테이블 형태로 생성
        html = '<table>';
        for (let i = 0; i < data.dailyReportStep3SubList.length; i++) {
            let subData = data.dailyReportStep3SubList[i];
            let rowId = 'row' + i;
            html += '<tr id="' + rowId + '" onclick="fillPop(event)">';
            html += '   <td>' + subData.fromsite + '</td>';
            html += '   <td>' + subData.tosite + '</td>';
            html += '   <td>' + subData.item + '</td>';
            html += '   <td>' + subData.qty + '</td>';
            html += '   <td>' + subData.rem + '</td>';
            html += '   <td style="display: none;">' + subData.sheetsubID + '</td>';
            html += '   <td style="display: none;">' + subData. qtyup + '</td>';
            html += '</tr>';
        }
        html += '</table>';
    }
        // 데이터를 표시할 위치에 추가
        $('#transportContainer').html(html);
}*/

function showTransportList(data){
    let html;
    if (!data) {
        html = '   <td colspan="5" style="text-align: center;">저장된 운송 정보가 없습니다</td>';
    } else {
        // 서버에서 반환된 데이터를 이용하여 테이블 형태로 생성
        html = '<table>';
        for (let i = 0; i < data.length; i++) {
            let subData = data[i];
            let rowId = 'row' + i;
            html += '<tr id="' + rowId + '" onclick="fillPop(event)">';
            html += '   <td>' + subData.fromsite + '</td>';
            html += '   <td>' + subData.tosite + '</td>';
            html += '   <td>' + subData.item + '</td>';
            html += '   <td>' + subData.qty + '</td>';
            html += '   <td>' + subData.rem + '</td>';
            html += '   <td style="display: none;">' + subData.sheetsubID + '</td>';
            html += '   <td style="display: none;">' + subData. qtyup + '</td>';
            html += '</tr>';
        }
        html += '</table>';
    }
        // 데이터를 표시할 위치에 추가
        $('#transportContainer').html(html);
}


let see;
function searchOptions(data) {
    //console.log(data.carSubmit)
    for (let i = 0; i < data.length; i++) {
        let anOption = data[i]
        let options = '<li>'+ anOption.carSubmit +'</li>'
    }
    let options = '<li>'+ data[0][0] +'</li>'
    $('#searchDrop').html(options);
}


//카테고리 생성용 1,2,3
function searchByCarsubmit(inputData) {
    var carSubmit = $("#carSubmit").val();

    $.ajax({
        url: "/dailyReport/search/carSubmit",
        method: "GET",
        data: { "carSubmit": carSubmit },
        success: function(data) {
            searchOptions(data);
            console.log('Ajax 요청 성공:', data);
            //data가져오는데 성공했어요. console에서 확인가능합니다.
            //카테고리 생성해주세요.
        },
        error: function(error) {
            console.error('Ajax 요청 실패:', error);
        }
   });
}

function searchBySalesman(inputData) {
    var salesman = $("#salesman").val();
    $.ajax({
        url: "/dailyReport/search/salesman",
        method: "GET",
        data: { "salesman": salesman },
        success: function(data) {

            console.log('Ajax 요청 성공:', data);

        },
        error: function(error) {
            console.error('Ajax 요청 실패:', error);
        }
   });
}

function searchByCarsubmitTel(inputData) {
    const carSubmitTel = carsubmittel.val();
    //console.log("carSubmitTel : "+carSubmitTel);
    let isMember = $("#isMember");
    let inviteBtn = $("#inviteBtn");

    $.ajax({
        url: "/dailyReport/search/carSubmitTel",
        method: "GET",
        data: { "carSubmitTel": carSubmitTel },
        success: function(data) {
            console.log('Ajax 요청 성공:', data);
            if(data.list!=null){ //드롭다운 카테고리
                /* 진행상황 표시 */
                //console.log("listData는?", data.list)
                openDrop();
            }else{
                console.log("list data 없음");
            }

            if(data.checkData!=null){ // 가입된 거래처
                //console.log("checkData는?",data.checkData);
                isMember.text("가입된 회원 입니다");
                $("#inviteBtn").css("margin-left", "5000px");

            }else{
                console.log("checkData 없음");
                isMember.text("");
                $("#inviteBtn").css("margin-left", "auto");
            }

            listData();
        },
        error: function(error) {
            console.error('Ajax 요청 실패:', error);
        }
   });
}

$.dateSearch = function () {
    searchByCarsubmitTel(carSubmitTel);
}

/*제출처 검색*/
$.search = function() {
    var searchText = $("#search-input").val();
    var searchData = {
        carSubmit: searchText,
        carSubmitTel: searchText,
        salesman: searchText
    };
       $.ajax({
           url: "/dailyReport/search",
           type: "GET",
           data: searchData,
           success: function (data) {
               var json = $.parseJSON(data);
               if(json.httpCode == 200) {
                   $.successSearch();
                   displayResults(json.searchList);
               } else {
                   $.error();
               }
           }
       })
   }


/*수정*/
$.editRow = function() {
    var formData = new FormData($("[name=frm]")[0]);
    var sheetsubID = $("#sheetsubID").val();

    formData.append("sheetsubID", sheetsubID);
    $.ajax({
        url: "/dailyReport/workspace/ajax/edit",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            var json = $.parseJSON(data);
            if(json.httpCode == 200){
                  $.successRowEdit();
                  $.list();
            }else{
                  $.failEdit();
            }
          },
          error: function(error) {
            $.error();
            console.error('수정 실패:', error);
          }
    });
}

/*삭제*/
$.deleteRow = function() {
   var sheetsubID = $("#sheetsubID").val();
  $.ajax({
      url: "/dailyReport/workspace/ajax/delete",
      type: "GET",
      data: { sheetsubID: sheetsubID },
      success: function (data) {
        var json = $.parseJSON(data);
        if(json.httpCode == 200){
            $.successRemoval();
            $.emptyRow();
            $.list();
        }else{
            $.failRemoval();
        }

      },
      error: function(error) {
         $.error();
         console.error('삭제 실패:', error);
      }
  })
}

// 제출처 정보 수정
// 기사가 결재 체크햇으면 해재해놓고 다시
$.editSales = function(){
    var sheetID = $("#sheetID").val();
    var salesman = $("#salesman").val();
    var carSubmit = $("#carSubmit").val();
    var carSubmitTel = $("#carSubmitTel").val();
    var CurrStatus = $("#CurrStatus").val();
    var chk1 = $("#checkbox").val();
    if (checkInputs() === 1) {
        $.ajax({
            url:"/dailyReport/workspace/ajax/edit/carSubmit",
            type:"POST",
            data:{
                "sheetID":sheetID,
                "salesman":salesman,
                "carSubmit":carSubmit,
                "carSubmitTel":carSubmitTel,
                "CurrStatus" : CurrStatus,
                "chk1": chk1
            },
            success : function (data) {
                var json = $.parseJSON(data);
                if(json.httpCode == 200){
                    $.successSave();
                }else{
                    $.failEdit();
                }
            },
            error: function(error) {
                $.failEdit();
                console.error('수정 실패:', error);
            }
        })
    } else {
        $.inputInvalid();
    }


}

$.invite = function () {
    console.log("문자를 보내 초대를 해보자.")
}