package com.ut.scf.service.statistics;

import com.ut.scf.pojo.auto.WingPaymentDynamicEarlyInfo;
import com.ut.scf.respbean.BaseRespBean;

public interface WingPaymentDynamicEarlyInfoService {

	BaseRespBean getByCurrentMonth(WingPaymentDynamicEarlyInfo wingPaymentDynamicEarlyInfo);
}
