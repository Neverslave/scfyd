package com.ut.scf.dao.tradfact;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IProjectReviewDao {

	List<Map<String, Object>> selectProjectReviewList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	int deleteReviewFiles(Map<String, Object> paramMap);
}
