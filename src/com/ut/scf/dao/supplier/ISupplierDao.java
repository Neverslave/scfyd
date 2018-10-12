package com.ut.scf.dao.supplier;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ISupplierDao {
	

	List<Map<String, Object>> supplierList(Map<String, Object> paramMap,
			PageInfoBean page);

}
