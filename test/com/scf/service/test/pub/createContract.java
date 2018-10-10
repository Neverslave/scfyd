package com.scf.service.test.pub;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.dao.auto.FactorContractInfoMapper;
import com.ut.scf.dao.auto.FinanceInfoMapper;
import com.ut.scf.dao.auto.GuaranteeInfoMapper;
import com.ut.scf.dao.auto.OrderBatchInfoMapper;
import com.ut.scf.pojo.auto.FactorContractInfo;
import com.ut.scf.pojo.auto.FinanceInfo;
import com.ut.scf.pojo.auto.GuaranteeInfo;
import com.ut.scf.pojo.auto.OrderBatchInfo;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class createContract {
	@Resource
	private OrderBatchInfoMapper orderBatchInfoMapper;

	@Resource
	private FactorContractInfoMapper factorContractInfoMapper;
	@Resource
	private FinanceInfoMapper financeInfoMapper;

	@Resource
	private GuaranteeInfoMapper guaranteeInfoMapper;
	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

	@Test
	public void main() throws Exception {
		List<OrderBatchInfo> orderBatchInfos = orderBatchInfoMapper.selectByExample(null);
		for (OrderBatchInfo orderBatchInfo : orderBatchInfos) {
			creatContract(orderBatchInfo);
			creatFinanceInfo(orderBatchInfo);
			creatGuaranteeInfo(orderBatchInfo);
		}
	}

	// YDBL2016YW0019
	private void creatContract(OrderBatchInfo orderBatchInfo) {
		FactorContractInfo factorContractInfo = new FactorContractInfo();
		factorContractInfo.setContractNo("YDBL2016YW0019-" + orderBatchInfo.getBatchId());
		factorContractInfo.setSignDate(new Date());
		factorContractInfo.setContractType((byte) 1);
		factorContractInfo.setOrderBatchId(orderBatchInfo.getBatchId());
		factorContractInfo.setProductType((byte) 1);
		factorContractInfoMapper.insertSelective(factorContractInfo);
	}

	private void creatFinanceInfo(OrderBatchInfo orderBatchInfo) throws Exception {
		FinanceInfo financeInfo = new FinanceInfo();
		financeInfo.setProductId("product02");
		financeInfo.setFinanceId("YDBL2016YW0019-" + orderBatchInfo.getBatchId());
		financeInfo.setApplyDate(new Date());
		financeInfo.setCorpId("corp00003");
		financeInfo.setFinanceStartDate(new Date());
		financeInfo.setFinanceEndDate(format.parse("2019-01-01"));
		financeInfo.setFinanceAmount(orderBatchInfo.getCrReqTotalAmt());
		financeInfo.setFinanceBalance(orderBatchInfo.getCrReqTotalAmt());
		financeInfo.setFinanceStatus("3");
		financeInfo.setPayId("YDBL2016YW0019-" + orderBatchInfo.getBatchId());
		financeInfo.setPayDate(new Date());
		financeInfo.setPayAmt(orderBatchInfo.getCrReqTotalAmt());
		financeInfoMapper.insert(financeInfo);
	}

	private void creatGuaranteeInfo(OrderBatchInfo orderBatchInfo) {
		GuaranteeInfo guaranteeInfo = new GuaranteeInfo();
		guaranteeInfo.setFinanceId("YDBL2016YW0019-" + orderBatchInfo.getBatchId());
		guaranteeInfo.setGuaranteeMoneyRate(new BigDecimal(10));
		guaranteeInfo.setPayActGuarantee(BigDecimal.ZERO);
		guaranteeInfo.setGuaranteePayDate(new Date());
		guaranteeInfo.setPayAbleGuarantee(BigDecimal.ZERO);
		guaranteeInfo.setGuaranteeBalance(BigDecimal.ZERO);
		guaranteeInfoMapper.insertSelective(guaranteeInfo);
	}
}
