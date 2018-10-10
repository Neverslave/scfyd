package com.ut.scf.service.statistics;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ISalesInfoStatisticsService {

    BaseRespBean findSalesInfos(Map<String, Object> paramMap, PageInfoBean page)
            throws Exception;

    List<Map<String, Object>> findSalesInfos(Map<String, Object> paramMap)
            throws Exception;

    BaseRespBean staSalesInfos(Map<String, Object> paramMap) throws Exception;

    List<Map<String, Object>> staSalesInfosWX(Map<String, Object> paramMap)
            throws Exception;

}
