package com.ut.scf.reqbean.pub;


public class GaranteeMoneyUpdateReqBean {
	
	private String productId;
	private String productName;
	private Double guaranteeMoneyRate;

	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Double getGuaranteeMoneyRate() {
		return guaranteeMoneyRate;
	}
	public void setGuaranteeMoneyRate(Double guaranteeMoneyRate) {
		this.guaranteeMoneyRate = guaranteeMoneyRate;
	}
}
