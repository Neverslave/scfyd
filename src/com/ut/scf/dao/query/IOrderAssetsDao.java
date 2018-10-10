package com.ut.scf.dao.query;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;

import com.ut.scf.core.dict.PageInfoBean;

public interface IOrderAssetsDao {

	List<Map<String, Object>> spOrderInfoList(Map<String, Object> paramMap);
	List<Map<String, Object>> getFqcrOrderComputeHistoryList(Map<String, Object> paramMap, PageInfoBean page);
}


