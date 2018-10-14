package com.ut.scf.reqbean.supplier;

import com.ut.scf.reqbean.PageReqBean;

public class AgencySupplierSearchPageReqBean extends PageReqBean {
	private String  agencyCode ;
	 private String agencyName;
	private byte sysType;

	/**
	 * 是否分页，0：否，1：是，默认为1.
	 */
	private Integer isPage = 1;

	public String getAgencyCode() {
		return agencyCode;
	}

	public void setAgencyCode(String agencyCode) {
		this.agencyCode = agencyCode;
	}

	public String getAgencyName() {
		return agencyName;
	}

	public void setAgencyName(String agencyName) {
		this.agencyName = agencyName;
	}

	public byte getSysType() {
		return sysType;
	}

	public void setSysType(byte sysType) {
		this.sysType = sysType;
	}

	public Integer getIsPage() {
		return isPage;
	}

	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}
	

}
