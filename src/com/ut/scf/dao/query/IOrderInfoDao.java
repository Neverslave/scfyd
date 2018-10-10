package com.ut.scf.dao.query;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IOrderInfoDao {

	List<Map<String, Object>> orderInfoList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	/*-----------------------------查询统计新需求------------------------------*/
	List<Map<String, Object>> orderInfoList(Map<String, Object> paramMap);
}


