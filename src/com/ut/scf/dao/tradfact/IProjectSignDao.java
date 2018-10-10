package com.ut.scf.dao.tradfact;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IProjectSignDao {

	List<Map<String, Object>> selectProjectSignList(Map<String, Object> paramMap, PageInfoBean page);

	int updateProjectStatus(Map<String, Object> paramMap);
}
