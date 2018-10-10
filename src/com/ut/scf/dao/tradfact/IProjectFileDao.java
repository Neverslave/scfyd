package com.ut.scf.dao.tradfact;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IProjectFileDao {

	List<Map<String, Object>> selectProjectFileInfo(Map<String, Object> paramMap);

	List<Map<String, Object>> selectContractProjectFile(Map<String, Object> paramMap);

	List<Map<String, Object>> selectLoanProjectFile(Map<String, Object> paramMap, PageInfoBean page);
}
