package com.ut.scf.reqbean.project;

import java.math.BigDecimal;

import com.ut.scf.reqbean.PageReqBean;

public class CashInfoListReqBean  extends PageReqBean{

	private String payId;


	
	private BigDecimal payAmit;
	private String payDate;
	private String payNote;
	
	/**
	 * 是否分页，0：否，1：是，默认为1.
	 */
	private Integer isPage = 1;

	

	public Integer getIsPage() {
		return isPage;
	}

	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}

	public String getPayId() {
		return payId;
	}

	public void setPayId(String payId) {
		this.payId = payId;
	}

	public BigDecimal getPayAmit() {
		return payAmit;
	}

	public void setPayAmit(BigDecimal payAmit) {
		this.payAmit = payAmit;
	}

	public String getPayDate() {
		return payDate;
	}

	public void setPayDate(String payDate) {
		this.payDate = payDate;
	}

	public String getPayNote() {
		return payNote;
	}

	public void setPayNote(String payNote) {
		this.payNote = payNote;
	}
	
}
