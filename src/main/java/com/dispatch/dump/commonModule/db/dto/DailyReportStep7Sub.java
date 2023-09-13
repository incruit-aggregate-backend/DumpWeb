package com.dispatch.dump.commonModule.db.dto;

import lombok.Data;

@Data
public class DailyReportStep7Sub {

    //tSheetSub 테이블
    private int sheetsubID;
    private int sheetID2;            // LINE :: tSheet FK
    private String fromsite;         // LINE :: 상차지
    private String item;             // LINE :: 품목
    private double Qty;              // LINE :: 대수
    private double Qtyup;            // LINE :: 단가
    private String Rem;              // LINE :: 비고
    private String tosite;           // LINE :: 하차지

}