package com.ut.scf.reqbean.statistics;

import com.ut.scf.reqbean.PageReqBean;

/**
 * @author jihang
 *
 */
public class CarInfoListReqBean extends PageReqBean {
	private String agencyNum;
	private String corpName;
	private String carFrameNum;
	private String cprYear;
	private String cprMonth;
	private String ywlxId;
	private String saleStatus;
	private String typeName;
	private String represent;
	private String repaymentDate;

	
	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getCprYear() {
		return cprYear;
	}

	public void setCprYear(String cprYear) {
		this.cprYear = cprYear;
	}

	public String getCprMonth() {
		return cprMonth;
	}

	public void setCprMonth(String cprMonth) {
		this.cprMonth = cprMonth;
	}

	public String getYwlxId() {
		return ywlxId;
	}

	public void setYwlxId(String ywlxId) {
		this.ywlxId = ywlxId;
	}

	public String getSaleStatus() {
		return saleStatus;
	}

	public void setSaleStatus(String saleStatus) {
		this.saleStatus = saleStatus;
	}

	public String getAgencyNum() {
		return agencyNum;
	}

	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}

	public String getCorpName() {
		return corpName;
	}

	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}

	public String getCarFrameNum() {
		return carFrameNum;
	}

	public void setCarFrameNum(String carFrameNum) {
		this.carFrameNum = carFrameNum;
	}

	public String getRepresent() {
		return represent;
	}

	public void setRepresent(String represent) {
		this.represent = represent;
	}

	public String getRepaymentDate() {
		return repaymentDate;
	}

	public void setRepaymentDate(String repaymentDate) {
		this.repaymentDate = repaymentDate;
	}

}
