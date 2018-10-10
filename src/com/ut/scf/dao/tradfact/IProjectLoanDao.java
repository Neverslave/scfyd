package com.ut.scf.dao.tradfact;

import java.util.List;
import java.util.Map;

public interface IProjectLoanDao {


    List<Map<String, Object>> findLoanInfo(Map<String, Object> paramMap);


}
