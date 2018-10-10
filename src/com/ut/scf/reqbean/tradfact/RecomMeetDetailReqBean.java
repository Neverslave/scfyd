package com.ut.scf.reqbean.tradfact;

import java.math.BigDecimal;
import java.util.List;

import com.ut.scf.pojo.auto.TfProjectFiles;
import com.ut.scf.reqbean.ActivitiReqBean;

public class RecomMeetDetailReqBean extends ActivitiReqBean {

	/**
	 * 项目Id
	 */
	private String userId;
	private String projectId;
	private String realName;

	/**
	 * 上会信息
	 */
	private String upwardsInfo;

	private String projectName;

	private String factoringType;

	private String corpBuyName;

	private String corpSaleName;

	private BigDecimal financingAmount;

	private BigDecimal financingTerm;

	private String repaymentWay;

	private BigDecimal reapymentAmount;

	private BigDecimal returnRate;

	private String riskMitigationMeasures;

	private String projectDescription;

	private BigDecimal interestRate;

	private String receiptWay;

	private BigDecimal manageFeeRate;

	private BigDecimal manageFeeAmount;

	private String mngFeePayWay;

	private String creditMain;

	private BigDecimal creditAmount;

	private Integer creditTerm;

	private List<TfProjectFiles> buyFiles;

	private List<TfProjectFiles> saleFiles;

	private List<TfProjectFiles> guaranteeFiles;

	private List<TfProjectFiles> tranFiles;

	private List<TfProjectFiles> projectFiles;
	
	

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<TfProjectFiles> getProjectFiles() {
		return projectFiles;
	}

	public void setProjectFiles(List<TfProjectFiles> projectFiles) {
		this.projectFiles = projectFiles;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getUpwardsInfo() {
		return upwardsInfo;
	}

	public void setUpwardsInfo(String upwardsInfo) {
		this.upwardsInfo = upwardsInfo;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getFactoringType() {
		return factoringType;
	}

	public void setFactoringType(String factoringType) {
		this.factoringType = factoringType;
	}

	public String getCorpBuyName() {
		return corpBuyName;
	}

	public void setCorpBuyName(String corpBuyName) {
		this.corpBuyName = corpBuyName;
	}

	public String getCorpSaleName() {
		return corpSaleName;
	}

	public void setCorpSaleName(String corpSaleName) {
		this.corpSaleName = corpSaleName;
	}

	public BigDecimal getFinancingAmount() {
		return financingAmount;
	}

	public void setFinancingAmount(BigDecimal financingAmount) {
		this.financingAmount = financingAmount;
	}

	public BigDecimal getFinancingTerm() {
		return financingTerm;
	}

	public void setFinancingTerm(BigDecimal financingTerm) {
		this.financingTerm = financingTerm;
	}

	public String getRepaymentWay() {
		return repaymentWay;
	}

	public void setRepaymentWay(String repaymentWay) {
		this.repaymentWay = repaymentWay;
	}

	public BigDecimal getReapymentAmount() {
		return reapymentAmount;
	}

	public void setReapymentAmount(BigDecimal reapymentAmount) {
		this.reapymentAmount = reapymentAmount;
	}

	public BigDecimal getReturnRate() {
		return returnRate;
	}

	public void setReturnRate(BigDecimal returnRate) {
		this.returnRate = returnRate;
	}

	public String getRiskMitigationMeasures() {
		return riskMitigationMeasures;
	}

	public void setRiskMitigationMeasures(String riskMitigationMeasures) {
		this.riskMitigationMeasures = riskMitigationMeasures;
	}

	public String getProjectDescription() {
		return projectDescription;
	}

	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}

	public BigDecimal getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(BigDecimal interestRate) {
		this.interestRate = interestRate;
	}

	public String getReceiptWay() {
		return receiptWay;
	}

	public void setReceiptWay(String receiptWay) {
		this.receiptWay = receiptWay;
	}

	public BigDecimal getManageFeeRate() {
		return manageFeeRate;
	}

	public void setManageFeeRate(BigDecimal manageFeeRate) {
		this.manageFeeRate = manageFeeRate;
	}

	public BigDecimal getManageFeeAmount() {
		return manageFeeAmount;
	}

	public void setManageFeeAmount(BigDecimal manageFeeAmount) {
		this.manageFeeAmount = manageFeeAmount;
	}

	public String getMngFeePayWay() {
		return mngFeePayWay;
	}

	public void setMngFeePayWay(String mngFeePayWay) {
		this.mngFeePayWay = mngFeePayWay;
	}

	public String getCreditMain() {
		return creditMain;
	}

	public void setCreditMain(String creditMain) {
		this.creditMain = creditMain;
	}

	public BigDecimal getCreditAmount() {
		return creditAmount;
	}

	public void setCreditAmount(BigDecimal creditAmount) {
		this.creditAmount = creditAmount;
	}

	public Integer getCreditTerm() {
		return creditTerm;
	}

	public void setCreditTerm(Integer creditTerm) {
		this.creditTerm = creditTerm;
	}

	public List<TfProjectFiles> getBuyFiles() {
		return buyFiles;
	}

	public void setBuyFiles(List<TfProjectFiles> buyFiles) {
		this.buyFiles = buyFiles;
	}

	public List<TfProjectFiles> getSaleFiles() {
		return saleFiles;
	}

	public void setSaleFiles(List<TfProjectFiles> saleFiles) {
		this.saleFiles = saleFiles;
	}

	public List<TfProjectFiles> getGuaranteeFiles() {
		return guaranteeFiles;
	}

	public void setGuaranteeFiles(List<TfProjectFiles> guaranteeFiles) {
		this.guaranteeFiles = guaranteeFiles;
	}

	public List<TfProjectFiles> getTranFiles() {
		return tranFiles;
	}

	public void setTranFiles(List<TfProjectFiles> tranFiles) {
		this.tranFiles = tranFiles;
	}

}
