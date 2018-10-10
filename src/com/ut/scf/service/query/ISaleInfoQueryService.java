package com.ut.scf.service.query;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ISaleInfoQueryService {

	BaseRespBean saleQueryList(Map<String, Object> paramMap, PageInfoBean page);

	void exportExcel(Map<String, Object> paramMap, String path) throws Exception;

	BaseRespBean saleAllQueryList(Map<String, Object> paramMap);
	
	BaseRespBean saleInfoList(Map<String, Object> paramMap);

}
