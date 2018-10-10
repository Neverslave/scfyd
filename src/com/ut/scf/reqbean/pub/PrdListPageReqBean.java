package com.ut.scf.reqbean.pub;

import com.ut.scf.reqbean.PageReqBean;

public class PrdListPageReqBean extends PageReqBean {
	private String productId;
	private String attachment;
	private String productDesc;
	private String productName;
	private String productType;
	private int businessType;
	private String businessName;
	private String fileName;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * 是否分页，0：否，1：是，默认为1.
	 */
	private Integer isPage = 1;

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getAttachment() {
		return attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

	public String getProductDesc() {
		return productDesc;
	}

	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public Integer getIsPage() {
		return isPage;
	}

	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}

	public int getBusinessType() {
		return businessType;
	}

	public void setBusinessType(int businessType) {
		this.businessType = businessType;
	}

	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}
}
