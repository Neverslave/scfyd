package com.ut.scf.dao.tradfact;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IProjectReplyDao {
	List<Map<String, Object>> selectProjectReplyList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	
}
