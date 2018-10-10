package com.ut.scf.service.statistics;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.auto.DykYuqiFachebili;
import com.ut.scf.respbean.BaseRespBean;

public interface IAmitYuQiService {

	
	BaseRespBean AmitYuQiList(Map<String, Object> paramMap,PageInfoBean page);
	
	BaseRespBean AmitYuQiHistoryList(Map<String, Object> paramMap,PageInfoBean page);
	BaseRespBean YuQiRepaySum(Map<String, Object> paramMap,PageInfoBean page);

	BaseRespBean getLsYuQiList(Map<String, Object> paramMap);

	BaseRespBean getLsYuQiXiangXiList(Map<String, Object> paramMap);

	BaseRespBean fachebili(DykYuqiFachebili dykYuqiFachebili);

	BaseRespBean getQuYuHuanKuanLsList(Map<String, Object> paramMap);
}
