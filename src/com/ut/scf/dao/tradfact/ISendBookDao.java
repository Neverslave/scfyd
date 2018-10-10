package com.ut.scf.dao.tradfact;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ISendBookDao {

	List<Map<String, Object>> getBookInfoList(Map<String, Object> paramMap, PageInfoBean page);

	String selectAssignUser(Map<String, Object> paramMap);
}
