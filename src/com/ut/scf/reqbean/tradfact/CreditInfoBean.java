package com.ut.scf.reqbean.tradfact;

import java.math.BigDecimal;

public class CreditInfoBean {

	//授信编号
	private String creditId;
	//项目编号
	private String projectId;
	//授信主体
	private String creditMain;
	//授信金额
	private BigDecimal creditAmount;
	//占用的授信金额
	private BigDecimal creditUse;
	//授信期限
	private int creditTerm;
	public String getCreditId() {
		return creditId;
	}
	public void setCreditId(String creditId) {
		this.creditId = creditId;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
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
	public BigDecimal getCreditUse() {
		return creditUse;
	}
	public void setCreditUse(BigDecimal creditUse) {
		this.creditUse = creditUse;
	}
	public int getCreditTerm() {
		return creditTerm;
	}
	public void setCreditTerm(int creditTerm) {
		this.creditTerm = creditTerm;
	}
	
	
}
