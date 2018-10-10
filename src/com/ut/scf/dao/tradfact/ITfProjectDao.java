package com.ut.scf.dao.tradfact;

import com.ut.scf.core.dict.PageInfoBean;

import java.util.List;
import java.util.Map;

public interface ITfProjectDao {

	
	List<Map<String, Object>> findProjectInfo(Map<String, Object> paramMap);

	List<Map<String, Object>> findLoanInfo(Map<String, Object> paramMap);
}
