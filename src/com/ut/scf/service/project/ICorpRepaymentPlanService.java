package com.ut.scf.service.project;

import com.ut.scf.respbean.PageRespBean;

public interface ICorpRepaymentPlanService {

    PageRespBean repayMentInfoByOrderList(String orderId);

    PageRespBean repayMentInfoByOrderUnList(String orderId);
}
