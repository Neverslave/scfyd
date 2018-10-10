package com.scf.service.test.pub;

import com.ut.scf.reqbean.tradfact.LoanApplicationInfoBean;
import org.activiti.engine.impl.util.json.JSONObject;
import org.junit.Test;

import com.ut.scf.pojo.auto.CorpInfo;

import java.math.BigDecimal;

public class activiti {

	@Test
	public void bean2String() {
		LoanApplicationInfoBean loanApplicationInfoBean = new LoanApplicationInfoBean();
		loanApplicationInfoBean.setFactFinance(new BigDecimal(111));
		JSONObject jsonObject = new JSONObject(loanApplicationInfoBean);
		String str = jsonObject.toString();
		System.out.println(str);
	}



}
