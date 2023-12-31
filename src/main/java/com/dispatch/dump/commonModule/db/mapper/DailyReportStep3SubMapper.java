package com.dispatch.dump.commonModule.db.mapper;

import com.dispatch.dump.commonModule.db.dto.DailyReportStep3Main;
import com.dispatch.dump.commonModule.db.dto.DailyReportStep3Sub;

import java.util.List;

public interface DailyReportStep3SubMapper {

    /* FUNCTION ::  등록 */
    int insertTransportInfo(DailyReportStep3Sub DailyReportStep3Sub);

    /* FUNCTION ::  sheetsubSS2 수정 */
    int editBySheetsubSS2(DailyReportStep3Sub dailyReportStep3Sub);

    /* FUNCTION ::  수정 & 삭제를 위한 sheetID2 조회 */
    int findBySheetsubID(int sheetsubID);

    DailyReportStep3Sub findBySheetsubIDAll(int sheetsubID);

    List<DailyReportStep3Sub> selectAll(DailyReportStep3Main dailyReportStep3Main);

    List<DailyReportStep3Sub> selectAll2(DailyReportStep3Main dailyReportStep3Main);

    /* FUNCTION ::  수정 */
    int editByTransportInfo(DailyReportStep3Sub dailyReportStep3Sub);

    /* FUNCTION ::  삭제 */
    int deleteByOne(DailyReportStep3Sub dailyReportStep3Sub);

    /* FUNCTION ::  제출하기 버튼 : 1.운송정보 수정 */
    int submitByTransPortInfo(DailyReportStep3Main dailyReportStep3Main);

    /* FUNCTION ::  전체삭제 */
    int deleteByTransInfo(DailyReportStep3Main dailyReportStep3Main);

    int updateSheetID2(DailyReportStep3Main dailyReportStep3Main);

    int deleteParentDataExceptSheetID(DailyReportStep3Main dailyReportStep3Main);
}
