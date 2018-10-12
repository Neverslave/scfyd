package com.ut.scf.reqbean.supplier;

import com.ut.scf.reqbean.PageReqBean;


/**
 * @author zhuwanqi
 * 供应商搜索界面
 * 用于管理员
 *
 */
public class SupplierSearchPageReqBean extends PageReqBean {
	private String  SupplierCode ;
	private String SupplierName;
	private byte sysType;
	/**
	 * 是否分页，0：否，1：是，默认为1.
	 */
	private Integer isPage = 1;
	public String getSupplierCode() {
		return SupplierCode;
	}
	public void setSupplierCode(String supplierCode) {
		SupplierCode = supplierCode;
	}
	public String getSupplierName() {
		return SupplierName;
	}
	public void setSupplierName(String supplierName) {
		SupplierName = supplierName;
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
