package com.ut.scf.dao.query;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ISaleInfoListDao {

	List<Map<String, Object>> getSaleInfoList(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> getSaleInfoList(Map<String, Object> paramMap);

	List<Map<String, Object>> getSaleAllInfoList(Map<String, Object> paramMap);
}
