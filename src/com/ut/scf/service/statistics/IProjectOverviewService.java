package com.ut.scf.service.statistics;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IProjectOverviewService {
	BaseRespBean ProjectOverviewList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	BaseRespBean ProjectOverviewList(Map<String, Object> paramMap);
}
